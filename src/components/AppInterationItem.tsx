import { Text, View } from "react-native";
import { AppBadge } from "./AppBadge";

interface AppInterationItemProps {
  title: string;
  medication: string[];
  gravity: "danger" | "warning" | "safe";
}

export function AppInterationItem({
  title,
  medication,
  gravity,
}: AppInterationItemProps) {
  const borderColor =
    gravity === "danger"
      ? "border-danger"
      : gravity === "warning"
        ? "border-warning"
        : "border-secondary";
  return (
    <View
      className={`bg-white rounded-2xl border-l-8 ${borderColor} p-4 gap-1 flex-col`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-brand-primary font-montserrat-bold flex-1">
          {title}
        </Text>
        <AppBadge variant={gravity} />
      </View>
      <Text className="text-brand-secondary font-montserrat-semibold">
        {medication.join(" + ")}
      </Text>
    </View>
  );
}
