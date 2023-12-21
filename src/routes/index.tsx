import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./drawer.routes";
import Stack from "./stak.routes";

export default function Routes() {
    return (
        <NavigationContainer>
            
            <Drawer />
        </NavigationContainer>
    )
}