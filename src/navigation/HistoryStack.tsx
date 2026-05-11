// src/navigation/HistoryStack.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "../screens/DetailsScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { HistoryStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryList" component={HistoryScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
