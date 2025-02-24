import React, { useCallback, useState, useEffect, useContext  } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { ProductContext } from '../../contexts/ProductProvider';
import Details from './Deatils';

/**
 *
 * @param {date} format yyyy-mm-gg
 * @returns rendered comppnent
 */
function ProductLister({ size }) {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { product, setProduct, products, setProducts, loading, error, getProducts } =
    useContext(ProductContext);



  const prdoductCLick = (product) => {
    return () => {
      console.log("Product clicked: ", product);
      setProduct(product);
    };
  };


  const removeProduct = (product, index) => {
    return () => {
      console.log("removeProduct at index ", index);
      console.log("removeProduct is ", product);

      let updatedProducts = products.filter((product, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

/*
  useEffect(() => {
    setProduct(products[0]);
  }, [products]);
*/

  const productList = <div>

    {products && products.length > 0 ? (
      <div>
      {products.map((product, index) => (
        <div key={index}>
          <span onClick={prdoductCLick(product)} style={{cursor: 'pointer'}}>{product.title}</span>  <span onClick={removeProduct(product, index)} style={{cursor: 'pointer'}}>&nbsp;-remove</span>
        </div>
      ))}
      </div>
    ) : (<div>Caricamento in corso...</div>)}

  </div>;

  return (
    <div className='productlist-container'>

      <h2>React product lister</h2>


      <div className="flex-container" style={{ maxHeight: 500}}>

        <div className="flex-item product-details">
            <Details product={product} />
        </div>

        <div className="flex-item">
          {productList}
        </div>

      </div>
    </div>
  );
}

export default ProductLister;
