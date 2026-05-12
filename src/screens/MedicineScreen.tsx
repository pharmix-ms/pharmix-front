import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MedicineStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CircleX, Lightbulb, Pill, Scan, Search } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppMedicineItem } from "../components/AppMedicineItem";
import { useMedicineSearch } from "../hooks/useMedicineSearch";
import { useCallback, useRef } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

type Props = NativeStackScreenProps<MedicineStackParamList, "Medicine">;

export function MedicineScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdownRef = useRef<any>(null);

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

  const dataSet = suggestions.map((medicine) => ({
    id: `${medicine.name}|||${medicine.type}`,
    title: medicine.name,
  }));

  const handleSelectItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => {
      if (!item?.id) return;

      const [name, type] = (item.id as string).split("|||");
      const medicine = suggestions.find(
        (m) => m.name === name && m.type === type,
      );
      if (medicine) {
        addMedicine(medicine);
        dropdownRef.current?.clear();
        setQuery("");
      }
    },
    [suggestions, addMedicine, setQuery],
  );

  function handleConfirm() {
    navigation.navigate("Confirm", { medicines: selectedMedicines });
  }

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
        <AutocompleteDropdown
          ref={dropdownRef}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={true}
          onSelectItem={handleSelectItem}
          onChangeText={setQuery}
          dataSet={dataSet}
          loading={isLoading}
          debounce={300}
          containerStyle={{ zIndex: 10 }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#CED2DA",
            borderRadius: 16,
            paddingHorizontal: 2,
            height: 48,
          }}
          textInputProps={{
            placeholder: "Buscar medicamento",
            placeholderTextColor: "#637083",
            style: {
              fontFamily: "Montserrat-Regular",
              fontSize: 16,
              color: "#1a2332",
              flex: 1,
            },
          }}
          rightButtonsContainerStyle={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          RightIconComponent={<Search size={24} color="#637083" />}
          showChevron={false}
          showClear={query.length > 0}
          emptyResultText="Não encontrado"
          ClearIconComponent={<CircleX size={24} color="#E63946" />}
          suggestionsListContainerStyle={{
            backgroundColor: "white",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#CED2DA",
            marginTop: 4,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
          }}
          renderItem={(item) => {
            const type = item.id?.split("|||")[1];
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f3f4f6",
                }}
              >
                <Pill size={18} color="#00B4D8" />
                <View>
                  <Text
                    style={{
                      fontFamily: "Montserrat-Medium",
                      color: "#1a2332",
                      fontSize: 14,
                    }}
                  >
                    {item.title ?? ""}
                  </Text>
                  {type ? (
                    <Text
                      style={{
                        fontFamily: "Montserrat-Regular",
                        color: "#637083",
                        fontSize: 12,
                      }}
                    >
                      {type}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          }}
        />

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
              onPress={handleConfirm}
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
