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
  Confirm: undefined;
  Result: { status: "safe" | "warning" | "danger" };
  Details: { status: "safe" | "warning" | "danger" };
};
