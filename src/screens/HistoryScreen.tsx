import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHistoryItem } from "../components/AppHistoryItem";
import { Clock2, ClockFading, Trash2 } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HistoryStackParamList } from "../types/navigation";
import { HistoryEntry, useHistory } from "../hooks/useHistory";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export function HistoryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { history, isLoading, clear, reload } = useHistory();

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
        { text: "Apagar", style: "destructive", onPress: clear },
      ],
    );
  };

  const grouped = groupByDay(history);
  const days = Object.keys(grouped);

  useEffect(() => {
    AsyncStorage.getItem("@medicine_history").then((raw) => {
      console.log("History:", JSON.parse(raw ?? "[]"));
    });
  }, []);

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

      <ScrollView showsVerticalScrollIndicator={false} className="bg-bg-light">
        <View className="flex-1 p-5 bg-bg-light gap-3">
          <View className="flex-row justify-between">
            <Text className="font-montserrat-bold text-brand-primary text-lg">
              Interações Analisadas
            </Text>
            {history.length > 0 && (
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

          {isLoading && (
            <View className="items-center py-10">
              <ActivityIndicator size="large" color="#006AFF" />
            </View>
          )}

          {!isLoading && history.length === 0 && (
            <View className="items-center justify-center py-16 gap-2">
              <ClockFading size={42} color="#344051" />
              <Text className="font-montserrat-bold text-brand-primary text-center">
                Nenhuma análise realizada ainda.
              </Text>
              <Text className="font-montserrat text-brand-secondary text-center">
                Suas análises aparecerão aqui.
              </Text>
            </View>
          )}

          {!isLoading &&
            days.map((day) => (
              <View key={day} className="gap-3">
                <Text className="font-montserrat-semibold text-brand-secondary">
                  {day}
                </Text>
                <View className="gap-3">
                  {grouped[day].map((entry) => (
                    <AppHistoryItem
                      key={entry.id}
                      title={entry.interaction.acao || "Ação não informada"}
                      date={formatTime(entry.date)}
                      medication={
                        entry.medicines?.join(" + ") ??
                        [
                          entry.interaction.medicamento1.nome,
                          entry.interaction.medicamento2.nome,
                        ].join(" + ")
                      }
                      gravity={entry.status}
                      onPress={() =>
                        navigation.navigate("Details", {
                          interaction: entry.interaction,
                          status: entry.status,
                          medicines: entry.medicines,
                          fromHistory: true,
                        })
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
