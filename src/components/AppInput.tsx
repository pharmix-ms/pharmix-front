import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  containerClassName?: string;
}

export function AppInput({
  label,
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  className,
  containerClassName,
  ...rest
}: AppInputProps) {
  return (
    <View className={`flex-col w-full gap-1 ${containerClassName}`}>
      {label && (
        <Text className="font-montserrat-medium text-brand-primary text-base">
          {label}
        </Text>
      )}

      <View className="flex-row items-center bg-white border border-border-gray rounded-2xl px-3">
        <TextInput
          {...rest}
          className={`flex-1 py-3 font-montserrat placeholder:text-brand-secondary text-brand-primary text-base ${className}`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />

        {Icon && (
          <Icon
            size={20}
            color="#637083" // Cor 'brand-secondary'
            className="ml-2"
          />
        )}
      </View>
    </View>
  );
}
