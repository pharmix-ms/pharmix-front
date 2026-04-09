import React, { useState, useRef } from "react";
import { View, Text, Pressable, Modal, FlatList } from "react-native";
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
  const [dropdownTop, setDropdownTop] = useState(0);

  const inputRef = useRef<View>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const openDropdown = () => {
    inputRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownTop(y + height + 4);
      setModalVisible(true);
    });
  };

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

      {/* "Input fake" */}
      <View ref={inputRef}>
        <Pressable
          onPress={openDropdown}
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
      </View>

      {/* Dropdown estilo autocomplete */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <View
            style={{
              position: "absolute",
              top: dropdownTop,
              left: 20,
              right: 20,
              backgroundColor: "white",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              maxHeight: 220,
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              overflow: "hidden",
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item)}
                  className={`px-4 py-3 border-b border-border-gray ${
                    selectedValue === item.value ? "bg-bg-info" : ""
                  } active:bg-gray-100`}
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
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
