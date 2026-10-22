import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchTodosMedicamentos } from "../services/api";

export interface Medicine {
  name: string;
  type: string;
}

function medicineKey(medicine: Medicine) {
  return medicine.name.toLowerCase();
}

export function useMedicineSearch() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [dropdownKey, setDropdownKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    fetchTodosMedicamentos(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;
        setMedicines(items.map((medicine) => ({ name: medicine.nome, type: "Princípio Ativo" })));
      })
      .catch((failure: unknown) => {
        if (controller.signal.aborted) return;
        setMedicines([]);
        setError(failure instanceof Error ? failure.message : "Não foi possível carregar os medicamentos.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [loadAttempt]);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery || isLoading || error) return [];
    return medicines
      .filter((medicine) => medicine.name.toLowerCase().includes(normalizedQuery))
      .filter(
        (m) =>
          !selectedMedicines.some((s) => medicineKey(s) === medicineKey(m)),
      )
      .slice(0, 8);

  }, [query, medicines, selectedMedicines, isLoading, error]);

  const retry = useCallback(() => setLoadAttempt((attempt) => attempt + 1), []);

  const addMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) => {
      if (prev.some((m) => medicineKey(m) === medicineKey(medicine))) {
        return prev;
      }

      return [...prev, medicine];
    });

    setQuery("");
  }, []);

  const removeMedicine = useCallback((medicine: Medicine) => {
    setSelectedMedicines((prev) =>
      prev.filter((m) => medicineKey(m) !== medicineKey(medicine)),
    );
  }, []);

  const resetDropdown = useCallback(() => {
    setDropdownKey((k) => k + 1);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
    retry,
    selectedMedicines,
    addMedicine,
    removeMedicine,
    canAnalyze: selectedMedicines.length >= 2 && !isLoading && !error,
    dropdownKey,
    resetDropdown,
  };
}
