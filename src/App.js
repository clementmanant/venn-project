import { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import ColorContext from "./ColorContext";
import CreateMember from "./screens/CreateMember";
import CreateProject from "./screens/CreateProject";

const Stack = createNativeStackNavigator();

export default function App() {
  console.disableYellowBox = true;
  const [color, setColor] = useState(null);
  return (
    <ColorContext.Provider value={[color, setColor]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Accueil" component={Home} />
          <Stack.Screen name="CreateMember" component={CreateMember} />
          <Stack.Screen name="CreateProject" component={CreateProject} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorContext.Provider>
  );
}

registerRootComponent(App);
