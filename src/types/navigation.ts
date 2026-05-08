import { Medicine } from "../hooks/UseMedicineSearch";
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
  Details: { interaction: ApiInteracao; status: "safe" | "warning" | "danger" };
};
