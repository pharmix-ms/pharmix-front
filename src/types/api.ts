export interface ApiMedicamento {
  id: string;
  nome: string;
  indicacoes: string;
  interacoes?: ApiInteracao[];
}

export interface ApiInteracao {
  id: string;
  medicamento1: { id: string; nome: string; indicacoes: string };
  medicamento2: { id: string; nome: string; indicacoes: string };
  mecanismo_efeito: string;
  recomendacoes: string;
  acao: string;
}
