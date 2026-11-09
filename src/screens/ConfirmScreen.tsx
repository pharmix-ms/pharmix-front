import { ScrollView, View, Text } from "react-native";
import type { MedicineStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { Check, Microscope } from "lucide-react-native";
import { GradientWrapper } from "../components/GradientWrapper";
import { evaluateRules } from "../data/consultationRules";
import { loadHealthProfile } from "../hooks/useHealthProfile";
import { saveConsultation } from "../hooks/useHistory";
import { fetchInteracoes } from "../services/api";
import { useRef, useState } from "react";

type Props = NativeStackScreenProps<MedicineStackParamList, "Confirm">;

export function ConfirmScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { items } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const pending = useRef(false);

  async function handleConfirm() {
    if (pending.current) return;
    pending.current = true;
    setIsLoading(true);
    setError(undefined);
    try {
      const names = items.filter(({ type }) => type === "Princípio ativo").map(({ name }) => name);
      const profile = await loadHealthProfile().catch(() => {
        throw new Error("Não foi possível ler o perfil de saúde salvo. Confira o perfil e tente novamente.");
      });
      const interactions = names.length >= 2 ? await fetchInteracoes(names) : [];
      const result = { items, interactions, notes: evaluateRules(items, profile) };
      if (!navigation.isFocused()) return;

      const historySaved = await saveConsultation(result).then(() => true, () => false);
      if (navigation.isFocused()) navigation.navigate("Result", { result, historySaved });
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Não foi possível concluir a consulta.");
    } finally {
      pending.current = false;
      setIsLoading(false);
    }
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
          Revise os itens selecionados.
        </Text>
      </LinearGradient>
      <ScrollView
        className="flex-1 bg-bg-light"
        contentContainerStyle={{ padding: 20, gap: 12 }}
      >
        <Text className="font-montserrat-bold text-brand-primary text-lg">
          Itens adicionados
        </Text>
        {items.map((item, index) => (
          <View
            key={`${item.type}:${item.name}`}
            className="flex-row items-center bg-white rounded-2xl border border-border-gray px-4 py-3 gap-4"
          >
            <GradientWrapper>
              <Text className="font-montserrat-medium text-xl w-6 text-center">
                {index + 1}
              </Text>
            </GradientWrapper>
            <View className="flex-1">
              <Text className="font-montserrat-medium text-brand-primary">{item.name}</Text>
              <Text className="font-montserrat-medium text-brand-secondary">{item.type}</Text>
            </View>
          </View>
        ))}

        <View className="border bg-bg-warning border-warning rounded-2xl gap-4 flex-row items-center px-4 py-3">
          <Microscope size={24} color="#F4A261" />
          <Text className="font-montserrat-semibold text-brand-primary flex-1">
            A consulta cobre os registros disponíveis e usa o perfil salvo no aparelho.
            Procure um profissional de saúde para avaliar o uso dos medicamentos.
          </Text>
        </View>

        {error && (
          <Text accessibilityRole="alert" className="font-montserrat text-center text-red-600">
            {error}
          </Text>
        )}

        <AppButton
          title={isLoading ? "Analisando..." : "Confirmar análise"}
          onPress={handleConfirm}
          icon={isLoading ? undefined : Check}
          disabled={isLoading}
          isLoading={isLoading}
        />
        <AppButton
          title="Voltar"
          variant="outline"
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        />
      </ScrollView>
    </View>
  );
}
