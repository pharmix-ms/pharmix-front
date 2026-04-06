export type RootStackParamList = {
  Home: undefined;
  BottomTabs: undefined;
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
