
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Add from "../screens/Add.tsx";
import Home from "../screens/home";
import { thema } from "../../thema.ts";



export default function Drawer() {

    const { Navigator, Screen } = createDrawerNavigator();
    return (
        <Navigator screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#c33c81',

            },


        }}
        >
            <Screen
                name="Agenda"
                component={Home}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="home" size={size} color={thema.colors.white} />,
                    drawerLabel: "Início",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }

                }}
            />
            <Screen
                name="Nova Reseva"
                component={Add}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="activity" size={size} color={thema.colors.white} />,
                    drawerLabel: "Nova Reseva",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }
                }}
            />
        </Navigator>
    )
}