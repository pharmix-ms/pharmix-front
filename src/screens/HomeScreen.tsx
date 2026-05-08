import { View, Text, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, TriangleAlert } from "lucide-react-native";
import { AppButton } from "../components/AppButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={["#00B4D8", "#2ECC71"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{}}
      className="flex-1 items-center justify-center p-5 gap-20"
    >
      <View className="items-center gap-6">
        <Image
          source={require("../../assets/logo/logo-pharmix-branca.png")}
          style={{ width: 200, height: 200 }}
        />
        <View className="flex-row">
          <Text className="font-montserrat-bold text-white text-5xl">PHAR</Text>
          <Text className="font-montserrat-bold text-[#35FFA1] text-5xl">
            MIX
          </Text>
        </View>
      </View>
      <View className="gap-9">
        <View className="px-5 py-6 gap-3 bg-light/20 border border-light rounded-2xl">
          <View className="flex-row items-center gap-3">
            <TriangleAlert size={30} color={"#FFFFFF"} />
            <Text className="font-montserrat-bold text-white text-lg">
              Aviso Importante
            </Text>
          </View>
          <Text className="font-montserrat-medium text-white">
            Este aplicativo não substitui um médico ou farmacêutico. Serve
            apenas como orientação educativa. Em caso de dúvida, sempre consulte
            um profissional de saúde.
          </Text>
        </View>
        <View className="items-center flex-col">
          <AppButton
            variant="ghost"
            title="Entendi, vamos começar"
            icon={ChevronRight}
            onPress={() => navigation.navigate("MainTabs")}
            className="w-full"
          />
          <Pressable
            onPress={() =>
              navigation.navigate("MainTabs", { screen: "MedicineStack" })
            }
          >
            <Text className="underline font-montserrat text-white text-lg p-3">
              Pular e usar sem perfil
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
