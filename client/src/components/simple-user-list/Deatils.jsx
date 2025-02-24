import React, { useCallback, useState, useEffect, useContext, useRef  } from 'react';

function Details({ user}) {

  //const { product, setProduct, products, setProducts, loading, error, getProducts } = useContext(ProductContext);




  /*
  useEffect(() => {
    setProduct(products[0]);
  }, [products]);
  */

  return (
    <>
        User preview {user != null ? ( user.name ): 'no user found'}
    </>
  );
}

export default Details;
