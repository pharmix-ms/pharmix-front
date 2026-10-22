import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

interface AppBadgeProps {
  variant: keyof typeof badgeText;
}

const badgeText = {
  safe: "Sem registro",
  warning: "Atenção",
  danger: "Perigoso",
};

const badgeBg = {
  safe: ["#2ECC71", "#2EB88A"],
  warning: ["#F4A261", "#FF8000"],
  danger: ["#FF6346", "#E63946"],
} as const;

export function AppBadge({ variant }: AppBadgeProps) {
  return (
    <View className="overflow-hidden rounded-full">
      <LinearGradient
        colors={badgeBg[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="justify-center items-center"
      >
        <Text className="font-montserrat-semibold text-white text-center px-4 py-1">
          {badgeText[variant]}
        </Text>
      </LinearGradient>
    </View>
  );
}
