import { useCallback, useEffect, useRef, useState } from "react";
import { medicineData } from "../data/medicineData";

export interface Medicine {
  name: string;
  type: string;
}

function medicineKey(medicine: Medicine) {
  return medicine.name.toLowerCase();
}

export function useMedicineSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);

  const selectedRef = useRef(selectedMedicines);

  useEffect(() => {
    selectedRef.current = selectedMedicines;
  }, [selectedMedicines]);

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();

    const filtered = medicineData
      .filter((medicine) => medicine.toLowerCase().includes(normalizedQuery))
      .map((medicine) => ({
        name: medicine,
        type: "Princípio Ativo",
      }))
      .filter(
        (m) =>
          !selectedRef.current.some((s) => medicineKey(s) === medicineKey(m)),
      )
      .slice(0, 8);

    setSuggestions(filtered);
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
    isLoading: false,
    selectedMedicines,
    addMedicine,
    removeMedicine,
    canAnalyze: selectedMedicines.length >= 2,
  };
}
