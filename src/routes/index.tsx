import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./drawer.routes";

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer />
        </NavigationContainer>
    )
}