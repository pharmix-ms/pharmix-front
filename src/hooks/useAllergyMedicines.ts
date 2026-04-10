import { useState, useEffect } from "react";
import { HealthCategory } from "../data/healthData";

interface ApiMedicine {
  nome_apresentacao: string;
  principio_ativo: string;
  classe_terapeutica: string;
}

const medicineCategoryMap: Record<string, string> = {
  dipirona: "Analgesia",
  paracetamol: "Analgesia",
  ibuprofeno: "Analgesia",
  naproxeno: "Analgesia",
  cetoprofeno: "Analgesia",
  diclofenaco: "Analgesia",
  meloxicam: "Analgesia",
  tramadol: "Analgesia",
  codeína: "Analgesia",
  morfina: "Analgesia",
  oxicodona: "Analgesia",
  aspirina: "Analgesia",

  amoxicilina: "Antibióticos",
  penicilina: "Antibióticos",
  cefalexina: "Antibióticos",
  cefalosporina: "Antibióticos",
  eritromicina: "Antibióticos",
  claritromicina: "Antibióticos",
  azitromicina: "Antibióticos",
  ciprofloxacino: "Antibióticos",
  norfloxacino: "Antibióticos",
  levofloxacino: "Antibióticos",
  ofloxacino: "Antibióticos",
  metronidazol: "Antibióticos",

  fluoxetina: "Psiquiatria",
  sertralina: "Psiquiatria",
  paroxetina: "Psiquiatria",
  citalopram: "Psiquiatria",
  escitalopram: "Psiquiatria",
  diazepam: "Psiquiatria",
  alprazolam: "Psiquiatria",
  clonazepam: "Psiquiatria",
  lorazepam: "Psiquiatria",
  bromazepam: "Psiquiatria",
  amitriptilino: "Psiquiatria",
  imipramina: "Psiquiatria",

  atenolol: "Cardiovasculares",
  metoprolol: "Cardiovasculares",
  propranolol: "Cardiovasculares",
  losartana: "Cardiovasculares",
  enalapril: "Cardiovasculares",
  captopril: "Cardiovasculares",
  lisinopril: "Cardiovasculares",
  atorvastatina: "Cardiovasculares",
  sinvastatina: "Cardiovasculares",
  clopidogrel: "Cardiovasculares",
  varfarina: "Cardiovasculares",
  heparina: "Cardiovasculares",

  insulina: "Hormônios",
  metformina: "Hormônios",
  dexametasona: "Hormônios",
  prednisona: "Hormônios",
  prednisolona: "Hormônios",
  hidrocortisona: "Hormônios",
  omeprazol: "Hormônios",
  ranitidina: "Hormônios",
  levotiroxina: "Hormônios",

  fluconazol: "Antifúngicos",
  itraconazol: "Antifúngicos",
  cetoconazol: "Antifúngicos",
  miconazol: "Antifúngicos",
  terbinafina: "Antifúngicos",

  sulfonamida: "Diversos",
  sulfametoxazol: "Diversos",
  sulfadiazina: "Diversos",
};

// Medicamentos comuns para buscar na API (nomes simples)
const commonMedicineSearches = [
  "dipirona",
  "paracetamol",
  "amoxicilina",
  "fluoxetina",
  "atenolol",
  "insulina",
  "omeprazol",
  "ibuprofeno",
  "cefalexina",
  "metformina",
  "losartana",
  "enalapril",
  "atorvastatina",
  "levotiroxina",
  "prednisolona",
  "azitromicina",
  "ciprofloxacino",
  "sertralina",
  "dexametasona",
  "ranitidina",
  "clonazepam",
  "alprazolam",
  "diazepam",
  "varfarina",
  "heparina",
  "aspirina",
  "naproxeno",
  "cetoprofeno",
  "diclofenaco",
  "meloxicam",
  "tramadol",
  "codeína",
  "morfina",
  "oxicodona",
  "fluconazol",
  "itraconazol",
  "cetoconazol",
  "terbinafina",
  "sulfametoxazol",
  "trimetoprima",
];

// Lista de medicamentos permitidos (apenas nomes simples)
const allowedMedicines = new Set([
  "Dipirona",
  "Paracetamol",
  "Amoxicilina",
  "Fluoxetina",
  "Atenolol",
  "Insulina",
  "Omeprazol",
  "Ibuprofeno",
  "Cefalexina",
  "Metformina",
  "Losartana",
  "Enalapril",
  "Atorvastatina",
  "Levotiroxina",
  "Prednisolona",
  "Azitromicina",
  "Ciprofloxacino",
  "Sertralina",
  "Dexametasona",
  "Ranitidina",
  "Clonazepam",
  "Alprazolam",
  "Diazepam",
  "Varfarina",
  "Heparina",
  "Aspirina",
  "Naproxeno",
  "Cetoprofeno",
  "Diclofenaco",
  "Meloxicam",
  "Tramadol",
  "Codeína",
  "Morfina",
  "Oxicodona",
  "Fluconazol",
  "Itraconazol",
  "Cetoconazol",
  "Terbinafina",
  "Sulfametoxazol",
  "Trimetoprima",
]);

async function fetchMedicinesFromApi(): Promise<string[]> {
  const allMedicines: Set<string> = new Set();

  for (const searchTerm of commonMedicineSearches) {
    try {
      const url = `https://api-medicamentos-anvisa.vercel.app/${encodeURIComponent(
        searchTerm,
      )}?limit=5`;

      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      if (!Array.isArray(data)) continue;

      data.forEach((item: any) => {
        const medicineName =
          item?.PRINCIPIO_ATIVO || item?.NOME_PRODUTO || "";
        if (medicineName) {
          const cleanName = cleanMedicineName(medicineName);
          if (cleanName && allowedMedicines.has(cleanName)) {
            allMedicines.add(cleanName);
          }
        }
      });
    } catch (error) {
      console.error(`Erro ao buscar ${searchTerm}:`, error);
    }
  }

  return Array.from(allMedicines);
}

