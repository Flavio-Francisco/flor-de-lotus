
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Add from "../screens/Add.tsx";
import Home from "../screens/home";
import { thema } from "../../thema.ts";
import { SafeAreaView, View ,Image,Text} from "react-native";



export default function Drawer() {

    const { Navigator, Screen } = createDrawerNavigator();
    return (
        <Navigator screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: thema.colors.pink,

            },
        }}
        drawerContent={(props) => {
            return (
                <SafeAreaView >
                    <View style={{
                        width: '100%',
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: thema.colors.white,
                        paddingBottom: 8,
                        marginTop:30
                    }}>
                        <Image source={require('../../assets/leninha.jpg')} style={{ width: 100, height: 100, borderRadius: 25 }} />
                        <Text style={{
                            fontSize: 22,
                            marginVertical: 6,
                            color: thema.colors.white
                        }}>Leninha </Text>
                    </View>
                    <DrawerItemList  {...props} />
                </SafeAreaView>
            )
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