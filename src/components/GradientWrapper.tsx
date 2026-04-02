import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

const GRADIENT_COLORS = ["#2ECC71", "#00B4D8"] as const;

// Componente Wrapper para aplicar gradiente em qualquer coisa (ícone ou texto)
export function GradientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MaskedView
      maskElement={
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </View>
      }
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ opacity: 0 }}>{children}</View>
      </LinearGradient>
    </MaskedView>
  );
}
