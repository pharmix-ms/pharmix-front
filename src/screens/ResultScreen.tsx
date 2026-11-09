import { Alert, Linking, Pressable, ScrollView, Text, View } from "react-native";
import type { HistoryStackParamList, MedicineStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClipboardList, RotateCcw } from "lucide-react-native";
import { AppButton } from "../components/AppButton";
import { AppInteractionItem } from "../components/AppInteractionItem";
import type { ApiInteracao } from "../types/api";
import type { ConsultationNote, ConsultationResult } from "../types/consultation";

type ResultProps = NativeStackScreenProps<MedicineStackParamList, "Result">;
type SavedResultProps = NativeStackScreenProps<HistoryStackParamList, "SavedResult">;

function NoteCard({ note }: { note: ConsultationNote }) {
  const { source } = note;
  return (
    <View className="bg-white rounded-2xl p-4 gap-2">
      <Text className="font-montserrat-semibold text-brand-info">{note.kind}</Text>
      <Text className="font-montserrat-bold text-brand-primary">{note.title}</Text>
      <Text className="font-montserrat text-brand-secondary">{note.text}</Text>
      {source && (
        <Pressable
          accessibilityRole="link"
          onPress={() => {
            Linking.openURL(source.url).catch(() => {
              Alert.alert("Fonte indisponível", "Não foi possível abrir o endereço da fonte.");
            });
          }}
        >
          <Text className="font-montserrat-semibold text-primary underline">{source.label}</Text>
        </Pressable>
      )}
    </View>
  );
}

export function ResultScreen({ navigation, route }: ResultProps) {
  return (
    <ResultContent
      result={route.params.result}
      historyFailed={route.params.historySaved === false}
      onDetails={(interaction) => navigation.navigate("Details", { interaction, status: "warning" })}
      onContinue={() => navigation.reset({ index: 0, routes: [{ name: "Medicine" }] })}
    />
  );
}

export function SavedResultScreen({ navigation, route }: SavedResultProps) {
  return (
    <ResultContent
      result={route.params.result}
      fromHistory
      onDetails={(interaction) =>
        navigation.navigate("Details", { interaction, status: "warning", fromHistory: true })
      }
      onContinue={() => navigation.goBack()}
    />
  );
}

function ResultContent({
  result,
  fromHistory = false,
  historyFailed = false,
  onDetails,
  onContinue,
}: {
  result: ConsultationResult;
  fromHistory?: boolean;
  historyFailed?: boolean;
  onDetails: (interaction: ApiInteracao) => void;
  onContinue: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { items, interactions, notes } = result;
  const hasRecords = interactions.length > 0 || notes.length > 0;
  const checkedMedicinePairs = items.filter(({ type }) => type === "Princípio ativo").length >= 2;
  const title = hasRecords
    ? "Resultado da consulta"
    : items.length === 1
      ? "Nenhum alerta do perfil para este item"
      : "Sem registros para a seleção";

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#266697", "#275070"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <ClipboardList size={42} color="white" />
        <Text className="font-montserrat-bold text-white text-2xl">
          {title}
        </Text>
        <Text className="font-montserrat text-white text-base">
          A ausência de um alerta na base consultada não confirma ausência de risco.
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {historyFailed && (
            <Text accessibilityRole="alert" className="font-montserrat text-red-600">
              Não foi possível salvar esta consulta no histórico.
            </Text>
          )}
          <View className="bg-white rounded-2xl p-4 gap-2">
            <Text className="font-montserrat-bold text-brand-primary">Itens consultados</Text>
            {items.map((item) => (
              <Text
                key={`${item.type}:${item.name}`}
                className="font-montserrat-medium text-brand-secondary"
              >
                {item.name} · {item.type}
              </Text>
            ))}
          </View>
          {interactions.length > 0 && (
            <Text className="font-montserrat-bold text-brand-primary text-lg">
              Interações entre princípios ativos ({interactions.length})
            </Text>
          )}
          {interactions.map((interaction) => (
            <AppInteractionItem
              key={interaction.id}
              gravity="warning"
              title={interaction.acao || "Ação não informada"}
              medication={[interaction.medicamento1.nome, interaction.medicamento2.nome]}
              onPress={() => onDetails(interaction)}
            />
          ))}
          {checkedMedicinePairs && interactions.length === 0 && notes.length > 0 && (
            <Text className="font-montserrat text-brand-secondary">
              A base consultada não retornou registros entre os princípios ativos selecionados.
            </Text>
          )}
          {notes.map((note) => <NoteCard key={note.id} note={note} />)}
          <Text className="font-montserrat text-brand-secondary">
            O Pharmix fornece informações para conversar com um profissional de saúde.
            Siga a orientação da equipe que acompanha seu tratamento.
          </Text>
        </ScrollView>
        <View className="pt-4">
          <AppButton
            title={fromHistory ? "Voltar ao histórico" : "Nova consulta"}
            variant="outline"
            onPress={onContinue}
            icon={fromHistory ? undefined : RotateCcw}
          />
        </View>
      </View>
    </View>
  );
}
