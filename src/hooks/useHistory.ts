// src/hooks/useHistory.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ApiInteracao } from "../types/api";
import { getInteractionSeverity } from "../utils/interactionSeverity";

export interface HistoryEntry {
  id: string;
  date: string;
  interaction: ApiInteracao;
  status: "danger" | "safe" | "warning";
  medicines?: string[];
}

const HISTORY_KEY = "@medicine_history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const raw = await AsyncStorage.getItem(HISTORY_KEY);
      setHistory(raw ? JSON.parse(raw) : []);
    } catch {
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveInteractions = useCallback(
    async (interactions: ApiInteracao[], medicines?: string[]) => {
      try {
        const raw = await AsyncStorage.getItem(HISTORY_KEY);
        const existing: HistoryEntry[] = raw ? JSON.parse(raw) : [];
        const now = new Date().toISOString();

        let newEntries: HistoryEntry[];

        if (interactions.length === 0 && medicines) {
          // Caso seguro: cria uma entrada sintética com os medicamentos analisados
          newEntries = [
            {
              id: `${Date.now()}-safe`,
              date: now,
              status: "safe",
              medicines,
              interaction: {
                id: -1,
                acao: "Combinação Segura",
                mecanismo_efeito: "Nenhuma interação conhecida foi encontrada.",
                recomendacoes: "Nenhuma recomendação especial necessária.",
                medicamento1: {
                  id: -1,
                  nome: medicines[0] ?? "",
                  indicacoes: "",
                },
                medicamento2: {
                  id: -1,
                  nome: medicines[1] ?? "",
                  indicacoes: "",
                },
              },
            },
          ];
        } else {
          newEntries = interactions.map((interaction) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}-${interaction.id}`,
            date: now,
            interaction,
            status: getInteractionSeverity(interaction),
          }));
        }

        const updated = [...newEntries, ...existing];
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        setHistory(updated);
      } catch {
        // falha silenciosa, não salva nem atualiza o estado
      }
    },
    [],
  );

  const clear = useCallback(async () => {
    await AsyncStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    history,
    isLoading,
    saveInteractions,
    clear,
    reload: load,
  };
}
