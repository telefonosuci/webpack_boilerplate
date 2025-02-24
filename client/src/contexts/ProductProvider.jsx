import React, { createContext, useState, useContext, useEffect } from 'react';

// Creiamo il contesto
export const ProductContext = createContext();

// Creiamo un provider che gestisce lo stato
export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dummyjson.com/products'); // Replace with your API URL
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Recupera i prodotti quando il provider viene montato
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProduct(products[0]);
  }, [products]);

  return (
    <ProductContext.Provider value={{
      product,
      setProduct,
      products,
      setProducts,
      loading,
      error,
      getProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};