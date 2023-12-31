import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./drawer.routes";
import Stack from "./stak.routes";
import React from "react";

export default function Routes() {
    return (
        <NavigationContainer>
            
            <Drawer />
        </NavigationContainer>
    )
}