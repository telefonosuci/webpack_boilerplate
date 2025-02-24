export const fetchProducts = async (successCallback, errorCalback) => {
  //dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    successCallback(data);
    //dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products });
  } catch (error) {
    errorCalback(error);
    //dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};