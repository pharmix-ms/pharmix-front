import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MedicineStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import {
  ChevronLeft,
  CircleAlert,
  RotateCcw,
  Stethoscope,
} from "lucide-react-native";

type Props = NativeStackScreenProps<MedicineStackParamList, "Details">;

const STATUS_CONFIG = {
  safe: { colors: ["#2ECC71", "#2EB88A"] as const },
  warning: { colors: ["#F4A261", "#FF8000"] as const },
  danger: { colors: ["#FF6346", "#E63946"] as const },
};

export function DetailsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { interaction, status } = route.params;
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
                className="flex-1 gap-2 px-4 py-4"
              >
                <Text className="font-montserrat-bold text-white text-2xl">
                  {interaction.acao || "Ação não informada"}
                </Text>
                <View className="gap-1">
                  <Text className="font-montserrat-bold text-white">
                    Medicamentos envolvidos:
                  </Text>
                  <View className="flex-row gap-2 flex-wrap">
                    {[
                      interaction.medicamento1.nome,
                      interaction.medicamento2.nome,
                    ].map((nome) => (
                      <View
                        key={nome}
                        className="bg-light rounded-full px-4 py-2"
                      >
                        <Text className="font-montserrat-medium text-brand-primary">
                          {nome}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <View className="items-center flex-row gap-2">
                <CircleAlert size={24} color={"#344051"} />
                <Text className="font-montserrat-bold text-brand-primary">
                  Mecanismo ou Efeito:
                </Text>
              </View>
              <Text className="font-montserrat text-brand-secondary">
                {interaction.mecanismo_efeito}
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
                {interaction.recomendacoes}
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
