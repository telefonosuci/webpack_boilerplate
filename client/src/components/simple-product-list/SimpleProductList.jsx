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
function SimpleProductList() {


  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProduct(products[0]);
  }, [products]);

  const prdoductClick = (product) => {
    return () => {
      console.log("Product clicked: ", product);
      setProduct(product);
    };
  };

  const productList = <div>

    {products && products.length > 0 ? (
      <div>
      {products.map((product, index) => (
        <div key={index} onClick={prdoductClick(product)}>
          <span style={{cursor: 'pointer'}}>{product.title}</span>  <span onClick={removeProduct(product, index)} style={{cursor: 'pointer'}}>&nbsp;-remove</span>
        </div>
      ))}
      </div>
    ) : (<div>Caricamento in corso...</div>)}

  </div>;

  return (
    <div className='productlist-container'>

      <h2>React product list</h2>



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

export default SimpleProductList;
