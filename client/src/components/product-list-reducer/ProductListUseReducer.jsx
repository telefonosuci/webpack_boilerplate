import React, { useContext } from 'react';
import { ProductContextWithReducer, useProducts } from '../../contexts/ProductsWithReducer';
import { fetchProducts } from '../../api/products';

function ProductListUseReducer() {
  //const { state } = useProducts();
  const { state, dispatch } = useContext(ProductContextWithReducer);
  const { products, loading, error } = state;


  const deleteList = () => {
    return () => {
      dispatch({ type: 'EMPTY_PRODUCTS_LIST' });
    };
  };

  const reloadList = () => {
    return () => {
      dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

      fetchProducts((data) => {
        console.log("Fetched Data: ", data);
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products });
      },
      (error) => {
        console.log("Fetch Error: ", error);
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
      });
    };
  };

  const removeProduct = (productId) => {
    return () => {
      dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>Commands: <span onClick={deleteList()}>Delete list</span><span onClick={reloadList()}>Reload list</span></div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}<span onClick={removeProduct(product.id)}> - Remove prod</span></li>
        ))}
      </ul>
    </>
  );
}

export default ProductListUseReducer;