import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
  ActivityIndicator,
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

type Props = NativeStackScreenProps<MedicineStackParamList, "Medicine">;

export function MedicineScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

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
        <View className="z-10">
          <AppInput
            placeholder="Buscar medicamento"
            icon={Search}
            value={query}
            onChangeText={setQuery}
          />

          {/* Dropdown de sugestões */}
          {(suggestions.length > 0 || isLoading) && (
            <View className="absolute top-full left-0 right-0 bg-white rounded-2xl border border-border-gray shadow-md overflow-hidden mt-1">
              {isLoading ? (
                <View className="py-4 items-center">
                  <ActivityIndicator color="#00B4D8" />
                </View>
              ) : (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={suggestions.length > 4}
                  style={{ maxHeight: 220 }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => addMedicine(item)}
                      className="flex-row items-center gap-3 px-4 py-3 border-b border-border-gray active:bg-bg-info"
                    >
                      <Pill size={18} color={"#00B4D8"} />
                      <View>
                        <Text className="font-montserrat-medium text-brand-primary">
                          {item.name}
                        </Text>
                        <Text className="font-montserrat text-brand-secondary text-xs">
                          {item.type} — {item.quantity}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />
              )}
            </View>
          )}
        </View>
        <Text className="font-montserrat-bold text-brand-primary text-lg">
          Medicamentos Adicionados
        </Text>
        <ScrollView>
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
                  key={medicine.id}
                  name={medicine.name}
                  type={medicine.type}
                  quantity={medicine.quantity}
                  onRemove={() => removeMedicine(medicine.id)}
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
              onPress={() =>
                navigation.navigate("Confirm", { medicines: selectedMedicines })
              }
              icon={Scan}
              className="flex-1"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
