// src/services/api.ts

import { ApiInteracao, ApiMedicamento } from "../types/api";

const BASE_URL = "https://imses.crfmg.org.br/api";
const API_KEY =
  "REVOKED_API_KEY_REMOVED";

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

    if (res.status === 404) {
      console.log(
        `[API] fetchInteracoes → ${duration}ms | sem interações para: ${nomes.join(", ")}`,
      );
      return [];
    }

    if (res.status === 400) {
      const error = await res.json();
      console.warn(
        `[API] fetchInteracoes → ${duration}ms | 400: ${error.message}`,
      );
      throw new Error(error.message || "Requisição inválida");
    }

    if (!res.ok) {
      console.warn(
        `[API] fetchInteracoes → ${duration}ms | erro HTTP ${res.status}`,
      );
      throw new Error(`Erro ${res.status}`);
    }

    const data = await res.json();
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
