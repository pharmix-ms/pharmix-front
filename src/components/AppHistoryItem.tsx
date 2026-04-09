import { Text, View } from "react-native";
import { AppBadge } from "./AppBadge";
import { Clock2 } from "lucide-react-native";

interface AppHistoryItemProps {
  title: string;
  date: string;
  medication: string;
  gravity: "danger" | "warning" | "safe";
}

export function AppHistoryItem({
  title,
  date,
  medication,
  gravity,
}: AppHistoryItemProps) {
  const borderColor =
    gravity === "danger"
      ? "border-danger"
      : gravity === "warning"
        ? "border-warning"
        : "border-secondary";
  return (
    <View
      className={`bg-white rounded-2xl border-l-8 ${borderColor} p-4 gap-1`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-brand-primary font-montserrat-bold flex-1">
          {title}
        </Text>
        <AppBadge variant={gravity} />
      </View>
      <View className="flex-row items-center gap-2">
        <Clock2 size={16} color={"#637083"} />
        <Text className="text-brand-secondary font-montserrat-semibold">
          {date}
        </Text>
      </View>
      <Text className="text-brand-secondary font-montserrat-semibold flex-1">
        {medication}
      </Text>
    </View>
  );
}
