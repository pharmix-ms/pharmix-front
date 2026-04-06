import { useState, useEffect, useCallback } from "react";

export interface Medicine {
  id: string;
  name: string;
  type: string;
  quantity: string;
}

// Adapte essa função para a sua API real
async function fetchMedicines(query: string): Promise<Medicine[]> {
  if (!query || query.length < 2) return [];

  // Exemplo com a API Open FDA (gratuita, sem auth)
  // Troque pela sua API conforme necessário
  const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(query)}"&limit=8`;

  const response = await fetch(url);
  if (!response.ok) return [];

  const data = await response.json();

  return (data.results ?? []).map((item: any, index: number) => ({
    id: item.id ?? `${query}-${index}`,
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

  // Debounce: aguarda 400ms após o usuário parar de digitar
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchMedicines(query);
        // Filtra os que já foram adicionados
        const filtered = results.filter(
          (m) => !selectedMedicines.some((s) => s.id === m.id),
        );
        setSuggestions(filtered);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, selectedMedicines]);

  const addMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) => {
      // Evita duplicatas
      if (prev.some((m) => m.id === medicine.id)) return prev;
      return [...prev, medicine];
    });
    // Limpa o campo e o dropdown após adicionar
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
