import { View, Text } from "react-native";
import { AppSelect } from "../components/AppSelect";
import { AppInput } from "../components/AppInput";
import { AppSwitch } from "../components/AppSwitch";
import { AppButton } from "../components/AppButton";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { AppBadge } from "../components/AppBadge";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type Props = BottomTabScreenProps<BottomTabParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState("");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

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
      <View className="flex-1 p-5 bg-bg-light gap-3">
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
        <View className="w-full gap-1 mb-2">
          <Text className="font-montserrat-medium text-brand-primary text-base">
            Condições de saúde
          </Text>
          <View className="w-full flex-row flex-wrap gap-2 p-2 bg-white border border-border-gray rounded-2xl">
            <AppBadge
              title="Diabetes"
              isSelected={selectedConditions.includes("Diabetes")}
              onPress={() =>
                toggleSelection(
                  "Diabetes",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Hipertensão"
              isSelected={selectedConditions.includes("Hipertensao")}
              onPress={() =>
                toggleSelection(
                  "Hipertensao",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Asma"
              isSelected={selectedConditions.includes("Asma")}
              onPress={() =>
                toggleSelection(
                  "Asma",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Gastrite"
              isSelected={selectedConditions.includes("Gastrite")}
              onPress={() =>
                toggleSelection(
                  "Gastrite",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Depressão"
              isSelected={selectedConditions.includes("Depressao")}
              onPress={() =>
                toggleSelection(
                  "Depressao",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Ansiedade"
              isSelected={selectedConditions.includes("Ansiedade")}
              onPress={() =>
                toggleSelection(
                  "Ansiedade",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Tireoide"
              isSelected={selectedConditions.includes("Tireoide")}
              onPress={() =>
                toggleSelection(
                  "Tireoide",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
            <AppBadge
              title="Colesterol alto"
              isSelected={selectedConditions.includes("ColesterolAlto")}
              onPress={() =>
                toggleSelection(
                  "ColesterolAlto",
                  selectedConditions,
                  setSelectedConditions,
                )
              }
            />
          </View>
        </View>
        <View className="w-full gap-1 mb-2">
          <Text className="font-montserrat-medium text-brand-primary text-base">
            Alergias a medicamentos
          </Text>
          <View className="w-full flex-row flex-wrap gap-2 p-2 bg-white border border-border-gray rounded-2xl">
            <AppBadge
              title="Dipirona"
              isSelected={selectedAllergies.includes("Dipirona")}
              onPress={() =>
                toggleSelection(
                  "Dipirona",
                  selectedAllergies,
                  setSelectedAllergies,
                )
              }
            />
            <AppBadge
              title="Penicilina"
              isSelected={selectedAllergies.includes("Penicilina")}
              onPress={() =>
                toggleSelection(
                  "Penicilina",
                  selectedAllergies,
                  setSelectedAllergies,
                )
              }
            />
            <AppBadge
              title="AAS"
              isSelected={selectedAllergies.includes("AAS")}
              onPress={() =>
                toggleSelection("AAS", selectedAllergies, setSelectedAllergies)
              }
            />
            <AppBadge
              title="Sulfa"
              isSelected={selectedAllergies.includes("Sulfa")}
              onPress={() =>
                toggleSelection(
                  "Sulfa",
                  selectedAllergies,
                  setSelectedAllergies,
                )
              }
            />
            <AppBadge
              title="Ibuprofeno"
              isSelected={selectedAllergies.includes("Ibuprofeno")}
              onPress={() =>
                toggleSelection(
                  "Ibuprofeno",
                  selectedAllergies,
                  setSelectedAllergies,
                )
              }
            />
          </View>
        </View>
        <View className="flex flex-row w-full gap-4">
          <AppButton
            title="Pular"
            variant="outline"
            className="flex-1"
            onPress={() => navigation.navigate("Medicine")}
          />

          <AppButton
            title="Continuar"
            onPress={() => navigation.navigate("Medicine")}
            icon={ChevronRight}
            className="flex-1"
          />
        </View>
        {/* <AppButton
        variant="ghost"
        title="Continuar"
        onPress={() => console.log("Avançar")}
        icon={Scan}
      /> */}
      </View>
    </View>
  );
}
