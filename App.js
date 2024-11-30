import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "./screens/ProductListScreen";
import ProductFormScreen from "./screens/ProductFormScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: "Produtos" }} />
        <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: "Adicionar/Editar Produto" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
