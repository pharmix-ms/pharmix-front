import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import type { HealthProfile } from "../types/consultation";

const PROFILE_KEY = "health_profile";

const EMPTY_PROFILE: HealthProfile = {
  pregnancy: "unknown",
  conditions: [],
  allergies: [],
};

function readNames(value: unknown): string[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((item): item is string => typeof item === "string"))]
    : [];
}

export async function loadHealthProfile(): Promise<HealthProfile> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return EMPTY_PROFILE;

  const stored = JSON.parse(raw);
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
    throw new Error("Perfil inválido.");
  }

  return {
    pregnancy: stored.pregnancy === "yes" || stored.pregnancy === "no"
      ? stored.pregnancy
      : stored.isPregnant === true ? "yes" : "unknown",
    conditions: readNames(stored.conditions),
    allergies: readNames(stored.allergies),
  };
}

export function useHealthProfile() {
  const [profile, setProfile] = useState<HealthProfile>(EMPTY_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    loadHealthProfile()
      .then(setProfile)
      .catch(() => setLoadFailed(true))
      .finally(() => setIsLoading(false));
  }, []);

  const save = useCallback(async (updated: HealthProfile) => {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  }, []);

  const clear = useCallback(async () => {
    await AsyncStorage.removeItem(PROFILE_KEY);
    setProfile(EMPTY_PROFILE);
    setLoadFailed(false);
  }, []);

  return { profile, setProfile, isLoading, loadFailed, save, clear };
}
