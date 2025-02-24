import React from 'react';
import { createRoot } from 'react-dom/client';

class Renderer {
  static render(el) {

    const container = document.getElementById(el.selector)
    if(container) {
      const root = createRoot(container);
      // Initial render: Render an element to the root.
      console.log("RENDERING: ", el.selector);

      console.log("DATASET: ", container.dataset);


      root.render(<el.component props={container.dataset}></el.component>);
    } else {
      console.log("RENDERING - No elements found for selector: ", el.selector);
    }

  }
}

export default Renderer;
