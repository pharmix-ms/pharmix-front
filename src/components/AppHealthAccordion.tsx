import { ChevronRight } from "lucide-react-native";
import { useRef, useState } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { AppInputBadge } from "./AppInputBadge";
import { HealthCategory } from "../data/healthData";

interface AppHealthAccordionProps {
  title: string;
  categories: HealthCategory[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
}

export function AppHealthAccordion({
  title,
  categories,
  selectedItems,
  onToggleItem,
}: AppHealthAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.label ?? "",
  );

  const rotation = useRef(new Animated.Value(0)).current;

  const currentItems =
    categories.find((cat) => cat.label === selectedCategory)?.items ?? [];

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    Animated.timing(rotation, {
      toValue: next ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="w-full gap-3 mb-2">
      {/* ── Header ── */}
      <Pressable
        onPress={handleToggle}
        className="w-full flex-row items-center justify-between rounded-2xl bg-white border border-border-gray px-4 py-4"
      >
        <View>
          <Text className="font-montserrat-medium text-brand-primary text-base">
            {title}
          </Text>
          <Text className="font-montserrat text-gray-500 text-xs mt-1">
            {selectedItems.length} selecionada
            {selectedItems.length !== 1 ? "s" : ""}
          </Text>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "90deg"],
                }),
              },
            ],
          }}
        >
          <ChevronRight size={24} color="#00B4D8" />
        </Animated.View>
      </Pressable>

      {/* ── Expanded panel ── */}
      {expanded && (
        <View className="w-full rounded-2xl bg-white border border-border-gray p-3">
          {/* Category tabs */}
          <View className="rounded-2xl bg-bg-light p-3 mb-3">
            <Text className="font-montserrat-medium text-brand-primary text-sm mb-2">
              Categorias
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {categories.map((cat) => (
                  <Pressable
                    key={cat.label}
                    onPress={() => setSelectedCategory(cat.label)}
                    className={`rounded-full px-4 py-2 min-w-[120px] items-center justify-center ${
                      selectedCategory === cat.label
                        ? "bg-brand-primary"
                        : "bg-white border border-border-gray"
                    }`}
                  >
                    <Text
                      className={`font-montserrat-medium text-sm text-center ${
                        selectedCategory === cat.label
                          ? "text-white"
                          : "text-brand-primary"
                      }`}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Items grid */}
          <View className="bg-white p-3">
            <Text className="font-montserrat-medium text-brand-primary text-sm mb-3">
              Itens da categoria {selectedCategory}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {currentItems.map((item) => (
                <AppInputBadge
                  key={item}
                  title={item}
                  isSelected={selectedItems.includes(item)}
                  onPress={() => onToggleItem(item)}
                />
              ))}
            </View>
          </View>
        </View>
      )}

      {/* ── Selected chips ── */}
      {selectedItems.length > 0 && (
        <View className="w-full rounded-2xl bg-white border border-border-gray p-3">
          <Text className="font-montserrat-medium text-brand-primary text-sm mb-2">
            Selecionadas
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {selectedItems.map((item) => (
              <AppInputBadge
                key={`selected-${item}`}
                title={item}
                isSelected
                onPress={() => onToggleItem(item)}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
