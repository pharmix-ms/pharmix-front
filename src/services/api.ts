// src/services/api.ts

import { ApiInteracao, ApiMedicamento } from "../types/api";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error("Variáveis de ambiente não configuradas.");
}

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

// ─── Funções ──────────────────────────────────────────────────────────────────

export async function fetchTodosMedicamentos(): Promise<ApiMedicamento[]> {
  const res = await fetch(`${BASE_URL}/medicamentos`, { headers });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const data = await res.json();
  return data.medicamentos as ApiMedicamento[];
}

export async function fetchInteracoes(
  nomes: string[],
  signal?: AbortSignal,
): Promise<ApiInteracao[]> {
  const query = nomes.join(",");
  const start = performance.now();

  try {
    const res = await fetch(
      `${BASE_URL}/interacoes?nomes=${encodeURIComponent(query)}`,
      { headers, signal },
    );

    const duration = (performance.now() - start).toFixed(0);

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      const message = typeof error?.message === "string"
        ? error.message
        : `Não foi possível consultar as interações (HTTP ${res.status}).`;
      throw new Error(message);
    }

    const data = await res.json();
    if (!Array.isArray(data.interacoes)) {
      throw new Error("Resposta inválida ao consultar as interações.");
    }
    console.log(
      `[API] fetchInteracoes → ${duration}ms | ${data.interacoes?.length ?? 0} interação(ões) | princípios: ${nomes.join(", ")}`,
    );
    return data.interacoes as ApiInteracao[];
  } catch (error) {
    const duration = (performance.now() - start).toFixed(0);
    if (error instanceof Error && error.name === "AbortError") {
      console.log(
        `[API] fetchInteracoes → ${duration}ms | cancelada (AbortSignal)`,
      );
    } else {
      console.warn(`[API] fetchInteracoes → ${duration}ms | exceção: ${error}`);
    }
    throw error;
  }
}
