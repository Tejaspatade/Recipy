import View from "./View";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
    // Parent Element for Recipe Viewer
    _parentEl = "";

    // Single Item of Results View Markup Generator
    _generateHTML() {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
            <a class="preview__link ${
                id === this._data.id ? "preview__link--active" : ""
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
              <div class="recipe__user-generated ${
                  this._data.key ? "" : "hidden"
              }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            </a>
          </li>
        `;
    }
}

export default new PreviewView();
