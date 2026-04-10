import React, { useEffect, useRef } from "react";
import { Text, Pressable, Animated, StyleSheet } from "react-native";
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
      className={`overflow-hidden rounded-full bg-bg-light ${className}`}
      style={[styles.badgeContainer]}
    >
      <Animated.View
        style={[styles.badgeLayer, { opacity: unselectedOpacity }]}
        className="items-center justify-center px-4 py-3"
      >
        <Text style={styles.badgeText} className="text-brand-primary font-montserrat-medium text-base text-center">
          {title}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.absoluteFill, { opacity: selectedOpacity }]}> 
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 px-4 py-2"
        >
          <Text style={styles.badgeText} className="text-white font-montserrat-medium text-base text-center">
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: "relative",
    minWidth: 110,
    maxWidth: 160,
    alignSelf: "flex-start",
  },
  badgeLayer: {
    width: "100%",
    alignSelf: "flex-start",
  },
  badgeText: {
    textAlign: "center",
    flexWrap: "wrap",
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
