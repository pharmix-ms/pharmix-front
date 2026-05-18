import { View, Text } from "react-native";
// import { AppSelect } from "../components/AppSelect";
// import { AppInput } from "../components/AppInput";
// import { AppSwitch } from "../components/AppSwitch";
// import { AppButton } from "../components/AppButton";
// import { AppHealthAccordion } from "../components/AppHealthAccordion";
// import { ChevronRight } from "lucide-react-native";
// import { useCallback, useState } from "react";
// import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import { BottomTabParamList } from "../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RouteOff } from "lucide-react-native";
// import { useHealthProfile } from "../hooks/useHealthProfile";
// import {
//   healthConditionCategories,
//   drugAllergyCategories,
// } from "../data/healthData";
// import { useFocusEffect } from "@react-navigation/native";

// type Props = BottomTabScreenProps<BottomTabParamList, "Profile">;

// const genderOptions = [
//   { label: "Masculino", value: "M" },
//   { label: "Feminino", value: "F" },
// ];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  // const { profile, saveProfile, updateField, isLoading, resetProfile } =
  //   useHealthProfile();

  // const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  // const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (!isLoading) {
  //       setSelectedConditions(profile.conditions);
  //       setSelectedAllergies(profile.allergies);
  //     }
  //   }, [isLoading, profile.conditions, profile.allergies]),
  // );

  // const toggleItem = (
  //   item: string,
  //   state: string[],
  //   setState: React.Dispatch<React.SetStateAction<string[]>>,
  // ) => {
  //   setState(
  //     state.includes(item) ? state.filter((i) => i !== item) : [...state, item],
  //   );
  // };

  // const handleContinue = async () => {
  //   await saveProfile({
  //     ...profile,
  //     conditions: selectedConditions,
  //     allergies: selectedAllergies,
  //   });
  //   navigation.navigate("MedicineStack");
  // };

  // const handleSkip = () => {
  //   resetProfile();
  //   navigation.navigate("MedicineStack");
  // };

  // if (isLoading) {
  //   return (
  //     <View className="flex-1">
  //       <LinearGradient
  //         colors={["#00B4D8", "#2ECC71"]}
  //         start={{ x: 0, y: 0 }}
  //         end={{ x: 1, y: 0 }}
  //         style={{ padding: 25, paddingTop: 25 + insets.top }}
  //         className="gap-2"
  //       >
  //         <Text className="font-montserrat-bold text-white text-2xl">
  //           Seu perfil de saúde
  //         </Text>
  //         <Text className="font-montserrat text-white text-base">
  //           Essas informações nos ajudam a tornar a análise mais precisa para
  //           você.
  //         </Text>
  //       </LinearGradient>

  //       <View className="flex-1 bg-bg-light justify-center items-center">
  //         <ActivityIndicator size={"large"} color="#00B4D8" />
  //       </View>
  //     </View>
  //   );
  // }

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
        <View className="flex-1 justify-center items-center gap-4">
          <RouteOff size={48} color={"#344051"} />
          <View>
            <Text className="font-montserrat-bold text-brand-primary text-lg text-center">
              Fora do Escopo
            </Text>
            <Text className="font-montserrat-medium text-center px-16">
              Desenvolvimento planejado para futuras atualizações
            </Text>
          </View>
        </View>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3 flex-1">
            <View className="flex flex-row gap-6">
              <AppInput
                label="Idade"
                placeholder="Ex.: 42"
                keyboardType="numeric"
                containerClassName="flex-1"
                value={profile.age}
                onChangeText={(v) => updateField("age", v)}
              />
              <AppInput
                label="Peso"
                placeholder="Ex.: 62"
                keyboardType="numeric"
                containerClassName="flex-1"
                value={profile.weight}
                onChangeText={(v) => updateField("weight", v)}
              />
            </View>

            <AppSelect
              label="Gênero"
              placeholder="Selecionar"
              options={genderOptions}
              selectedValue={profile.gender}
              onValueChange={(val) => updateField("gender", val as string)}
            />

            <AppSwitch
              label="Gestante?"
              value={profile.isPregnant}
              onValueChange={(v) => updateField("isPregnant", v)}
            />

            <AppHealthAccordion
              title="Condições de saúde"
              categories={healthConditionCategories}
              selectedItems={selectedConditions}
              onToggleItem={(item) =>
                toggleItem(item, selectedConditions, setSelectedConditions)
              }
            />

            <AppHealthAccordion
              title="Alergias a medicamentos"
              categories={drugAllergyCategories}
              selectedItems={selectedAllergies}
              onToggleItem={(item) =>
                toggleItem(item, selectedAllergies, setSelectedAllergies)
              }
            />
          </View>
        </ScrollView>

        <View className="flex flex-row w-full gap-4 pt-5">
          <AppButton
            title="Pular"
            variant="outline"
            className="flex-1"
            onPress={handleSkip}
          />
          <AppButton
            title="Continuar"
            onPress={handleContinue}
            icon={ChevronRight}
            className="flex-1"
          />
        </View> */}
      </View>
    </View>
  );
}
