import type {
  ConsultationItem,
  ConsultationNote,
  HealthProfile,
} from "../types/consultation";

const ACETAMINOPHEN = {
  label: "DailyMed · Acetaminophen, advertências",
  url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bd5e6804-4df4-4a65-92e4-faa3a0f7c005",
};

export const ASTHMA = "Asma";
export const LIVER_DISEASE = "Doença hepática";

const SPINACH = { name: "Espinafre", type: "Alimento" } as const;
const ALCOHOL = { name: "Bebida alcoólica", type: "Bebida" } as const;
const WATER = { name: "Água", type: "Bebida" } as const;

export const foodAndDrink: ConsultationItem[] = [SPINACH, ALCOHOL, WATER];

type PairRule = ConsultationNote & { medicine: string; item: ConsultationItem };

const pairRules: PairRule[] = [
  {
    id: "varfarina-espinafre",
    medicine: "Varfarina",
    item: SPINACH,
    kind: "Interação",
    title: "Varfarina e espinafre",
    text: "O espinafre contém vitamina K. Mudanças na quantidade de vitamina K consumida podem alterar o efeito da varfarina. Converse com a equipe que acompanha seu tratamento antes de mudar a dieta.",
    source: {
      label: "MedlinePlus · Taking warfarin",
      url: "https://medlineplus.gov/ency/patientinstructions/000292.htm",
    },
  },
  {
    id: "acetaminofeno-alcool",
    medicine: "Acetaminofeno",
    item: ALCOHOL,
    kind: "Interação",
    title: "Paracetamol (acetaminofeno) e bebida alcoólica",
    text: "A rotulagem consultada alerta para risco de lesão grave no fígado em adultos que consomem três ou mais bebidas alcoólicas por dia durante o uso. Informe seu consumo de álcool ao profissional de saúde.",
    source: ACETAMINOPHEN,
  },
  {
    id: "omeprazol-agua",
    medicine: "Omeprazol",
    item: WATER,
    kind: "Orientação de administração",
    title: "Omeprazol e água",
    text: "A rotulagem consultada orienta engolir o comprimido de liberação retardada inteiro com um copo de água. Confira a bula da sua apresentação.",
    source: {
      label: "DailyMed · Omeprazole delayed-release tablets, modo de uso",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=35a95bec-51b9-465b-aa93-ad26afb87be8",
    },
  },
];

function canonicalMedicineName(name: string) {
  const key = name.trim().toLowerCase();
  return key === "paracetamol" ? "acetaminofeno" : key;
}

export function evaluateRules(items: ConsultationItem[], profile: HealthProfile): ConsultationNote[] {
  const medicineNames = new Set(
    items.filter(({ type }) => type === "Princípio ativo").map(({ name }) => canonicalMedicineName(name)),
  );
  const notes: ConsultationNote[] = pairRules
    .filter(({ medicine, item }) =>
      medicineNames.has(canonicalMedicineName(medicine))
      && items.some(({ name, type }) => item.name === name && item.type === type),
    )
    .map(({ id, kind, title, text, source }) => ({ id, kind, title, text, source }));

  const allergiesMatched = new Set<string>();
  for (const name of profile.allergies) {
    const key = canonicalMedicineName(name);
    if (medicineNames.has(key) && !allergiesMatched.has(key)) {
      allergiesMatched.add(key);
      notes.push({
        id: `alergia-${name}`,
        kind: "Alerta do perfil",
        title: `Alergia informada a ${name}`,
        text: "Este princípio ativo corresponde a uma alergia informada no seu perfil. Informe esse histórico a um profissional de saúde antes de usar o medicamento.",
      });
    }
  }

  if (profile.pregnancy === "yes" && medicineNames.has("varfarina")) {
    notes.push({
      id: "varfarina-gravidez",
      kind: "Alerta do perfil",
      title: "Varfarina e gravidez informada",
      text: "A varfarina pode causar danos ao feto. A rotulagem prevê situações específicas que exigem avaliação especializada. Procure a equipe que acompanha seu tratamento para avaliar o uso.",
      source: {
        label: "DailyMed · Warfarin sodium, seções 4, 5.7 e 8.1",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=545ec40d-2db1-4581-b3ec-ce195e5f5400",
      },
    });
  }

  if (profile.conditions.includes(LIVER_DISEASE) && medicineNames.has("acetaminofeno")) {
    notes.push({
      id: "acetaminofeno-doenca-hepatica",
      kind: "Alerta do perfil",
      title: "Paracetamol (acetaminofeno) e doença hepática informada",
      text: "A rotulagem consultada orienta que pessoas com doença hepática consultem um médico antes de usar o medicamento.",
      source: ACETAMINOPHEN,
    });
  }

  if (profile.conditions.includes(ASTHMA) && medicineNames.has("aas")) {
    notes.push({
      id: "aas-asma",
      kind: "Alerta do perfil",
      title: "AAS e asma informada",
      text: "A rotulagem consultada orienta que pessoas com asma consultem um médico antes de usar o ácido acetilsalicílico (AAS).",
      source: {
        label: "DailyMed · Aspirin, advertências",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7013ea-cf30-6f59-e053-2a95a90a1148",
      },
    });
  }

  return notes;
}
