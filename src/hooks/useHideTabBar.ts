import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function useHideTabBar() {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent(); // pega o BottomTab pai
    parent?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      parent?.setOptions({
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#CED2DA",
          borderTopWidth: 2,
          height: 70, // sem o insets aqui, veja nota abaixo
          paddingTop: 10,
        },
      });
    };
  }, [navigation]);
}
