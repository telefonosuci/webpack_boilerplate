//import Page from '@App/page.js';
//import CountdownBanner from '@/components/countdown-banner/CountdownBanner';

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


document.addEventListener('DOMContentLoaded', () => {

  console.log("Home loaded");

  const elList = document.querySelectorAll('.js-react-countdown-banner');

  console.log("Element List: ", elList);

  elList.forEach((el) => {

    console.log("Processing element: ", el);

    const { heading, subtitle, expire, productUrl } = el.dataset ;

    console.log("Data: ", el.dataset);
    console.log("Heading: ", heading);
    console.log("Subtitle: ", subtitle);
    console.log("Expire: ", expire);
    console.log("Product url: ", productUrl);

    ReactDOM.render(
      <ThemeProvider>
        <ProductProvider>
          <CountdownBanner title={heading} subtitle={subtitle} productUrl={productUrl} expire={expire} />
        </ProductProvider>
      </ThemeProvider>,
      el
    );
  });

  const productElList = document.querySelectorAll('.js-react-product-lister');

  console.log("Element lister List: ", productElList);

  productElList.forEach((el) => {

    ReactDOM.render(
      <ThemeProvider>
        <ProductProvider>
          <ProductLister />
        </ProductProvider>
      </ThemeProvider>,
      el
    );
  });

  const productRedElList = document.querySelectorAll('.js-react-product-lister-with-reducer');

  console.log("Element lister List: ", productRedElList);

  productRedElList.forEach((el) => {

    const products = JSON.parse(el.dataset.products);

    console.log("Shopify Liquid products data: ", products);

    ReactDOM.render(
        <ProductProviderWithReducer>
          <ProductListUseReducer />
        </ProductProviderWithReducer>,
      el
    );
  });


  const simpleElList = document.querySelectorAll('.js-react-simple-react-component');

  console.log("Element simple component List: ", simpleElList);


  simpleElList.forEach((el) => {

    const { text } = el.dataset ;
    const root = createRoot(el);
    root.render(<SimpleReactComponent text={text} />);
  });

  /*
  console.log("DEBUGGING");
  const cList = [
    {
      selector: 'js-webar-r-countdown-component',
      component: CountdownBanner
    }
  ]

  const home = new Page({
    vComponents: [],
    rComponents: cList
  });

  home.load();
  */
});
