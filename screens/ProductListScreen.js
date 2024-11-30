import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  const handleDecreaseQuantity = async (id) => {
    try {
      const updatedProducts = products.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const updatedProducts = products.filter((product) => product.id !== id);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  };

  const handleEdit = (product) => {
    navigation.navigate('ProductForm', { product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Produto"
          onPress={() => navigation.navigate('ProductForm')}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onDelete={() =>
              item.quantity === 1 ? handleDelete(item.id) : handleDecreaseQuantity(item.id)
            }
            onEdit={() => handleEdit(item)}
            buttonText={item.quantity === 1 ? 'Excluir Produto' : 'Diminuir Quantidade'}
          />
        )}
        contentContainerStyle={products.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Button
              title="Adicionar Produto"
              onPress={() => navigation.navigate('ProductForm')}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    padding: 8,
    backgroundColor: '#fff',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ProductListScreen;
