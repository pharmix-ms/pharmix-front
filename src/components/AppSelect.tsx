import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

interface Option {
  label: string;
  value: string | number;
}

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedValue?: string | number;
  onValueChange: (value: string | number) => void;
  containerClassName?: string;
}

export function AppSelect({
  label,
  placeholder = "Selecione uma opção",
  options,
  selectedValue,
  onValueChange,
  containerClassName,
}: AppSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // Encontra o label da opção selecionada para mostrar no botão
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (item: Option) => {
    onValueChange(item.value);
    setModalVisible(false);
  };

  return (
    <View className={`flex-col w-full gap-1 ${containerClassName}`}>
      {label && (
        <Text className="font-montserrat-medium text-brand-primary text-base">
          {label}
        </Text>
      )}

      {/* O "Botão" que parece um Input */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center bg-white border border-border-gray rounded-2xl px-4 py-3 active:bg-gray-50"
      >
        <Text
          className={`flex-1 font-montserrat text-base ${
            selectedOption ? "text-brand-primary" : "text-brand-secondary"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <ChevronDown size={20} color="#637083" />
      </Pressable>

      {/* Modal de Seleção */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-6 pb-10">
            <Text className="font-montserrat-bold text-brand-primary text-lg mb-4">
              {label || "Selecione"}
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className={`py-4 border-b border-border-gray ${
                    selectedValue === item.value ? "bg-light/50" : ""
                  }`}
                >
                  <Text
                    className={`font-montserrat text-base ${
                      selectedValue === item.value
                        ? "text-primary font-montserrat-semibold"
                        : "text-brand-primary"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
