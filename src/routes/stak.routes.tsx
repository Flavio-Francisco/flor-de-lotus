
import { createStackNavigator } from "@react-navigation/stack";

import Add from "../screens/Add.tsx/index.tsx";
import Home from "../screens/home/index.tsx";
import Update from "../screens/update/index.tsx";
import Drawer from "./drawer.routes.tsx";



export default function Stack() {

    const { Navigator, Screen } = createStackNavigator();
    return (
        <Navigator screenOptions={{
            headerShown: false,
         
        }}
    
        >
              <Screen
                name="Drewer"
                component={Drawer}
                options={{
                    headerShown:false

                }}

            />
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerShown:false

                }}

            />
            <Screen
                name="Nova Reseva"
                component={Add}
                options={{
                    headerShown:false

                }}
            />
                  <Screen
                name="Atalizar Agendamento "
                component={Update}
                options={{
                    headerShown:false

                }}

            />
        </Navigator>
    )
}