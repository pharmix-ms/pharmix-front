import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera, ChevronLeft } from "lucide-react-native";
import { useRef } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { MedicineStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<MedicineStackParamList, "Camera">;

export function CameraScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const tirarFoto = async () => {
    if (!cameraRef.current) return;
    try {
      const foto = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.75,
      });
      if (!foto) return;
      // TODO: enviar foto.base64 para sua API de IA
      // navigation.navigate("...") para a próxima tela com o resultado
    } catch {
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  };

  // Sem permissão
  if (!permission) return <View className="flex-1 bg-black" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-bg-light items-center justify-center px-6 gap-5">
        <View className="bg-bg-info rounded-3xl p-6 items-center gap-4 w-full border border-border-gray">
          <Camera size={52} color="#00B4D8" />
          <View className="items-center gap-1">
            <Text className="font-montserrat-bold text-brand-primary text-lg text-center">
              Acesso à câmera necessário
            </Text>
            <Text className="font-montserrat text-brand-secondary text-sm text-center leading-5">
              Precisamos da câmera para escanear e identificar a embalagem do
              medicamento.
            </Text>
          </View>
        </View>
        <AppButton
          title="Permitir acesso à câmera"
          onPress={requestPermission}
          icon={Camera}
        />
      </View>
    );
  }

  // Câmera
  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      <View className="absolute inset-0">
        {/* Header */}
        <View
          style={{ paddingTop: insets.top + 12 }}
          className="flex-row items-center justify-between px-5 pb-3"
        >
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="font-montserrat-bold text-white text-base">
            Escanear medicamento
          </Text>
          <View className="w-10" />
        </View>

        {/* Mira */}
        <View className="flex-1 items-center justify-center">
          <View
            className="border-2 border-white/40 rounded-2xl relative"
            style={{ width: width * 0.78, height: width * 0.78 }}
          >
            <View className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-[#00B4D8] rounded-tl-2xl" />
            <View className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-[#00B4D8] rounded-tr-2xl" />
            <View className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-[#00B4D8] rounded-bl-2xl" />
            <View className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-[#00B4D8] rounded-br-2xl" />
          </View>
          <Text className="font-montserrat text-white/70 text-sm mt-4">
            Posicione a embalagem dentro da área
          </Text>
        </View>

        {/* Botão de tirar foto */}
        <View className="items-center p-12">
          <Pressable
            className="w-20 h-20 rounded-full bg-white/20 items-center justify-center active:opacity-70"
            onPress={tirarFoto}
          >
            <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
              <Camera size={28} color="#00B4D8" />
            </View>
          </Pressable>
          <Text className="font-montserrat text-white/60 mt-3">
            Toque para fotografar
          </Text>
        </View>
      </View>
    </View>
  );
}
