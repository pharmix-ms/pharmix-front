import { View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStack";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export function DetailsScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Details Screen</Text>

      <Pressable
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
        onPress={() => navigation.navigate("Details")}
      >
        <Text className="text-white">Ir para detalhes</Text>
      </Pressable>
    </View>
  );
}
