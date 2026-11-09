import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { AppInputBadge } from "../components/AppInputBadge";
import { ASTHMA, LIVER_DISEASE } from "../data/consultationRules";
import { useHealthProfile } from "../hooks/useHealthProfile";
import { useMedicineSearch } from "../hooks/useMedicineSearch";
import type { HealthProfile } from "../types/consultation";

const pregnancyChoices: { value: HealthProfile["pregnancy"]; label: string }[] = [
  { value: "unknown", label: "Não informada" },
  { value: "yes", label: "Sim" },
  { value: "no", label: "Não" },
];

const supportedConditions = [ASTHMA, LIVER_DISEASE];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, setProfile, isLoading, loadFailed, save, clear } = useHealthProfile();
  const search = useMedicineSearch("medicines");
  const [isSaving, setIsSaving] = useState(false);

  function toggle(field: "conditions" | "allergies", name: string) {
    setProfile((current) => ({
      ...current,
      [field]: current[field].includes(name)
        ? current[field].filter((value) => value !== name)
        : [...current[field], name],
    }));
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      await save(profile);
      Alert.alert("Perfil salvo", "As próximas consultas usarão estes dados.");
    } catch {
      Alert.alert("Perfil de saúde", "Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  }

  function confirmClear() {
    Alert.alert("Limpar perfil", "Apagar os dados do perfil salvos neste aparelho?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: () => {
          setIsSaving(true);
          clear()
            .then(() => search.setQuery(""))
            .catch(() => Alert.alert("Perfil de saúde", "Não foi possível limpar o perfil."))
            .finally(() => setIsSaving(false));
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-bg-light"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#00B4D8", "#2ECC71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 25, paddingTop: 25 + insets.top }}
        className="gap-2"
      >
        <Text className="font-montserrat-bold text-white text-2xl">Seu perfil de saúde</Text>
        <Text className="font-montserrat text-white text-base">
          O perfil é opcional e fica salvo neste aparelho.
        </Text>
      </LinearGradient>

      {isLoading ? (
        <ActivityIndicator className="p-5" color="#006AFF" />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }} keyboardShouldPersistTaps="handled">
          <Text className="font-montserrat text-brand-secondary">
            Os alertas usam as informações salvas e as regras disponíveis. Eles também podem aparecer no histórico local.
          </Text>
          {loadFailed ? (
            <Text accessibilityRole="alert" className="font-montserrat text-red-600">
              O perfil salvo está indisponível. Limpe o perfil para começar de novo.
            </Text>
          ) : (
            <View className="gap-3" pointerEvents={isSaving ? "none" : "auto"}>
              <View className="bg-white rounded-2xl p-4 gap-3">
                <Text className="font-montserrat-bold text-brand-primary">Gravidez</Text>
                <View className="flex-row flex-wrap gap-2">
                  {pregnancyChoices.map(({ label, value }) => (
                    <AppInputBadge
                      key={value}
                      title={label}
                      isSelected={profile.pregnancy === value}
                      onPress={() => setProfile((current) => ({ ...current, pregnancy: value }))}
                    />
                  ))}
                </View>
              </View>
              <View className="bg-white rounded-2xl p-4 gap-3">
                <Text className="font-montserrat-bold text-brand-primary">Condições de saúde</Text>
                <Text className="font-montserrat text-brand-secondary">
                  Selecione entre as condições cobertas pelas regras desta versão.
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {supportedConditions.map((name) => (
                    <AppInputBadge
                      key={name}
                      title={name}
                      isSelected={profile.conditions.includes(name)}
                      onPress={() => toggle("conditions", name)}
                    />
                  ))}
                </View>
              </View>
              <View className="bg-white rounded-2xl p-4 gap-3">
                <Text className="font-montserrat-bold text-brand-primary">Alergias a medicamentos</Text>
                <Text className="font-montserrat text-brand-secondary">
                  Escolha o princípio ativo no catálogo. Toque em um item salvo para removê-lo.
                </Text>
                <AppInput
                  accessibilityLabel="Buscar princípio ativo para alergia"
                  placeholder="Buscar princípio ativo"
                  value={search.query}
                  onChangeText={search.setQuery}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="done"
                  editable={!search.isLoading && !search.error}
                />
                {search.isLoading && <ActivityIndicator color="#006AFF" />}
                {search.error && (
                  <AppButton title="Tentar carregar catálogo novamente" variant="outline" onPress={search.retry} />
                )}
                {search.suggestions.filter(({ name }) => !profile.allergies.includes(name)).map(({ name }) => (
                  <Pressable
                    key={name}
                    accessibilityRole="button"
                    className="rounded-xl bg-bg-light p-3"
                    onPress={() => {
                      toggle("allergies", name);
                      search.setQuery("");
                      Keyboard.dismiss();
                    }}
                  >
                    <Text className="font-montserrat-medium text-brand-primary">{name}</Text>
                  </Pressable>
                ))}
                <View className="flex-row flex-wrap gap-2">
                  {profile.allergies.map((name) => (
                    <AppInputBadge key={name} title={name} isSelected onPress={() => toggle("allergies", name)} />
                  ))}
                </View>
              </View>
            </View>
          )}
          {!loadFailed && (
            <AppButton title="Salvar perfil" onPress={handleSave} disabled={isSaving} isLoading={isSaving} />
          )}
          <AppButton title="Limpar perfil" variant="outline" onPress={confirmClear} disabled={isSaving} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
