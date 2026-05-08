export interface ApiMedicamento {
  id: number;
  nome: string;
  indicacoes: string;
  interacoes?: ApiInteracao[];
}

export interface ApiInteracao {
  id: number;
  medicamento1: { id: number; nome: string; indicacoes: string };
  medicamento2: { id: number; nome: string; indicacoes: string };
  mecanismo_efeito: string;
  recomendacoes: string;
  acao: string;
}
