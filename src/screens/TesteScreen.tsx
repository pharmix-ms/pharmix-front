import { View, Text, Pressable, Switch } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStack";
import { AppInput } from "../components/AppInput";
import { AppSelect } from "../components/AppSelect";
import { useState } from "react";
import { AppSwitch } from "../components/AppSwitch";
import { AppButton } from "../components/AppButton";
import { Scan } from "lucide-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Teste">;

export function TesteScreen({ navigation }: Props) {
  const [gender, setGender] = useState("");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const genderOptions = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" },
  ];

  return (
    <View className="flex-1 p-4 items-center justify-center bg-bg-light">
      <Text className="text-xl text-blue-500 font-montserrat">Home Screen</Text>

      <AppInput label="Idade" placeholder="Ex.: 42" />
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
