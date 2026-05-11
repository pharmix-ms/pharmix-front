import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function UseHideTabBar() {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      parent?.setOptions({
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#CED2DA",
          borderTopWidth: 2,
          height: 70,
          paddingTop: 10,
        },
      });
    };
  }, [navigation]);
}
