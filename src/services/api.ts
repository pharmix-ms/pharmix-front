// src/services/api.ts

import { ApiInteracao, ApiMedicamento } from "../types/api";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/+$/, "");

if (!BASE_URL) {
  throw new Error("Configure EXPO_PUBLIC_BASE_URL com o endereço do backend.");
}

const headers = {
  "Content-Type": "application/json",
};

// ─── Funções ──────────────────────────────────────────────────────────────────

export async function fetchTodosMedicamentos(signal?: AbortSignal): Promise<ApiMedicamento[]> {
  const res = await fetch(`${BASE_URL}/medicamentos`, { headers, signal });
  if (!res.ok) throw new Error(`Não foi possível carregar os medicamentos (HTTP ${res.status}).`);
  const data = await res.json();
  if (!Array.isArray(data.medicamentos) || !data.medicamentos.every(
    (medicine: ApiMedicamento) => medicine && typeof medicine.id === "string"
      && typeof medicine.nome === "string" && medicine.nome.trim().length > 0
      && typeof medicine.indicacoes === "string",
  )) {
    throw new Error("Resposta inválida ao carregar os medicamentos.");
  }
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
