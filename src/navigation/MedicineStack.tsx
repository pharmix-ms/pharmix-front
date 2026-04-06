import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MedicineStackParamList } from "./types";
import { MedicineScreen } from "../screens/MedicineScreen";
import { ConfirmScreen } from "../screens/ConfirmScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { DetailsScreen } from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator<MedicineStackParamList>();

export function MedicineStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Medicine"
    >
      <Stack.Screen name="Medicine" component={MedicineScreen} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
