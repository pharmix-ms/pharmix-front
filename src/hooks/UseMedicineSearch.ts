import { useState, useEffect, useCallback, useRef } from "react";

export interface Medicine {
  name: string;
  type: string; // princípio ativo
}

async function fetchMedicines(
  query: string,
  signal: AbortSignal,
): Promise<Medicine[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `https://api-medicamentos-anvisa.vercel.app/${encodeURIComponent(
    query.trim(),
  )}?limit=8`;

  const response = await fetch(url, { signal });

  if (!response.ok) return [];

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  return data.map((item: any) => ({
    name: item?.NOME_PRODUTO ?? "Desconhecido",
    type: item?.PRINCIPIO_ATIVO ?? "Não informado",
  }));
}

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
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setSuggestions([]);
        }
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
      if (prev.some((m) => medicineKey(m) === medicineKey(medicine))) {
        return prev;
      }
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
