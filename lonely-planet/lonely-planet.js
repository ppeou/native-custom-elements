// Create a class for the element
class LonelyPlanet extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create div.wrapper
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lonely-planet');

    // Create label element
    const labelElem = document.createElement('div');
    labelElem.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-name');
    labelElem.textContent = text;

    // Insert Planet icon
    let imgUrl = this.getAttribute('data-img') || 'resources/planet.svg';
    const imgElem = document.createElement('div');
    imgElem.setAttribute('class', 'img');

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');

    style.textContent = `
      :host {
        display: block;
        --item-direction: column;
        --item-align: center;
        --white-space: normal;
      }
      :host(.left) {--item-direction: row;}      
      :host(.right) {--item-direction: row-reverse;}      
      :host(.top) {--item-direction: column;}
      :host(.bottom) {--item-direction: column-reverse;}
      :host(.nowrap) {--white-space: nowrap;}
      
      
      .lonely-planet {
        display: flex;
        flex-direction: var(--item-direction);
        height: 100%;
        width: 100%;
        align-items: var(--item-align);
      }
      .info {
        font-size: 2rem;
        white-space: var(--white-space);
      }
      .img {
        min-height: 2rem;
        min-width: 2rem;
        background-repeat: no-repeat;
        background-image: url(${imgUrl});
        width: 100%;
        height: 100%;
        background-position: center center;
        border: none !important;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(imgElem);
    wrapper.appendChild(labelElem);
  }
}

// Define the new element
customElements.define('lonely-planet', LonelyPlanet);