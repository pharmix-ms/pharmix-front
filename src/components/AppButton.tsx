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
import { GradientWrapper } from "../components/GradientWrapper";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  isLoading?: boolean;
  className?: string;
  gradientColors?: readonly [string, string];
  disabled?: boolean;
}

const DEFAULT_GRADIENT_COLORS = ["#2ECC71", "#00B4D8"] as const;

export function AppButton({
  title,
  onPress,
  variant = "primary",
  icon: Icon,
  isLoading = false,
  className = "",
  gradientColors = DEFAULT_GRADIENT_COLORS,
  disabled = false,
}: AppButtonProps) {
  const iconColor = variant === "primary" ? "#FFF" : "#344051";

  const content = () => {
    if (isLoading) {
      return (
        <ActivityIndicator color={variant === "primary" ? "#FFF" : "#00B4D8"} />
      );
    }

    const innerContent = (
      <View className="flex-row items-center justify-center gap-2">
        <Text
          className={`font-montserrat-bold text-lg shrink ${
            variant === "primary" ? "text-white" : "text-brand-primary"
          }`}
          numberOfLines={1}
        >
          {title}
        </Text>
        {Icon && <Icon size={20} color={iconColor} />}
      </View>
    );

    if (variant === "ghost") {
      return <GradientWrapper>{innerContent}</GradientWrapper>;
    }

    return innerContent;
  };

  const baseStyle = "h-14 rounded-2xl flex-row items-center justify-center";

  if (variant === "ghost") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isLoading || disabled}
        style={Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          android: { elevation: 4 },
        })}
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
        disabled={isLoading || disabled}
        className={`${baseStyle} border border-border-darkGray bg-white active:bg-light ${className}`}
      >
        {content()}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading || disabled}
      className={`${baseStyle} overflow-hidden ${
        disabled ? "opacity-50" : "active:opacity-90"
      } ${className}`}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-full w-full flex-row items-center justify-center px-6"
      >
        {content()}
      </LinearGradient>
    </Pressable>
  );
}
