import { CircleX, Pill } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { GradientWrapper } from "./GradientWrapper";

interface AppMedicineItemProps {
  name: string;
  type: string;
  onRemove: () => void;
}

export function AppMedicineItem({
  name,
  type,
  onRemove,
}: AppMedicineItemProps) {
  return (
    <View className="flex-1 flex-row items-center bg-white rounded-2xl border border-border-gray px-4 py-3">
      <View className="flex-1 flex-row items-center gap-4">
        <GradientWrapper>
          <Pill size={24} />
        </GradientWrapper>

        <View className="flex-1">
          <Text className="font-montserrat-medium text-brand-primary">
            {name}
          </Text>
          <Text className="font-montserrat-medium text-brand-secondary">
            {type}
          </Text>
        </View>
      </View>

      <Pressable onPress={onRemove}>
        <CircleX size={24} color={"#E63946"} />
      </Pressable>
    </View>
  );
}
