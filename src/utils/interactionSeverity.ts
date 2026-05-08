import { ApiInteracao } from "../types/api";

export type Severity = "safe" | "warning" | "danger";

// Palavras-chave críticas
const DANGER_KEYWORDS = [
  "contraindicado",
  "não associar",
  "não usar",
  "proibido",
  "morte",
  "torsades",
  "arritmias ventriculares",
  "coma",
  "depressão respiratória",
];

// Palavras-chave moderadas/importantes
const WARNING_KEYWORDS = [
  "evitar a associação",
  "evitar associação",
  "monitorizar",
  "monitorar",
  "ajustar a dose",
  "reduzir dose",
  "cautela",
  "hipocalemia",
  "hipomagnesemia",
  "nefrotoxicidade",
  "sedação",
];

// Remove acentos
function normalize(text?: string) {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getInteractionSeverity(interaction: ApiInteracao): Severity {
  const acao = normalize(interaction.acao);
  const recomendacoes = normalize(interaction.recomendacoes);
  const mecanismo = normalize(interaction.mecanismo_efeito);

  const fullText = `${acao} ${recomendacoes} ${mecanismo}`;

  // PRIORIDADE 1 → Contraindicado / muito grave
  if (DANGER_KEYWORDS.some((keyword) => fullText.includes(keyword))) {
    return "danger";
  }

  // PRIORIDADE 2 → Evitar associação / monitorar
  if (WARNING_KEYWORDS.some((keyword) => fullText.includes(keyword))) {
    return "warning";
  }

  // Caso exista interação mas sem classificação clara
  return "warning";
}

export function getOverallStatus(interactions: ApiInteracao[]): Severity {
  if (interactions.length === 0) {
    return "safe";
  }

  const severities = interactions.map(getInteractionSeverity);

  if (severities.includes("danger")) {
    return "danger";
  }

  if (severities.includes("warning")) {
    return "warning";
  }

  return "safe";
}
