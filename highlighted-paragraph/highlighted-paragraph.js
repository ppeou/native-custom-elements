// Create a class for the element
class HighlightedParagraph extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();

    const generateHighlightWords = (node, word) => {
      const text = node.innerText || node.textContent;

      let markElem;
      if (word) {
        const reg = new RegExp(word, 'ig');
        const foundWords = text.match(reg);
        let tempText = text;
        tempText = foundWords.reduce((p, w) => {
          return p.replace(new RegExp(w, 'g'), `<mark>${w}</mark>`);
        }, tempText);

        markElem = document.createElement('p');
        markElem.innerHTML = tempText;

      } else {
        markElem = document.createElement('mark');
        markElem.innerText = text;
      }

      return markElem;
    }

    const searchWord = this.getAttribute('data-word') || '';
    const highlightBgColor = this.getAttribute('data-bg-color') || 'yellow';
    const highlightColor = this.getAttribute('data-color') || 'black';


    // Create text node and add word count to it
    const newParagrapElement = generateHighlightWords(this, searchWord);

    if (newParagrapElement) {
      // Create a shadow root
      const shadow = this.attachShadow({mode: 'open'});

      const style = document.createElement('style');

      style.textContent = `
        mark {
          color: ${highlightColor};
          background-color: ${highlightBgColor};
        }
      `;
      shadow.appendChild(style);

      // Append it to the shadow root
      shadow.appendChild(newParagrapElement);
    }

  }
}

// Define the new element
customElements.define('highlighted-paragraph', HighlightedParagraph, {extends: 'p'});