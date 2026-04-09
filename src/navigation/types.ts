import { Medicine } from "../hooks/UseMedicineSearch";

export type RootStackParamList = {
  Home: undefined;
  MainTabs: undefined;
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
  Result: { medicines: Medicine[]; status: "safe" | "warning" | "danger" };
  Details: { status: "safe" | "warning" | "danger" };
};
