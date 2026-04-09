import { View, Text } from "react-native";
import { MedicineStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { Check, Microscope } from "lucide-react-native";
import { GradientWrapper } from "../components/GradientWrapper";

type Props = NativeStackScreenProps<MedicineStackParamList, "Confirm">;

export function ConfirmScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { medicines } = route.params;

  function getRandomStatus(): "safe" | "warning" | "danger" {
    const options = ["safe", "warning", "danger"] as const;
    return options[Math.floor(Math.random() * options.length)];
  }

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
          Tudo certo para analisar?
        </Text>
        <Text className="font-montserrat text-white text-base">
          Revise os medicamentos selecionados.
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light gap-3">
        <Text className="font-montserrat-bold text-brand-primary text-lg">
          Medicamentos Adicionados
        </Text>
        {medicines.map((medicine, index) => (
          <View
            key={index}
            className="flex-row items-center bg-white rounded-2xl border border-border-gray px-4 py-3 gap-4"
          >
            <GradientWrapper>
              <Text className="font-montserrat-medium text-xl w-6 text-center">
                {index + 1}
              </Text>
            </GradientWrapper>
            <View className="flex-1">
              <Text className="font-montserrat-medium text-brand-primary">
                {medicine.name}
              </Text>
              <Text className="font-montserrat-medium text-brand-secondary">
                {medicine.type}
              </Text>
            </View>
          </View>
        ))}

        <View className="border bg-bg-warning border-warning rounded-2xl gap-4 flex-row items-center px-4 py-3">
          <Microscope size={24} color={"#F4A261"} />
          <Text className="font-montserrat-semibold text-warning flex-1">
            Nossa análise verifica interações conhecidas entre esses medicamenos
            com base em bancos de dados farmacológicas. Sempre consulte um
            farmacêutico para orientação personalizada.
          </Text>
        </View>
        <AppButton
          title="Confirmar Análise"
          onPress={() =>
            navigation.navigate("Result", {
              medicines: medicines,
              status: getRandomStatus(), // ← mock, depois vira resposta da API
            })
          }
          icon={Check}
        />
        <AppButton
          title="Voltar"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
