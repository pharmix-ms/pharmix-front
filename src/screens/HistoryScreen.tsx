import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHistoryItem } from "../components/AppHistoryItem";

export function HistoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LinearGradient
        // colors={["#339CFF", "#006AFF"]}
        colors={["#00B4D8", "#2ECC71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        {/* <Clock2 size={62} color={"#FFFFFF"} /> */}
        <Text className="font-montserrat-bold text-white text-2xl">
          Histórico de combinação
        </Text>
        <Text className="font-montserrat text-white text-base">
          Verifique interações medicamentosas analisadas anteriormente.
        </Text>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 p-5 bg-bg-light gap-3">
          <Text className="font-montserrat-bold text-brand-primary text-lg">
            Interações Analisadas
          </Text>
          <View className="gap-3">
            <Text className="font-montserrat-semibold text-brand-secondary">
              25 de mar. 2026
            </Text>
            <View className="gap-3">
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="seguro"
              />
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="atencao"
              />
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="perigoso"
              />
            </View>
          </View>
          <View className="gap-3">
            <Text className="font-montserrat-semibold text-brand-secondary">
              25 de mar. 2026
            </Text>
            <View className="gap-3">
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="seguro"
              />
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="atencao"
              />
              <AppHistoryItem
                title="Antidiabético com Anti-inflamatório"
                date="Ontem, 09:15"
                medication="Metformina 500mg + Voltaren 50mg"
                gravity="perigoso"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
