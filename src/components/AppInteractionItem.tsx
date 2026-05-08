import { Text, TouchableOpacity, View } from "react-native";
import { AppBadge } from "./AppBadge";

interface AppInteractionItemProps {
  title: string;
  medication: string[];
  gravity: "danger" | "warning" | "safe";
  onPress?: () => void;
}

export function AppInteractionItem({
  title,
  medication,
  gravity,
  onPress,
}: AppInteractionItemProps) {
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
      className={`bg-white rounded-2xl border-l-8 ${borderColor} p-4 gap-1 flex-col`}
    >
      <View className="flex-row justify-between gap-2">
        <Text className="text-brand-primary font-montserrat-bold flex-1">
          {title}
        </Text>
        <AppBadge variant={gravity} />
      </View>
      <Text className="text-brand-secondary font-montserrat-semibold">
        {medication.join(" + ")}
      </Text>
    </TouchableOpacity>
  );
}
