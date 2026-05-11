import { Medicine } from "../hooks/useMedicineSearch";
import { ApiInteracao } from "./api";

export type RootStackParamList = {
  Home: undefined;
  MainTabs: { screen: keyof BottomTabParamList } | undefined;
};

export type BottomTabParamList = {
  Profile: undefined;
  History: undefined;
  MedicineStack: undefined;
};

export type MedicineStackParamList = {
  Medicine: undefined;
  Camera: undefined;
  Confirm: { medicines: Medicine[] };
  Result: { medicines: Medicine[]; interactions: ApiInteracao[] };
  Details: {
    interaction: ApiInteracao;
    status: "safe" | "warning" | "danger";
    medicines?: string[];
    fromHistory?: boolean;
  };
};

export type HistoryStackParamList = {
  HistoryList: undefined;
  Details: {
    interaction: ApiInteracao;
    status: "danger" | "safe" | "warning";
    medicines?: string[];
    fromHistory?: boolean;
  };
};
