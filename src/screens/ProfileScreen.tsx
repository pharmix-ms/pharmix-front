import { View, Text, ScrollView } from "react-native";
import { AppSelect } from "../components/AppSelect";
import { AppInput } from "../components/AppInput";
import { AppSwitch } from "../components/AppSwitch";
import { AppButton } from "../components/AppButton";
import { ChevronRight } from "lucide-react-native";
import { AppInputBadge } from "../components/AppInputBadge";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useHealthProfile } from "../hooks/UseHealthProfile";

type Props = BottomTabScreenProps<BottomTabParamList, "Profile">;

const genderOptions = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
  { label: "Outro", value: "O" },
];

const CONDITIONS = [
  "Diabetes",
  "Hipertensão",
  "Asma",
  "Gastrite",
  "Depressão",
  "Ansiedade",
  "Tireoide",
  "Colesterol alto",
];

const ALLERGIES = ["Dipirona", "Penicilina", "AAS", "Sulfa", "Ibuprofeno"];

export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { profile, saveProfile, updateField, toggleListItem } =
    useHealthProfile();

  const handleContinue = async () => {
    await saveProfile(profile);
    navigation.navigate("MedicineStack");
  };

  const handleSkip = () => {
    navigation.navigate("MedicineStack");
  };

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
            <View className="w-full gap-1 mb-2">
              <Text className="font-montserrat-medium text-brand-primary text-base">
                Condições de saúde
              </Text>
              <View className="w-full flex-row flex-wrap gap-2 p-2 bg-white border border-border-gray rounded-2xl">
                {CONDITIONS.map((condition) => (
                  <AppInputBadge
                    key={condition}
                    title={condition}
                    isSelected={profile.conditions.includes(condition)}
                    onPress={() => toggleListItem("conditions", condition)}
                  />
                ))}
              </View>
            </View>
            <View className="w-full gap-1 mb-2">
              <Text className="font-montserrat-medium text-brand-primary text-base">
                Alergias a medicamentos
              </Text>
              <View className="w-full flex-row flex-wrap gap-2 p-2 bg-white border border-border-gray rounded-2xl">
                {ALLERGIES.map((allergy) => (
                  <AppInputBadge
                    key={allergy}
                    title={allergy}
                    isSelected={profile.allergies.includes(allergy)}
                    onPress={() => toggleListItem("allergies", allergy)}
                  />
                ))}
              </View>
            </View>
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
        </View>
      </View>
    </View>
  );
}
