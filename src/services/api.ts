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
  const res = await fetch(
    `${BASE_URL}/interacoes?nomes=${encodeURIComponent(query)}`,
    { headers, signal },
  );
  if (res.status === 404) return [];

  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message || "Requisição inválida");
  }
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const data = await res.json();
  return data.interacoes as ApiInteracao[];
}
