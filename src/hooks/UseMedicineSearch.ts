import { useState, useEffect, useCallback, useRef } from "react";

export interface Medicine {
  id: string;
  name: string;
  type: string;
  quantity: string;
}

async function fetchMedicines(
  query: string,
  signal: AbortSignal,
): Promise<Medicine[]> {
  if (!query || query.length < 2) return [];

  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=8`;

  const response = await fetch(url, { signal }); // ← passa o signal
  if (!response.ok) return [];

  const data = await response.json();

  return (data.results ?? []).map((item: any, index: number) => ({
    id: item.set_id ?? `${query}-${index}`, // ← set_id é o campo correto da FDA
    name: item.openfda?.brand_name?.[0] ?? "Desconhecido",
    type: item.openfda?.dosage_form?.[0] ?? "Não informado",
    quantity:
      item.openfda?.strength?.[0] ??
      item.dosage_and_administration?.[0]?.slice(0, 30) ??
      "Não informado",
  }));
}

export function useMedicineSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);

  // Ref para acessar selectedMedicines dentro do efeito sem adicioná-lo
  // às dependências (evita re-execuções desnecessárias ao adicionar/remover)
  const selectedRef = useRef(selectedMedicines);
  useEffect(() => {
    selectedRef.current = selectedMedicines;
  }, [selectedMedicines]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Cada ciclo do efeito cria seu próprio controller
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchMedicines(query, controller.signal);
        const filtered = results.filter(
          (m) => !selectedRef.current.some((s) => s.id === m.id),
        );
        setSuggestions(filtered);
      } catch (err: any) {
        // Ignora erros de abort (request cancelada intencionalmente)
        if (err.name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 400);

    // Cancela tanto o timer quanto a request em andamento
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]); // ← selectedMedicines removido daqui

  const addMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) => {
      if (prev.some((m) => m.id === medicine.id)) return prev;
      return [...prev, medicine];
    });
    setQuery("");
    setSuggestions([]);
  }, []);

  const removeMedicine = useCallback((id: string) => {
    setSelectedMedicines((prev) => prev.filter((m) => m.id !== id));
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
