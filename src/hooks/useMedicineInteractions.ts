// src/hooks/UseMedicineInteractions.ts
// Usado na tela de resultado/análise

import { useCallback, useState } from "react";
import { fetchInteracoes } from "../services/api";
import { Medicine } from "./UseMedicineSearch";
import { ApiInteracao } from "../types/api";

interface InteractionsState {
  data: ApiInteracao[];
  isLoading: boolean;
  error: string | null;
}

export function useMedicineInteractions() {
  const [state, setState] = useState<InteractionsState>({
    data: [],
    isLoading: false,
    error: null,
  });

  const analyze = useCallback(async (medicines: Medicine[]) => {
    setState({ data: [], isLoading: true, error: null });
    try {
      const nomes = medicines.map((m) => m.name);
      const interacoes = await fetchInteracoes(nomes);
      setState({ data: interacoes, isLoading: false, error: null });
      return interacoes; // <-- retorna para o caller
    } catch {
      setState({
        data: [],
        isLoading: false,
        error: "Não foi possível carregar as interações.",
      });
      return [];
    }
  }, []);

  return {
    interactions: state.data,
    isLoading: state.isLoading,
    error: state.error,
    analyze,
    hasInteractions: state.data.length > 0,
  };
}
