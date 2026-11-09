import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchTodosMedicamentos } from "../services/api";
import { foodAndDrink } from "../data/consultationRules";
import type { ConsultationItem } from "../types/consultation";

export function itemKey(item: ConsultationItem) {
  return `${item.type}:${item.name.toLowerCase()}`;
}

const MAX_ITEMS = 50;

export function normalizeSearch(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

export function useMedicineSearch(scope: "all" | "medicines" = "all") {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState<ConsultationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [selectedMedicines, setSelectedMedicines] = useState<ConsultationItem[]>([]);
  const [dropdownKey, setDropdownKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    fetchTodosMedicamentos(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;
        setMedicines([
          ...items.map(({ nome }) => ({ name: nome, type: "Princípio ativo" as const })),
          ...(scope === "all" ? foodAndDrink : []),
        ]);
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
  }, [loadAttempt, scope]);

  const suggestions = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery || isLoading || error) return [];
    return medicines
      .filter((medicine) => normalizeSearch(medicine.name).includes(normalizedQuery))
      .filter(
        (m) =>
          !selectedMedicines.some((s) => itemKey(s) === itemKey(m)),
      )
      .slice(0, 8);

  }, [query, medicines, selectedMedicines, isLoading, error]);

  const retry = useCallback(() => setLoadAttempt((attempt) => attempt + 1), []);

  const addMedicine = useCallback((medicine: ConsultationItem) => {
    setSelectedMedicines((prev) => {
      if (prev.length >= MAX_ITEMS || prev.some((m) => itemKey(m) === itemKey(medicine))) {
        return prev;
      }

      return [...prev, medicine];
    });

    setQuery("");
  }, []);

  const removeMedicine = useCallback((medicine: ConsultationItem) => {
    setSelectedMedicines((prev) =>
      prev.filter((m) => itemKey(m) !== itemKey(medicine)),
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
    canAnalyze: selectedMedicines.some(({ type }) => type === "Princípio ativo") && !isLoading && !error,
    selectionIsFull: selectedMedicines.length >= MAX_ITEMS,
    dropdownKey,
    resetDropdown,
  };
}
