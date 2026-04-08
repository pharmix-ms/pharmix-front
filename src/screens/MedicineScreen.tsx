import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { MedicineStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppInput } from "../components/AppInput";
import { Lightbulb, Pill, Scan, Search } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppMedicineItem } from "../components/AppMedicineItem";
import { useMedicineSearch } from "../hooks/UseMedicineSearch";
import { useRef, useState } from "react";
import { View as RNView } from "react-native";

type Props = NativeStackScreenProps<MedicineStackParamList, "Medicine">;

export function MedicineScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<RNView>(null);
  const [inputBottom, setInputBottom] = useState(0);

  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    selectedMedicines,
    addMedicine,
    removeMedicine,
    canAnalyze,
  } = useMedicineSearch();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#00B4D8", "#2ECC71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <Text className="font-montserrat-bold text-white text-2xl">
          Meus Medicamentos
        </Text>
        <Text className="font-montserrat text-white text-base">
          Adicione os medicamentos e analise suas interações.
        </Text>
      </LinearGradient>

      <View className="flex-1 p-5 bg-bg-light gap-3">
        <View
          ref={inputRef}
          className="z-10"
          onLayout={() => {
            inputRef.current?.measureInWindow((x, y, width, height) => {
              setInputBottom(y + height + 4); // y já é absoluto da tela
            });
          }}
        >
          <AppInput
            placeholder="Buscar medicamento"
            icon={Search}
            value={query}
            onChangeText={setQuery}
          />

          {/* Dropdown de sugestões */}
          {(suggestions.length > 0 || isLoading) && (
            <Modal
              visible={suggestions.length > 0 || isLoading}
              transparent
              animationType="none"
              onRequestClose={() => setQuery("")}
            >
              {/* Overlay transparente para fechar ao clicar fora */}
              <Pressable style={{ flex: 1 }} onPress={() => setQuery("")}>
                <View
                  style={{
                    position: "absolute",
                    top: inputBottom,
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
                    zIndex: 999,
                  }}
                >
                  {isLoading ? (
                    <View className="py-4 items-center">
                      <ActivityIndicator color="#00B4D8" />
                    </View>
                  ) : (
                    <FlatList
                      data={suggestions}
                      keyExtractor={(item) => `${item.name}-${item.type}`}
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <Pressable
                          onPress={() => addMedicine(item)}
                          className="flex-row items-center gap-3 px-4 py-3 border-b border-border-gray active:bg-bg-info"
                        >
                          <Pill size={18} color="#00B4D8" />
                          <View>
                            <Text className="font-montserrat-medium text-brand-primary">
                              {item.name}
                            </Text>
                            <Text className="font-montserrat text-brand-secondary text-xs">
                              {item.type}
                            </Text>
                          </View>
                        </Pressable>
                      )}
                    />
                  )}
                </View>
              </Pressable>
            </Modal>
          )}
        </View>
        <Text className="font-montserrat-bold text-brand-primary text-lg">
          Medicamentos Adicionados
        </Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-3">
            {selectedMedicines.length === 0 ? (
              <View className="justify-center items-center bg-bg-info rounded-2xl border-2 border-primary border-dashed py-9 gap-2">
                <Pill size={42} color={"#344051"} />
                <View className="items-center">
                  <Text className="font-montserrat-bold text-brand-primary text-lg">
                    Nenhum medicamento adicionado
                  </Text>
                  <Text className="font-montserrat-bold text-brand-secondary">
                    Utilize a busca para adicionar medicamentos
                  </Text>
                </View>
              </View>
            ) : (
              /* Lista de medicamentos adicionados */
              selectedMedicines.map((medicine) => (
                <AppMedicineItem
                  key={`${medicine.name}-${medicine.type}`}
                  name={medicine.name}
                  type={medicine.type}
                  onRemove={() => removeMedicine(medicine)}
                />
              ))
            )}
            <View className="flex-1 flex-row items-center px-4 py-3 gap-4">
              <Lightbulb size={24} color={"#457B9D"} />
              <Text className="font-montserrat-medium text-brand-info">
                Adicione pelo menos 2 medicamentos para verificar possíveis
                interações.
              </Text>
            </View>
            <AppButton
              title="Analisar Combinação"
              onPress={() => navigation.navigate("Confirm")}
              icon={Scan}
              className="flex-1"
              disabled={!canAnalyze}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
