import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Tipo do retorno bruto da API ANVISA ──────────────────────────────────────
export interface AnvisaProduct {
  TIPO_PRODUTO?: string;
  NOME_PRODUTO?: string;
  DATA_FINALIZACAO_PROCESSO?: string;
  CATEGORIA_REGULATORIA?: string;
  NUMERO_REGISTRO_PRODUTO?: string;
  DATA_VENCIMENTO_REGISTRO?: string;
  NUMERO_PROCESSO?: string;
  CLASSE_TERAPEUTICA?: string;
  EMPRESA_DETENTORA_REGISTRO?: string;
  SITUACAO_REGISTRO?: string;
  PRINCIPIO_ATIVO?: string;
}

// ─── Configuração do cache ────────────────────────────────────────────────────
const CACHE_PREFIX = "medicine_cache:";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 horas

interface CacheEntry {
  data: Medicine[];
  timestamp: number;
}

async function getCache(query: string): Promise<Medicine[] | null> {
  try {
    const raw = await AsyncStorage.getItem(
      `${CACHE_PREFIX}${query.toLowerCase()}`,
    );
    if (!raw) return null;

    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null; // expirado

    return entry.data;
  } catch {
    return null;
  }
}

async function setCache(query: string, data: Medicine[]): Promise<void> {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    await AsyncStorage.setItem(
      `${CACHE_PREFIX}${query.toLowerCase()}`,
      JSON.stringify(entry),
    );
  } catch {
    // falha silenciosa — cache é melhor esforço
  }
}

// ─── Fetch com cache ──────────────────────────────────────────────────────────
export interface Medicine {
  name: string;
  type: string;
}

async function fetchMedicines(
  query: string,
  signal: AbortSignal,
): Promise<Medicine[]> {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.trim().toLowerCase();

  // 1. Tenta cache primeiro
  const cached = await getCache(normalizedQuery);
  if (cached) return cached;

  // 2. Busca na API
  const url = `https://api-medicamentos-anvisa.vercel.app/${encodeURIComponent(query.trim())}?limit=8`;
  const response = await fetch(url, { signal });

  if (!response.ok) return [];

  const raw = await response.json();
  if (!Array.isArray(raw)) return [];

  const data: Medicine[] = (raw as AnvisaProduct[]).map((item) => ({
    name: item?.NOME_PRODUTO ?? "Desconhecido",
    type: item?.PRINCIPIO_ATIVO ?? "Não informado",
  }));

  // 3. Salva no cache (sem await — não precisa bloquear o retorno)
  setCache(normalizedQuery, data);

  return data;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
function medicineKey(medicine: Medicine) {
  return `${medicine.name}__${medicine.type}`.toLowerCase();
}

export function useMedicineSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);

  const selectedRef = useRef(selectedMedicines);
  useEffect(() => {
    selectedRef.current = selectedMedicines;
  }, [selectedMedicines]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchMedicines(query, controller.signal);
        const filtered = results.filter(
          (m) =>
            !selectedRef.current.some((s) => medicineKey(s) === medicineKey(m)),
        );
        setSuggestions(filtered);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const addMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) => {
      if (prev.some((m) => medicineKey(m) === medicineKey(medicine)))
        return prev;
      return [...prev, medicine];
    });
    setQuery("");
    setSuggestions([]);
  }, []);

  const removeMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) =>
      prev.filter((m) => medicineKey(m) !== medicineKey(medicine)),
    );
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    selectedMedicines,
    addMedicine,
    removeMedicine,
    canAnalyze: selectedMedicines.length >= 2,
  };
}
