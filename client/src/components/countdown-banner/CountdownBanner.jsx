import React, { useCallback, useState, useEffect, useContext } from 'react';
import './countdownBanner.css';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeProvider';
import { ProductContext } from '../../contexts/ProductProvider';
import { throttle } from '../../helpers/functions';

const calculateTimeLeft = (expire) => {
  const difference = +new Date(expire) - +new Date();
  let timeLeft = {};
  console.log("Difference: ", difference);
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};


/**
 *
 * @param {date} format yyyy-mm-gg
 * @returns rendered comppnent
 */
function CountdownBanner({ title, subtitle, expire, productUrl }) {



  const { theme, toggleTheme } = useContext(ThemeContext);
  const { products, setProducts, loading, error, getProducts } =
    useContext(ProductContext);



    /*

  console.log("Passed Props: ", title);
  console.log("Passed Props: ", subtitle);
  console.log("Passed Props: ", expire);
  console.log("Passed Props: ", productUrl);


  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(expire) - +new Date();
    let timeLeft = {};
    console.log("Difference: ", difference);
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  });
*/
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {



    /*
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(expire));
    }, 1000);
    */

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expire));
    }, 1000);

    return () => clearInterval(timer);

    /*
    throttle(() => {
      console.log('Set timeleft event throttled!');
      setTimeLeft(calculateTimeLeft(expire));
    }, 1000);
    */


    console.log("Chiamata useEffect per calcolare il tempo rimananete. Con array vuoto viene chiamata solo al mount.");
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, i) => {

    /* if zero the element is not rendered
    if (!timeLeft[interval]) {
      return;
    }
    */

    timerComponents.push(
      <div key={i}>
        <div className='countdownbanner-cell'>
          {timeLeft[interval]}
        </div>
        <div>
          {interval}{" "}
          </div>
      </div>
    );
  });


  const button = <a href={productUrl}><button>Acquista il prodotto</button></a>;

  return (
    <div className='countdownbanner'>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <h2>{theme}</h2>
      <div><button onClick={toggleTheme}>Cambia tema</button></div>
      <div className='countdownbanner-timer'>
        {timeLeft >= 0 ?
        <div>
          {timerComponents.length ? timerComponents : ''}
        </div> : <span>Time's up!</span>}
      </div>
      <div>
        {button}
      </div>

      {/*
        {productList}
      */}
    </div>
  );
}

// Define PropTypes
CountdownBanner.propTypes = {
  title: PropTypes.string.isRequired, // Required string
  subtitle: PropTypes.string,             // Optional number
  expire: PropTypes.date,           // Optional boolean
  productUrl: PropTypes.string,           // Optional
};

// Set default props (optional)
CountdownBanner.defaultProps = {
  title: "Titolo",
  subtitle: "Sottotitolo",
  expire: "2025-12-31",
  productUrl: "",
};

export default CountdownBanner;