function cleanMedicineName(name: string): string {
  if (!name) return "";

  let cleanName = name.toLowerCase().trim();

  // Remove tudo após hífen (informações de laboratório)
  cleanName = cleanName.split(' - ')[0];

  // Remove números e unidades de dosagem
  cleanName = cleanName.replace(/\d+(\.\d+)?\s*(mg|g|ml|mcg|ui|%|unidade|unidades|comprimido|comprimidos|capsula|capsulas|ampola|ampolas|frasco|frascos|creme|gel|pomada|spray|gotas)/gi, '');

  // Remove formas de apresentação
  cleanName = cleanName.replace(/\s+(oral|intravenoso|intramuscular|topico|oftalmico|otologico|nasal|retal|cutaneo|vaginal|subcutaneo|inalatorio|intratecal|epidural|intra-articular|intraperitoneal|intrapleural|intratraqueal|intravesical|intra-uterino|intra-ocular|intra-auricular|intra-nasal|intra-oral|intra-gastrico|intra-hepatico|intra-renal|intra-pulmonar|intra-cardiaco|intra-arterial)/gi, '');

  // Remove sais e compostos químicos
  cleanName = cleanName.replace(/\s+(cloridrato|maleato|besilato|sódico|sulfato|fosfato|acetato|tartrato|láctico|citrato|succinato|gluconato|hidroclorido|dicloridrato|tricloridrato|monoidratada|di-hidratada|tri-hidratada|pentahidratada|heptahidratada|anidra|micronizada)/gi, '');

  // Remove termos técnicos
  cleanName = cleanName.replace(/\s+(liberacao|prolongada|revestido|entérico|solúvel|insolúvel|retard|controlada|liberação)/gi, '');

  // Limpa espaços extras e caracteres especiais
  cleanName = cleanName.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();

  // Mapeamento direto para nomes comuns
  const nameMap: Record<string, string> = {
    'dipirona': 'Dipirona',
    'paracetamol': 'Paracetamol',
    'acetaminofen': 'Paracetamol',
    'amoxicilina': 'Amoxicilina',
    'fluoxetina': 'Fluoxetina',
    'atenolol': 'Atenolol',
    'insulina': 'Insulina',
    'omeprazol': 'Omeprazol',
    'ibuprofeno': 'Ibuprofeno',
    'cefalexina': 'Cefalexina',
    'metformina': 'Metformina',
    'losartana': 'Losartana',
    'enalapril': 'Enalapril',
    'atorvastatina': 'Atorvastatina',
    'levotiroxina': 'Levotiroxina',
    'prednisolona': 'Prednisolona',
    'azitromicina': 'Azitromicina',
    'ciprofloxacino': 'Ciprofloxacino',
    'sertralina': 'Sertralina',
    'dexametasona': 'Dexametasona',
    'ranitidina': 'Ranitidina',
    'clonazepam': 'Clonazepam',
    'alprazolam': 'Alprazolam',
    'diazepam': 'Diazepam',
    'varfarina': 'Varfarina',
    'heparina': 'Heparina',
    'aspirina': 'Aspirina',
    'acido acetilsalicilico': 'Aspirina',
    'naproxeno': 'Naproxeno',
    'cetoprofeno': 'Cetoprofeno',
    'diclofenaco': 'Diclofenaco',
    'meloxicam': 'Meloxicam',
    'tramadol': 'Tramadol',
    'codeina': 'Codeína',
    'morfina': 'Morfina',
    'oxicodona': 'Oxicodona',
    'fluconazol': 'Fluconazol',
    'itraconazol': 'Itraconazol',
    'cetoconazol': 'Cetoconazol',
    'terbinafina': 'Terbinafina',
    'sulfametoxazol': 'Sulfametoxazol',
    'trimetoprima': 'Trimetoprima',
  };

  return nameMap[cleanName] || cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}

function organizeMedicinesByCategory(medicines: string[]): HealthCategory[] {
  const categories: Record<string, Set<string>> = {
    Analgesia: new Set(),
    Antibióticos: new Set(),
    Psiquiatria: new Set(),
    Cardiovasculares: new Set(),
    Hormônios: new Set(),
    Antifúngicos: new Set(),
    Diversos: new Set(),
  };

  medicines.forEach((medicine) => {
    const lowerMedicine = medicine.toLowerCase();
    let categorized = false;

    for (const [key, category] of Object.entries(medicineCategoryMap)) {
      if (lowerMedicine.includes(key)) {
        categories[category].add(medicine);
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      categories["Diversos"].add(medicine);
    }
  });

  return Object.entries(categories)
    .map(([label, items]) => ({
      label,
      items: Array.from(items),
    }))
    .filter((cat) => cat.items.length > 0);
}

export function useAllergyMedicines() {
  const [categories, setCategories] = useState<HealthCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndOrganize = async () => {
      try {
        setIsLoading(true);
        const medicines = await fetchMedicinesFromApi();
        const organized = organizeMedicinesByCategory(medicines);
        setCategories(organized);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndOrganize();
  }, []);

  const allMedicines = categories.flatMap((cat) => cat.items);

  return {
    categories,
    allMedicines,
    isLoading,
  };
}
