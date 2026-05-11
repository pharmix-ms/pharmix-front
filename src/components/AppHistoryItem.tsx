import { Text, TouchableOpacity, View } from "react-native";
import { AppBadge } from "./AppBadge";
import { ChevronRight, Clock2 } from "lucide-react-native";

interface AppHistoryItemProps {
  title: string;
  date: string;
  medication: string;
  gravity: "danger" | "warning" | "safe";
  onPress?: () => void;
}

export function AppHistoryItem({
  title,
  date,
  medication,
  gravity,
  onPress,
}: AppHistoryItemProps) {
  const borderColor =
    gravity === "danger"
      ? "border-danger"
      : gravity === "warning"
        ? "border-warning"
        : "border-secondary";
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!onPress}
      className={`bg-white rounded-2xl border-l-8 ${borderColor} p-4 pr-2 gap-1 flex-row items-center justify-between`}
    >
      <View className="flex-1 gap-1">
        <View className="flex-row items-start gap-2 justify-between">
          <Text className="text-brand-primary font-montserrat-bold flex-1">
            {title}
          </Text>
          <View className="flex-row items-center gap-1">
            <AppBadge variant={gravity} />
          </View>
        </View>
        <Text className="text-brand-secondary font-montserrat-semibold flex-1">
          {medication}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-brand-secondary font-montserrat">{date}</Text>
        </View>
      </View>
      {onPress && <ChevronRight size={26} color="#9AA3AF" />}
    </TouchableOpacity>
  );
}
