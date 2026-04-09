import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MedicineStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import {
  ChevronLeft,
  CircleAlert,
  CircleQuestionMark,
  RotateCcw,
  Stethoscope,
  Zap,
} from "lucide-react-native";

type Props = NativeStackScreenProps<MedicineStackParamList, "Details">;

const STATUS_CONFIG = {
  safe: {
    colors: ["#2ECC71", "#2EB88A"] as const,
    bgColor: "#2ECC71",
  },
  warning: {
    colors: ["#F4A261", "#FF8000"] as const,
    bgColor: "#F4A261",
  },
  danger: {
    colors: ["#FF6346", "#E63946"] as const,
    bgColor: "#FF6346",
  },
};

export function DetailsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();

  const { status } = route.params;

  const config = STATUS_CONFIG[status];

  return (
    <View className="flex-1">
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="flex-row"
      >
        <TouchableOpacity
          className="pr-4 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={28} color="white" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-white text-2xl">
          Detalhes
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3 flex-1">
            <View className="rounded-2xl overflow-hidden">
              <LinearGradient
                colors={config.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-1 gap-2 px-4 py-3"
              >
                <Text className="font-montserrat-bold text-white text-lg">
                  Duplicidade de anti-hipertensivo
                </Text>
                <View className="flex-row gap-2 flex-wrap">
                  <View className="bg-light rounded-full px-4 py-2">
                    <Text className="font-montserrat-medium text-brand-primary">
                      IBUPROFENO
                    </Text>
                  </View>
                  <View className="bg-light rounded-full px-4 py-2">
                    <Text className="font-montserrat-medium text-brand-primary">
                      PARACETAMOL
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <View className="items-center flex-row gap-2">
                <CircleAlert size={24} color={"#344051"} />
                <Text className="font-montserrat-bold text-brand-primary">
                  O que acontece?
                </Text>
              </View>
              <Text className="font-montserrat text-brand-secondary">
                Dois anti-hipertensivos podem causar queda excessiva da pressão
                arterial.
              </Text>
            </View>
            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <View className="items-center flex-row gap-2">
                <Zap size={24} color={"#344051"} />
                <Text className="font-montserrat-bold text-brand-primary">
                  Possíveis efeitos
                </Text>
              </View>
              <Text className="font-montserrat text-brand-secondary">
                Tontura • Desmaios • Fraqueza
              </Text>
            </View>
            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <View className="items-center flex-row gap-2">
                <CircleQuestionMark size={24} color={"#344051"} />
                <Text className="font-montserrat-bold text-brand-primary">
                  Por que isso acontece?
                </Text>
              </View>
              <Text className="font-montserrat text-brand-secondary">
                Ambos reduzem a pressão arterial por mecanismos diferentes, o
                efeito combinado pode ser excessivo.
              </Text>
            </View>
            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <View className="items-center flex-row gap-2">
                <Stethoscope size={24} color={"#344051"} />
                <Text className="font-montserrat-bold text-brand-primary">
                  Recomendação
                </Text>
              </View>
              <Text className="font-montserrat text-brand-secondary">
                Se prescrito por um médico, siga as orientações. Não combine por
                conta própria.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="gap-3 pt-5">
          <AppButton
            title="Nova Análise"
            onPress={() => navigation.popToTop()}
            icon={RotateCcw}
            gradientColors={config.colors}
          />
        </View>
      </View>
    </View>
  );
}
