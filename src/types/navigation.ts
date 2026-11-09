import type { ApiInteracao } from "./api";
import type { ConsultationItem, ConsultationResult } from "./consultation";

export type RootStackParamList = {
  Home: undefined;
  MainTabs: { screen: keyof BottomTabParamList } | undefined;
};

export type BottomTabParamList = {
  Profile: undefined;
  History: undefined;
  MedicineStack: undefined;
};

type DetailsParams = {
  interaction: ApiInteracao;
  status: "safe" | "warning" | "danger";
  medicines?: string[];
  fromHistory?: boolean;
};

export type MedicineStackParamList = {
  Medicine: undefined;
  Camera: undefined;
  Confirm: { items: ConsultationItem[] };
  Result: { result: ConsultationResult; historySaved?: boolean };
  Details: DetailsParams;
};

export type HistoryStackParamList = {
  HistoryList: undefined;
  SavedResult: { result: ConsultationResult };
  Details: DetailsParams;
};
