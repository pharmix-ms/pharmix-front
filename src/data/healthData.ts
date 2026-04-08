export type HealthCategory = {
  label: string;
  items: string[];
};

export const healthConditionCategories: HealthCategory[] = [
  {
    label: "Metabólicas",
    items: [
      "Diabetes",
      "Hipertensão",
      "Colesterol alto",
      "Síndrome metabólica",
      "Hipoglicemia",
      "Hiperglicemia",
      "Anemia",
      "Gota",
    ],
  },
  {
    label: "Respiratórias",
    items: [
      "Asma",
      "Bronquite crônica",
      "Enfisema",
      "Apneia do sono",
      "Pneumonia",
      "Rinite alérgica",
      "Sinusite",
    ],
  },
  {
    label: "Mentais",
    items: [
      "Depressão",
      "Ansiedade",
      "Insônia",
      "Transtorno bipolar",
      "Esquizofrenia",
      "Transtorno de pânico",
    ],
  },
  {
    label: "Neurológicas",
    items: [
      "Enxaqueca",
      "Doença de Parkinson",
      "Alzheimer",
      "Epilepsia",
      "Esclerose múltipla",
    ],
  },
  {
    label: "Cardíacas",
    items: [
      "Infarto prévio",
      "Angina",
      "Arritmia",
      "Trombose",
      "Insuficiência cardíaca",
    ],
  },
  {
    label: "Endócrinas",
    items: [
      "Tireoide",
      "Hipotireoidismo",
      "Hipertireoidismo",
    ],
  },
  {
    label: "Reumáticas",
    items: [
      "Artrite",
      "Artrose",
      "Osteoporose",
      "Lúpus",
      "Fibromialgia",
    ],
  },
  {
    label: "Gastrointestinais",
    items: [
      "Gastrite",
      "Doença de Crohn",
      "Colite ulcerativa",
      "Hepatite",
      "Cirrose",
      "Úlcera gástrica",
    ],
  },
  {
    label: "Oculares",
    items: ["Glaucoma", "Catarata"],
  },
  {
    label: "Dermatológicas",
    items: ["Vitiligo", "Psoríase", "Eczema", "Dermatite atópica"],
  },
  {
    label: "Outras",
    items: [
      "COVID-19 longo",
      "Insuficiência renal",
      "Varizes",
      "Câncer",
    ],
  },
];

export const drugAllergyCategories: HealthCategory[] = [
  {
    label: "Analgesia",
    items: [
      "Dipirona",
      "AAS",
      "Ibuprofeno",
      "Paracetamol",
      "Naproxeno",
      "Cetoprofeno",
      "Diclofenaco",
      "Meloxicam",
      "Tramadol",
      "Codeína",
      "Morfina",
      "Oxicodona",
    ],
  },
  {
    label: "Antibióticos",
    items: [
      "Penicilina",
      "Cefalexina",
      "Amoxicilina",
      "Eritromicina",
      "Claritromicina",
      "Fluoroquinolonas",
      "Metronidazol",
      "Cefalosporinas",
      "Macrolídeos",
      "Quinolonas",
    ],
  },
  {
    label: "Psiquiatria",
    items: [
      "Anticonvulsionantes",
      "Lamotrigina",
      "Fenitoína",
      "Fenobarbital",
      "Carbamazepina",
      "Ácido valproico",
      "Antidepressivos",
      "Fluoxetina",
      "Sertralina",
      "Paroxetina",
      "Ansiolíticos",
      "Diazepam",
      "Alprazolam",
      "Clonazepam",
      "Lorazepam",
    ],
  },
  {
    label: "Cardiovasculares",
    items: [
      "Estatinas",
      "ACE inibidores",
      "Bloqueadores beta",
      "Bloqueadores de canais de cálcio",
      "Diuréticos",
      "Heparina",
      "Varfarina",
    ],
  },
  {
    label: "Hormônios",
    items: [
      "Insulina",
      "Dexametasona",
      "Omeprazol",
      "Corticosteroides",
    ],
  },
  {
    label: "Antifúngicos",
    items: ["Antifúngicos", "Fluconazol", "Itraconazol"],
  },
  {
    label: "Diversos",
    items: ["Sulfa", "Contraste com iodo", "Vitamina K", "Antiretrovirais"],
  },
];

export const healthConditions = Array.from(
  new Set(healthConditionCategories.flatMap((category) => category.items)),
);

export const drugAllergies = Array.from(
  new Set(drugAllergyCategories.flatMap((category) => category.items)),
);
