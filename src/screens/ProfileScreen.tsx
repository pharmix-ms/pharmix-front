import { View, Text, ScrollView, Pressable, Animated, ActivityIndicator } from "react-native";
import { AppSelect } from "../components/AppSelect";
import { AppInput } from "../components/AppInput";
import { AppSwitch } from "../components/AppSwitch";
import { AppButton } from "../components/AppButton";
import { ChevronRight } from "lucide-react-native";
import { useState, useRef } from "react";
import { AppInputBadge } from "../components/AppInputBadge";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { healthConditionCategories } from "../data/healthData";
import { useAllergyMedicines } from "../hooks/useAllergyMedicines";

type Props = BottomTabScreenProps<BottomTabParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState("");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const [expandedConditions, setExpandedConditions] = useState(false);
  const [expandedAllergies, setExpandedAllergies] = useState(false);

  const { categories: allergyCategories, isLoading: isLoadingMedicines } =
    useAllergyMedicines();

  const [selectedConditionCategory, setSelectedConditionCategory] = useState(
    healthConditionCategories[0].label,
  );
  const [selectedAllergyCategory, setSelectedAllergyCategory] = useState(
    allergyCategories[0]?.label || "Analgesia",
  );

  const conditionsRotation = useRef(new Animated.Value(0)).current;
  const allergiesRotation = useRef(new Animated.Value(0)).current;

  const currentConditionItems =
    healthConditionCategories.find(
      (category) => category.label === selectedConditionCategory,
    )?.items ?? [];

  const currentAllergyItems =
    allergyCategories.find(
      (category) => category.label === selectedAllergyCategory,
    )?.items ?? [];

  const toggleAccordion = (
    expanded: boolean,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    animatedValue: Animated.Value,
  ) => {
    const nextValue = !expanded;
    setExpanded(nextValue);
    Animated.timing(animatedValue, {
      toValue: nextValue ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const toggleSelection = (
    name: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (state.includes(name)) {
      setState(state.filter((item) => item !== name));
    } else {
      setState([...state, name]);
    }
  };

  const genderOptions = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" },
  ];

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#00B4D8", "#2ECC71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <Text className="font-montserrat-bold text-white text-2xl">
          Seu perfil de saúde
        </Text>
        <Text className="font-montserrat text-white text-base">
          Essas informações nos ajudam a tornar a análise mais precisa para
          você.
        </Text>
      </LinearGradient>
      <View className="flex-1 p-5 bg-bg-light justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3 flex-1">
            <View className="flex flex-row gap-6">
              <AppInput
                label="Idade"
                placeholder="Ex.: 42"
                keyboardType="numeric"
                containerClassName="flex-1"
              />
              <AppInput
                label="Peso"
                placeholder="Ex.: 62"
                keyboardType="numeric"
                containerClassName="flex-1"
              />
            </View>
            <AppSelect
              label="Gênero"
              placeholder="Selecionar"
              options={genderOptions}
              selectedValue={gender}
              onValueChange={(val) => setGender(val as string)}
            />
            <AppSwitch
              label="Gestante?"
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
            />
            <View className="w-full gap-3 mb-2">
              <Pressable
                onPress={() =>
                  toggleAccordion(
                    expandedConditions,
                    setExpandedConditions,
                    conditionsRotation,
                  )
                }
                className="w-full flex-row items-center justify-between rounded-2xl bg-white border border-border-gray px-4 py-4"
              >
                <View>
                  <Text className="font-montserrat-medium text-brand-primary text-base">
                    Condições de saúde
                  </Text>
                  <Text className="font-montserrat text-gray-500 text-xs mt-1">
                    {selectedConditions.length} selecionada{selectedConditions.length !== 1 ? "s" : ""}
                  </Text>
                </View>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: conditionsRotation.interpolate({
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

              {expandedConditions && (
                <View className="w-full rounded-3xl bg-white border border-border-gray p-3 shadow-sm">
                  <View className="rounded-2xl bg-bg-light p-3 mb-3">
                    <Text className="font-montserrat-medium text-brand-primary text-sm mb-2">
                      Categorias
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View className="flex-row gap-2">
                        {healthConditionCategories.map((category) => (
                          <Pressable
                            key={category.label}
                            onPress={() => setSelectedConditionCategory(category.label)}
                            className={`rounded-full px-4 py-2 min-w-[120px] items-center justify-center ${
                              selectedConditionCategory === category.label
                                ? "bg-brand-primary"
                                : "bg-white border border-border-gray"
                            }`}
                          >
                            <Text
                              className={`font-montserrat-medium text-sm text-center ${
                                selectedConditionCategory === category.label
                                  ? "text-white"
                                  : "text-brand-primary"
                              }`}
                            >
                              {category.label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  <View className="rounded-2xl bg-white p-3">
                    <Text className="font-montserrat-medium text-brand-primary text-sm mb-3">
                      Itens da categoria {selectedConditionCategory}
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {currentConditionItems.map((condition) => (
                        <View key={condition} className="min-w-[110px]">
                          <AppInputBadge
                            title={condition}
                            isSelected={selectedConditions.includes(condition)}
                            onPress={() =>
                              toggleSelection(
                                condition,
                                selectedConditions,
                                setSelectedConditions,
                              )
                            }
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {selectedConditions.length > 0 && (
                <View className="w-full rounded-2xl bg-white border border-border-gray p-3">
                  <Text className="font-montserrat-medium text-brand-primary text-xs mb-2">
                    Selecionadas
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {selectedConditions.map((condition) => (
                      <AppInputBadge
                        key={`selected-${condition}`}
                        title={condition}
                        isSelected={true}
                        onPress={() =>
                          toggleSelection(
                            condition,
                            selectedConditions,
                            setSelectedConditions,
                          )
                        }
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
            <View className="w-full gap-3 mb-2">
              <Pressable
                onPress={() =>
                  toggleAccordion(
                    expandedAllergies,
                    setExpandedAllergies,
                    allergiesRotation,
                  )
                }
                className="w-full flex-row items-center justify-between rounded-2xl bg-white border border-border-gray px-4 py-4"
              >
                <View>
                  <Text className="font-montserrat-medium text-brand-primary text-base">
                    Alergias a medicamentos
                  </Text>
                  <Text className="font-montserrat text-gray-500 text-xs mt-1">
                    {selectedAllergies.length} selecionada{selectedAllergies.length !== 1 ? "s" : ""}
                  </Text>
                </View>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: allergiesRotation.interpolate({
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

              {expandedAllergies && (
                <View className="w-full rounded-3xl bg-white border border-border-gray p-3 shadow-sm">
                  <View className="rounded-2xl bg-bg-light p-3 mb-3">
                    <Text className="font-montserrat-medium text-brand-primary text-sm mb-2">
                      Categorias
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View className="flex-row gap-2">
                        {allergyCategories.map((category) => (
                          <Pressable
                            key={category.label}
                            onPress={() => setSelectedAllergyCategory(category.label)}
                            className={`rounded-full px-4 py-2 min-w-[120px] items-center justify-center ${
                              selectedAllergyCategory === category.label
                                ? "bg-brand-primary"
                                : "bg-white border border-border-gray"
                            }`}
                          >
                            <Text
                              className={`font-montserrat-medium text-sm text-center ${
                                selectedAllergyCategory === category.label
                                  ? "text-white"
                                  : "text-brand-primary"
                              }`}
                            >
                              {category.label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  <View className="rounded-2xl bg-white p-3">
                    <Text className="font-montserrat-medium text-brand-primary text-sm mb-3">
                      Itens da categoria {selectedAllergyCategory}
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {currentAllergyItems.map((allergy) => (
                        <View key={allergy} className="min-w-[110px]">
                          <AppInputBadge
                            title={allergy}
                            isSelected={selectedAllergies.includes(allergy)}
                            onPress={() =>
                              toggleSelection(
                                allergy,
                                selectedAllergies,
                                setSelectedAllergies,
                              )
                            }
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {selectedAllergies.length > 0 && (
                <View className="w-full rounded-2xl bg-white border border-border-gray p-3">
                  <Text className="font-montserrat-medium text-brand-primary text-xs mb-2">
                    Selecionadas
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {selectedAllergies.map((allergy) => (
                      <AppInputBadge
                        key={`selected-${allergy}`}
                        title={allergy}
                        isSelected={true}
                        onPress={() =>
                          toggleSelection(
                            allergy,
                            selectedAllergies,
                            setSelectedAllergies,
                          )
                        }
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-row w-full gap-4 pt-5">
          <AppButton
            title="Pular"
            variant="outline"
            className="flex-1"
            onPress={() => navigation.navigate("MedicineStack")}
          />

          <AppButton
            title="Continuar"
            onPress={() => navigation.navigate("MedicineStack")}
            className="flex-1"
          />
        </View>
      </View>
    </View>
  );
}
