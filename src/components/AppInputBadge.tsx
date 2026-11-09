import React, { useEffect, useRef } from "react";
import { Text, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AppInputBadgeProps {
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
  className?: string;
}

const GRADIENT_COLORS = ["#2ECC71", "#00B4D8"] as const;

export function AppInputBadge({
  title,
  isSelected,
  onPress,
  className = "",
}: AppInputBadgeProps) {
  const animatedValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSelected ? 1 : 0,
      duration: 100, // Velocidade do fade (ms)
      useNativeDriver: true, // Melhora performance
    }).start();
  }, [isSelected, animatedValue]);

  const selectedOpacity = animatedValue;

  const unselectedOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected: isSelected }}
      className={`overflow-hidden rounded-full bg-bg-light ${className}`}
      style={{ position: "relative" }}
    >
      <Animated.View accessible={false} importantForAccessibility="no-hide-descendants"
        style={{ opacity: unselectedOpacity }}
        className="items-center justify-center px-4 py-2"
      >
        <Text className="text-brand-primary font-montserrat-medium text-base">
          {title}
        </Text>
      </Animated.View>

      <Animated.View accessible={false} importantForAccessibility="no-hide-descendants"
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: selectedOpacity,
        }}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 px-4 py-2"
        >
          <Text className="text-white font-montserrat-medium text-base">
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

import { StyleSheet } from "react-native";
