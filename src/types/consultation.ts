import type { ApiInteracao } from "./api";

export interface ConsultationItem {
  name: string;
  type: "Princípio ativo" | "Alimento" | "Bebida";
}

export interface HealthProfile {
  pregnancy: "yes" | "no" | "unknown";
  conditions: string[];
  allergies: string[];
}

export interface ConsultationNote {
  id: string;
  kind: "Interação" | "Orientação de administração" | "Alerta do perfil";
  title: string;
  text: string;
  source?: { label: string; url: string };
}

export interface ConsultationResult {
  items: ConsultationItem[];
  interactions: ApiInteracao[];
  notes: ConsultationNote[];
}
