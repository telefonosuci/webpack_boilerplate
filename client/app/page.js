import Renderer from "./reactRenderer";

class Page {
  
  constructor({vComponents, rComponents}) {
    this._autoloadVanilla = vComponents;
    this._autoloadReact = rComponents;
  }

  load() { 

    console.log("LOADING PAGE");

    if(this._autoloadVanilla){
      this._autoloadReact.forEach(el => {
        Renderer.render(el);
      });
    }
    
    if(this._autoloadReact){
      this._autoloadReact.forEach(el => {
        Renderer.render(el);
      });
    }
  }
}

export default Page;