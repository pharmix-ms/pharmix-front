import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MedicineStackParamList } from "./types";
import { MedicineScreen } from "../screens/MedicineScreen";

const Stack = createNativeStackNavigator<MedicineStackParamList>();

export function MedicineStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Medicine" component={MedicineScreen} />
    </Stack.Navigator>
  );
}
