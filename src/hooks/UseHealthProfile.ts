import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
export interface HealthProfile {
  age: string;
  weight: string;
  gender: string;
  isPregnant: boolean;
  conditions: string[];
  allergies: string[];
}

const PROFILE_KEY = "health_profile";

const DEFAULT_PROFILE: HealthProfile = {
  age: "",
  weight: "",
  gender: "",
  isPregnant: false,
  conditions: [],
  allergies: [],
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useHealthProfile() {
  const [profile, setProfile] = useState<HealthProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const savedProfile = useRef<HealthProfile>(DEFAULT_PROFILE);

  // Carrega o perfil salvo ao montar
  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as HealthProfile;
          setProfile(parsed);
          savedProfile.current = parsed;
        }
        // console.log("health_profile:", raw);
      } catch {
        // sem perfil salvo, usa o padrão
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Salva qualquer alteração no perfil
  const saveProfile = useCallback(async (updated: HealthProfile) => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      setProfile(updated);
    } catch {
      // falha silenciosa
    }
  }, []);

  // Helpers para atualizar campos individuais
  const updateField = useCallback(
    <K extends keyof HealthProfile>(key: K, value: HealthProfile[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetProfile = useCallback(() => {
    setProfile(savedProfile.current);
  }, []);

  return {
    profile,
    isLoading,
    saveProfile,
    updateField,
    resetProfile,
  };
}
