import { View, Text } from "react-native";
import { BottomTabParamList } from "../navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = BottomTabScreenProps<BottomTabParamList, "Medicine">;

export function MedicineScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#00B4D8", "#2ECC71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <Text className="font-montserrat-bold text-white text-2xl">
          Meus Medicamentos
        </Text>
        <Text className="font-montserrat text-white text-base">
          Adicione os medicamentos e analise suas interações.
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light gap-3"></View>
    </View>
  );
}
