import { View, Text, ScrollView } from "react-native";
import { MedicineStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  ClipboardList,
  RotateCcw,
  XCircle,
} from "lucide-react-native";
import { AppButton } from "../components/AppButton";
import { AppInterationItem } from "../components/AppInterationItem";

type Props = NativeStackScreenProps<MedicineStackParamList, "Result">;

const STATUS_CONFIG = {
  safe: {
    label: "Combinação Segura",
    description:
      "Nenhuma interação perigosa foi encontrada entre os medicamentos selecionados.",
    colors: ["#2ECC71", "#2EB88A"] as const,
    icon: CheckCircle,
    iconColor: "#2ECC71",
  },
  warning: {
    label: "Requer Atenção",
    description: "Foram encontradas possíveis interações que requerem cuidado.",
    colors: ["#F4A261", "#FF8000"] as const,
    icon: AlertTriangle,
    iconColor: "#F4A261",
  },
  danger: {
    label: "Combinação Perigosa",
    description:
      "Interações perigosas detectadas. Consulte um médico antes de usar.",
    colors: ["#FF6346", "#E63946"] as const,
    icon: XCircle,
    iconColor: "#E63946",
  },
};

export function ResultScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  // useHideTabBar();
  const { medicines, status } = route.params;

  const config = STATUS_CONFIG[status];

  const isSafe = status === "safe";

  return (
    <View className="flex-1">
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <config.icon size={62} color={"#FFFFFF"} />
        <Text className="font-montserrat-bold text-white text-2xl">
          {config.label}
        </Text>
        <Text className="font-montserrat text-white text-base">
          {config.description}
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3 flex-1">
            <View className="bg-white rounded-2xl px-4 py-3 gap-2">
              <Text className="font-montserrat-semibold text-brand-primary">
                Medicamentos analisados
              </Text>
              <View className="flex-row gap-2 flex-wrap">
                {medicines.map((medicine, index) => (
                  <View key={index} className="bg-light rounded-full px-4 py-2">
                    <Text className="font-montserrat-medium text-brand-primary">
                      {medicine.type}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <Text className="font-montserrat-bold text-brand-primary text-lg">
              Interações encontradas {isSafe ? "" : "(1)"}
            </Text>
            {isSafe ? (
              <View className="justify-center items-center bg-bg-safe rounded-2xl border-2 border-secondary border-dashed py-9 gap-2">
                <Check size={42} color={"#344051"} />
                <View className="items-center">
                  <Text className="font-montserrat-bold text-brand-primary text-lg">
                    Nenhuma interação encontrada
                  </Text>
                  <Text className="font-montserrat-bold text-brand-secondary text-center">
                    Consumir as medicações em conjunto não causarão efeitos
                    colaterais
                  </Text>
                </View>
              </View>
            ) : (
              <AppInterationItem
                gravity={status}
                title="Duplicidade de anti-hipertensivo"
                medication={["IBUPROFENO", "PARACETAMOL"]}
              />
            )}
          </View>
        </ScrollView>
        <View className="gap-3 pt-5">
          <AppButton
            title="Nova Análise"
            variant={isSafe ? "primary" : "outline"}
            onPress={() => navigation.popToTop()}
            icon={RotateCcw}
            gradientColors={isSafe ? config.colors : undefined}
          />
          {!isSafe && (
            <AppButton
              title="Ver detalhes completos"
              onPress={() => navigation.navigate("Details", { status })}
              icon={ClipboardList}
              gradientColors={config.colors}
            />
          )}
        </View>
      </View>
    </View>
  );
}
