import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHistoryItem } from "../components/AppHistoryItem";
import { Clock2, ClockFading, Trash2 } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HistoryStackParamList } from "../types/navigation";
import { HistoryEntry, useHistory } from "../hooks/useHistory";
import { useFocusEffect } from "@react-navigation/native";
import { memo, useCallback, useMemo } from "react";

type Props = NativeStackScreenProps<HistoryStackParamList, "HistoryList">;

function groupByDay(entries: HistoryEntry[]): Record<string, HistoryEntry[]> {
  return entries.reduce(
    (acc, entry) => {
      const label = new Date(entry.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (!acc[label]) acc[label] = [];
      acc[label].push(entry);
      return acc;
    },
    {} as Record<string, HistoryEntry[]>,
  );
}

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const HistoryListItem = memo(
  ({ entry, onPress }: { entry: HistoryEntry; onPress: () => void }) => (
    <AppHistoryItem
      title={
        "result" in entry
          ? "Consulta"
          : entry.status === "safe"
            ? "Sem interações cadastradas"
            : entry.interaction.acao || "Ação não informada"
      }
      date={formatTime(entry.date)}
      medication={
        "result" in entry ? entry.result.items.map(({ name }) => name).join(" + ") : entry.medicines?.join(" + ") ??
        [
          entry.interaction.medicamento1.nome,
          entry.interaction.medicamento2.nome,
        ].join(" + ")
      }
      gravity={"result" in entry ? undefined : entry.status === "safe" ? "safe" : "warning"}
      onPress={onPress}
    />
  ),
);

export function HistoryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { history, isLoading, loadFailed, clear, reload } = useHistory();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const handleClear = () => {
    Alert.alert(
      "Limpar histórico",
      "Tem certeza que deseja apagar todo o histórico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: () => {
            clear().catch(() => Alert.alert("Histórico", "Não foi possível apagar o histórico."));
          },
        },
      ],
    );
  };

  const sections = useMemo(() => {
    const grouped = groupByDay(history);
    return Object.keys(grouped).map((day) => ({
      title: day,
      data: grouped[day],
    }));
  }, [history]);

  const renderItem = useCallback(
    ({ item: entry }: { item: HistoryEntry }) => (
      <HistoryListItem
        entry={entry}
        onPress={() => {
          if ("result" in entry) {
            navigation.navigate("SavedResult", { result: entry.result });
            return;
          }
          navigation.navigate("Details", {
            interaction: entry.interaction,
            status: entry.status === "safe" ? "safe" : "warning",
            medicines: entry.medicines,
            fromHistory: true,
          });
        }}
      />
    ),
    [navigation],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <Text className="font-montserrat-semibold text-brand-secondary">
        {section.title}
      </Text>
    ),
    [],
  );

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
          Histórico de consultas
        </Text>
        <Text className="font-montserrat text-white text-base">
          Reabra as consultas salvas neste aparelho.
        </Text>
      </LinearGradient>

      <SectionList
        sections={sections}
        keyExtractor={(entry) => entry.id}
        className="bg-bg-light"
        contentContainerStyle={{ padding: 18, gap: 12, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        // Header com título e botão de limpar
        ListHeaderComponent={
          <View className="flex-row justify-between">
            <Text className="font-montserrat-bold text-brand-primary text-lg">
              Consultas salvas
            </Text>
            {(history.length > 0 || loadFailed) && (
              <TouchableOpacity
                onPress={handleClear}
                className="flex-row items-center gap-2"
              >
                <Trash2 size={22} color={"#E63946"} />
                <Text className="font-montserrat-bold text-danger text-sm">
                  Limpar Histórico
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
        // Estado vazio
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-10">
              <ActivityIndicator size="large" color="#006AFF" />
            </View>
          ) : loadFailed ? (
            <Text accessibilityRole="alert" className="font-montserrat text-red-600">
              Não foi possível carregar o histórico salvo.
            </Text>
          ) : (
            <View className="items-center justify-center py-16 gap-4">
              <ClockFading size={52} color="#344051" />
              <View>
                <Text className="font-montserrat-bold text-brand-primary text-center">
                  Nenhuma análise realizada ainda.
                </Text>
                <Text className="font-montserrat text-brand-secondary text-center">
                  Suas análises aparecerão aqui.
                </Text>
              </View>
            </View>
          )
        }
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View />}
        SectionSeparatorComponent={() => <View />}
      />
    </View>
  );
}
