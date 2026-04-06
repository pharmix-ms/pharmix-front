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
  Result: undefined;
  Details: { interactionId?: string };
};
