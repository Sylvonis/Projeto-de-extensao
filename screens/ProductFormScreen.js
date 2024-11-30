import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native"; // Importe o Pressable

export default function ProductFormScreen({ route }) {
  const navigation = useNavigation();
  const { product } = route.params || {}; // Recebe os dados do produto, se existir
  const [name, setName] = useState(product?.name || ""); // Inicializa com dados do produto, se houver
  const [quantity, setQuantity] = useState(product?.quantity?.toString() || ""); // Similar ao name
  const [price, setPrice] = useState(product?.price?.toString() || ""); // Similar ao quantity

  const saveProduct = async () => {
    // Validação para garantir que quantidade e preço sejam números válidos
    const quantityNumber = parseInt(quantity);
    const priceNumber = parseFloat(price);

    if (!name || isNaN(quantityNumber) || isNaN(priceNumber)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    const newProduct = {
      id: product?.id || Date.now().toString(), // Se for edição, mantém o id; caso contrário, cria um novo id
      name,
      quantity: quantityNumber,
      price: priceNumber,
    };

    const storedProducts = await AsyncStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    if (product) {
      // Editar produto
      const updatedProducts = products.map((p) => (p.id === product.id ? newProduct : p));
      await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      // Adicionar novo produto
      products.push(newProduct);
      await AsyncStorage.setItem("products", JSON.stringify(products));
    }

    navigation.goBack(); // Volta à tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        placeholder="Ex: frango congelado"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
    <Text style={styles.label}>Preço:</Text>
      <TextInput
        placeholder="R$"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
    <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        placeholder="Adicionar quantidade do Produto"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={saveProduct}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 12,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
