
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import {MaterialIcons} from '@expo/vector-icons';
import Add from "../screens/Add.tsx";
import Home from "../screens/home";
import { thema } from "../../thema.ts";
import { SafeAreaView, View ,Image,Text} from "react-native";
import Update from "../screens/update/index.tsx";
import React from "react";
import Stack from "./stak.routes.tsx";
import Register from "../screens/register/index.tsx";
import UpdateAvatarUser from "../components/UpdateAvatarUser/index.tsx";




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
                        <UpdateAvatarUser/>
                        <Text style={{
                            fontSize: 22,
                            marginVertical: 6,
                            color: thema.colors.white
                        }}>Nathalia</Text>
                    </View>
                    <DrawerItemList  {...props} />
                </SafeAreaView>
            )
        }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="home" size={size} color={thema.colors.white} />,
                    drawerLabel: "Agendamentos",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }

                }}

            />
            <Screen
                name="Nova Reseva"
                component={Add}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="save" size={size} color={thema.colors.white} />,
                    drawerLabel: "Novo cadastro",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }
                }}
            />
                  <Screen
                name="Atalizar Agendamento "
                component={Update}
                options={{
                    drawerIcon: ({ size, color }) => <MaterialIcons name="add-a-photo" size={24} color={thema.colors.white} />,
                    drawerLabel: "Atalizar foto da criança",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }

                }}

            />
                 <Screen
                name="Register"
                component={Register}
                options={{
                    drawerIcon: ({ size, color }) => <Feather name="smile" size={size} color={thema.colors.white} />,
                    drawerLabel: "Lista de crianças",
                    drawerLabelStyle:{
                        color:thema.colors.white
                    }

                }}

            />
            
        
        </Navigator>
    )
}