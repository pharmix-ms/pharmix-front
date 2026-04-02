import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStack";
import { AppSelect } from "../components/AppSelect";
import { AppInput } from "../components/AppInput";
import { AppSwitch } from "../components/AppSwitch";
import { AppButton } from "../components/AppButton";
import { Scan } from "lucide-react-native";
import { useState } from "react";
import { AppBadge } from "../components/AppBadge";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const [gender, setGender] = useState("");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [selected, setSelected] = useState(false);

  const genderOptions = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" },
  ];

  return (
    <View className="flex-1 p-4 items-center justify-center bg-bg-light">
      <Text className="text-xl text-blue-500 font-montserrat">Home Screen</Text>

      <AppInput label="Idade" placeholder="Ex.: 42" keyboardType="numeric" />
      <AppSelect
        label="Gênero"
        placeholder="Como você se identifica?"
        options={genderOptions}
        selectedValue={gender}
        onValueChange={(val) => setGender(val as string)}
      />
      <AppSwitch
        label="Modo Dark"
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
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Diabetes"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Diabetes"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
        </View>
      </View>
      <View className="w-full gap-1 mb-2">
        <Text className="font-montserrat-medium text-brand-primary text-base">
          Alergias a medicamentos
        </Text>
        <View className="w-full flex-row flex-wrap gap-2 p-2 bg-white border border-border-gray rounded-2xl">
          <AppBadge
            title="Diabetes"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Diabetes"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Diabetes"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
          <AppBadge
            title="Hipertensão"
            isSelected={selected}
            onPress={() => setSelected(!selected)}
          />
        </View>
      </View>
      <AppButton title="Pular" variant="outline" icon={Scan} />

      <AppButton
        title="Continuar"
        onPress={() => console.log("Avançar")}
        icon={Scan}
      />
      <AppButton
        variant="ghost"
        title="Continuar"
        onPress={() => console.log("Avançar")}
        icon={Scan}
      />
    </View>
  );
}
