import React, { useCallback, useState, useEffect, useContext, useRef  } from 'react';

function Details({ product}) {

  //const { product, setProduct, products, setProducts, loading, error, getProducts } = useContext(ProductContext);


  const priceRef = useRef(null);

  const priceOver = price => {
    return () => {
      console.log("Product price hover: ", price);
      //setProduct(product);
      priceRef.current.style.display = 'block';
    };
  };

  const priceOverLeave = () => {
    console.log("Product price hover leave");
    //setProduct(product);
    priceRef.current.style.display = 'none';
  };

  /*
  useEffect(() => {
    setProduct(products[0]);
  }, [products]);
  */

  return (
    <>
        Product preview {product != null ? (
          <>
            <div>
              {product.title}
            </div>
            <div>
              Brand: {product.brand}
            </div>
            <div>
              <span onMouseOver={priceOver(product.price)} onMouseLeave={priceOverLeave}>Price: {product.price}</span>
            </div>
            <div ref={priceRef} style={{display: 'none'}}>
              <span>Big price: {product.price}</span>
            </div>
          </>
        ): 'no product found'}
    </>
  );
}

export default Details;
