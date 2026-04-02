import { View, Text, Pressable } from "react-native";
import { BottomTabParamList } from "../navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Clock2 } from "lucide-react-native";

type Props = BottomTabScreenProps<BottomTabParamList, "History">;

export function HistoryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#339CFF", "#006AFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <Clock2 size={62} color={"#FFFFFF"} />
        <Text className="font-montserrat-bold text-white text-2xl">
          Histórico de combinação
        </Text>
        <Text className="font-montserrat text-white text-base">
          Verifique interações medicamentosas analisadas anteriormente.
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light gap-3"></View>
    </View>
  );
}
