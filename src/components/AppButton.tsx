import React from "react";
import {
  Text,
  Pressable,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "lucide-react-native";
import MaskedView from "@react-native-masked-view/masked-view";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  isLoading?: boolean;
  className?: string;
}

const GRADIENT_COLORS = ["#2ECC71", "#00B4D8"] as const;

export function AppButton({
  title,
  onPress,
  variant = "primary",
  icon: Icon,
  isLoading = false,
  className = "",
}: AppButtonProps) {
  const iconColor =
    variant === "primary"
      ? "#FFF"
      : variant === "outline"
        ? "#344051"
        : "#00B4D8"; // ghost

  const content = () => {
    if (isLoading) {
      return (
        <ActivityIndicator color={variant === "primary" ? "#FFF" : "#00B4D8"} />
      );
    }

    return (
      <View className="flex-row items-center justify-center gap-2">
        {variant === "ghost" ? (
          <MaskedView
            maskElement={
              <Text className="font-montserrat-bold text-lg">{title}</Text>
            }
          >
            <LinearGradient
              colors={GRADIENT_COLORS}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="font-montserrat-bold text-lg opacity-0">
                {title}
              </Text>
            </LinearGradient>
          </MaskedView>
        ) : (
          <Text
            className={`font-montserrat-bold text-lg ${
              variant === "primary" ? "text-white" : "text-brand-primary"
            }`}
          >
            {title}
          </Text>
        )}

        {Icon && <Icon size={20} color={iconColor} />}
      </View>
    );
  };

  const baseStyle =
    "w-full h-14 rounded-2xl flex-row items-center justify-center";

  if (variant === "ghost") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isLoading}
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
            },
            android: { elevation: 4 },
          }),
        }}
        className={`${baseStyle} bg-white active:bg-gray-50 ${className}`}
      >
        {content()}
      </Pressable>
    );
  }

  if (variant === "outline") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isLoading}
        className={`${baseStyle} border border-border-darkGray bg-white active:bg-light ${className}`}
      >
        {content()}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      className={`${baseStyle} overflow-hidden active:opacity-90 ${className}`}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-full w-full flex-row items-center justify-center px-6"
      >
        {content()}
      </LinearGradient>
    </Pressable>
  );
}
