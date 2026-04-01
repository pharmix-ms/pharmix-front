import React, { useEffect, useRef } from "react";
import { Pressable, Text, View, Animated, Easing } from "react-native";

interface CustomSwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: number;
}

export function AppSwitch({
  label,
  value,
  onValueChange,
  size = 28,
}: CustomSwitchProps) {
  const padding = 3;
  const trackHeight = size;
  const trackWidth = size * 2;
  const knobSize = size - padding * 2;
  const maxTranslate = trackWidth - knobSize - padding * 2;

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200, // Tempo da transição em milissegundos
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxTranslate],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CED2DA", "#2EB88A"],
  });

  return (
    <View className="flex-row items-center justify-between w-full py-2">
      {label && (
        <Text className="font-montserrat-medium text-brand-primary text-base">
          {label}
        </Text>
      )}

      <Pressable onPress={() => onValueChange(!value)}>
        <Animated.View
          style={{
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            padding,
            backgroundColor,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              backgroundColor: "#fff",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              transform: [{ translateX }],
            }}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}
