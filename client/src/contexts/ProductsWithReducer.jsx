import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Stato iniziale
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'EMPTY_PRODUCTS_LIST':
      return { ...state, loading: false, products: [] };
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter(product => product.id !== action.payload) };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    default:
      throw new Error(`Azione non gestita: ${action.type}`);
  }
}

// Crea il contesto
const ProductContextWithReducer = createContext();

// Provider del contesto
function ProductProviderWithReducer({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products });
      } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <ProductContextWithReducer.Provider value={{ state, dispatch }}>
      {children}
    </ProductContextWithReducer.Provider>
  );
}

// Hook personalizzato per usare il contesto
function useProducts() {
  const context = useContext(ProductContextWithReducer);
  if (context === undefined) {
    throw new Error('useProducts deve essere usato all\'interno di un ProductProvider');
  }
  return context;
}

export { ProductProviderWithReducer, ProductContextWithReducer, useProducts };