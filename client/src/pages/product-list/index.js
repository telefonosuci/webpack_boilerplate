
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import CountdownBanner from '@/components/countdown-banner/CountdownBanner';
import ProductListUseReducer from '@/components/product-list-reducer/ProductListUseReducer';

import { ThemeProvider } from '../../contexts/ThemeProvider';
import { ProductProvider } from '../../contexts/ProductProvider';
import { ProductProviderWithReducer } from '../../contexts/ProductsWithReducer';
import ProductLister from '../../components/product-lister/ProductLister';
import SimpleReactComponent from '../../components/simple-react-component/SimpleReactComponent';
import SimpleProductList from '../../components/simple-product-list/SimpleProductList';

document.addEventListener('DOMContentLoaded', () => {

  console.log("Product list loaded");

  const productElList = document.querySelectorAll('.js-react-product-lister');

  console.log("Element lister List: ", productElList);

  productElList.forEach((el) => {

    ReactDOM.render(
      <ThemeProvider>

          <SimpleProductList />

      </ThemeProvider>,
      el
    );
  });

});
