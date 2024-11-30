import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ProductItem = ({ item, onDelete, onEdit, buttonText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome: {item.name}</Text>
      <Text style={styles.text}>Preço: R$ {item.price}</Text>
      <Text style={styles.text}>Quantidade: {item.quantity}</Text> 
      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(item)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  text: {
    marginBottom: 8,
    fontSize: 16,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editButton: {
    backgroundColor: "#007bff", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  deleteButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductItem;
