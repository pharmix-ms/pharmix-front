import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./types";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { History, House, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradientWrapper } from "../components/GradientWrapper";
import { Text } from "react-native";
import { MedicineStack } from "./MedicineStack";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#CED2DA",
          borderTopWidth: 2,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#2ECC71",
        tabBarInactiveTintColor: "#637083",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Montserrat-SemiBold" },

        tabBarIcon: ({ focused, color }) => {
          let IconComponent;
          if (route.name === "Profile")
            IconComponent = <User size={28} color={color} />;
          else if (route.name === "MedicineStack")
            IconComponent = <House size={28} color={color} />;
          else IconComponent = <History size={28} color={color} />;

          if (focused) {
            return <GradientWrapper>{IconComponent}</GradientWrapper>;
          }
          return IconComponent;
        },

        tabBarLabel: ({ focused, children, color }) => {
          const labelText = (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Montserrat-SemiBold",
                color: focused ? color : "#637083",
              }}
            >
              {children}
            </Text>
          );

          if (focused) {
            return <GradientWrapper>{labelText}</GradientWrapper>;
          }
          return labelText;
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
      <Tab.Screen
        name="MedicineStack"
        component={MedicineStack}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "Histórico" }}
      />
    </Tab.Navigator>
  );
}
