import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import type { ApiInteracao } from "../types/api";
import type { ConsultationResult } from "../types/consultation";

interface EntryMetadata {
  id: string;
  date: string;
}

interface LegacyEntry extends EntryMetadata {
  interaction: ApiInteracao;
  status: "danger" | "safe" | "warning";
  medicines?: string[];
}

export type HistoryEntry = LegacyEntry | (EntryMetadata & { result: ConsultationResult });

const HISTORY_KEY = "@medicine_history";
const MAX_HISTORY = 100;
let pendingWrite = Promise.resolve();

async function readHistory(): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  const data: unknown = raw ? JSON.parse(raw) : [];
  if (!Array.isArray(data)) throw new Error("Histórico inválido.");
  return data;
}

function queueHistoryWrite(write: () => Promise<void>) {
  const operation = pendingWrite.then(write);
  pendingWrite = operation.catch(() => undefined);
  return operation;
}

export function saveConsultation(result: ConsultationResult) {
  const now = new Date();
  const entry = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2)}`,
    date: now.toISOString(),
    result,
  };

  return queueHistoryWrite(async () => {
    const existing = await readHistory();
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  });
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      await pendingWrite;
      setHistory(await readHistory());
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(async () => {
    await queueHistoryWrite(() => AsyncStorage.removeItem(HISTORY_KEY));
    setHistory([]);
    setLoadFailed(false);
  }, []);

  return { history, isLoading, loadFailed, clear, reload };
}
