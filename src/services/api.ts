// src/services/api.ts

import { ApiInteracao, ApiMedicamento } from "../types/api";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/+$/, "");

if (!BASE_URL) {
  throw new Error("Configure EXPO_PUBLIC_BASE_URL com o endereço do backend.");
}

const headers = {
  "Content-Type": "application/json",
};

async function request(url: string, signal?: AbortSignal) {
  try {
    return await fetch(url, { headers, signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error("Não foi possível conectar ao servidor. Verifique a conexão e tente novamente.");
  }
}

export async function fetchTodosMedicamentos(signal?: AbortSignal): Promise<ApiMedicamento[]> {
  const res = await request(`${BASE_URL}/medicamentos`, signal);
  if (!res.ok) throw new Error(`Não foi possível carregar os medicamentos (HTTP ${res.status}).`);
  const data = await res.json();
  if (!Array.isArray(data?.medicamentos) || !data.medicamentos.every(
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
  const query = encodeURIComponent(nomes.join(","));
  const res = await request(`${BASE_URL}/interacoes?nomes=${query}`, signal);
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    const message = res.status === 404 && typeof error?.message === "string"
      ? error.message
      : `Não foi possível consultar as interações (HTTP ${res.status}).`;
    throw new Error(message);
  }

  const data = await res.json();
  if (!Array.isArray(data?.interacoes)) {
    throw new Error("Resposta inválida ao consultar as interações.");
  }
  return data.interacoes as ApiInteracao[];
}
