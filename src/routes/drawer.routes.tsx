
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Add from "../screens/Add.tsx";
import Home from "../screens/home";



export default function Drawer() {

    const { Navigator, Screen } = createDrawerNavigator();
    return (
        <Navigator screenOptions={{ title: '' }}>
            <Screen
                name="Agenda"
                component={Home}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
                    drawerLabel: "Início"
                }}
            />
            <Screen
                name="Nova Reseva"
                component={Add}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="activity" size={size} color={color} />,
                    drawerLabel: "Nova Reseva"
                }}
            />
        </Navigator>
    )
}