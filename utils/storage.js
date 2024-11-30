import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar o produto no AsyncStorage
export const saveProducts = async (products) => {
  try {
    await AsyncStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
};

// Função para carregar os produtos do AsyncStorage
export const loadProducts = async () => {
  try {
    const storedProducts = await AsyncStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
};

// Função para excluir o produto do AsyncStorage
export const deleteProduct = async (id, products) => {
  try {
    const updatedProducts = products.filter((product) => product.id !== id);
    await saveProducts(updatedProducts);
    return updatedProducts;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return products;
  }
};
