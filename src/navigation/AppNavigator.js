import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import FieldsScreen from "../screens/FieldsScreen";
import FieldDetailsScreen from "../screens/FieldDetailsScreen";
import CreateMatchScreen from "../screens/CreateMatchScreen";
import MatchLobbyScreen from "../screens/MatchLobbyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Fields" component={FieldsScreen} />
      <Stack.Screen name="FieldDetails" component={FieldDetailsScreen} />
      <Stack.Screen name="CreateMatch" component={CreateMatchScreen} />
      <Stack.Screen name="MatchLobby" component={MatchLobbyScreen} />
    </Stack.Navigator>
  );
}

