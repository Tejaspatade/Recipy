import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";

export default class View {
    // Recipe Data
    _data;
    // Render Method takes in recipe data as obj and renders it onto DOM
    render(data, render = true) {
        // Validate data
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }

        // Store data in class attribute
        this._data = data;
        const markup = this._generateHTML();

        //
        if (!render) return markup;
        // Remove No recipe message from page
        this._clear();
        // Add Recipe Data onto page
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    //
    update(data) {
        this._data = data;
        // New Markup
        const newMarkup = this._generateHTML();
        const vDOM = document.createRange().createContextualFragment(newMarkup);
        const curElements = Array.from(this._parentEl.querySelectorAll("*"));
        const elements = Array.from(vDOM.querySelectorAll("*"));
        elements.forEach((newEl, i) => {
            const curEl = curElements[i];

            // Update any text that changed in newEl
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ""
            ) {
                curEl.textContent = newEl.textContent;
            }

            // Update any data that changes in newEl
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach((attr) =>
                    curEl.setAttribute(attr.name, attr.value)
                );
            }
        });
    }

    // Loading Spinner Display
    renderSpinner() {
        // Markup for spinner div
        const html = `
              <div class="spinner">
                  <svg>
                      <use href="${icons}#icon-loader"></use>
                  </svg>
              </div>
            `;

        // Clear Parent Element
        this._clear();
        // Add Loading Animation html
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    renderMessage(msg = this._message) {
        const html = `
                <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${msg}</p>
                </div> 
            `;
        // Clear Parent Element
        this._clear();
        // Add Loading Animation html
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    // Display Error Message on DOM
    renderError(msg = this._errorMsg) {
        const html = `
                <div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                  </div>
                  <p>${msg}!</p>
                </div> 
            `;
        // Clear Parent Element
        this._clear();
        // Add Loading Animation html
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    //----------------------------------------------------------------------------
    // -> Private Methods
    // Clear ParentElement of any html to add in new html
    _clear() {
        // Remove No recipe message from page
        this._parentEl.innerHTML = "";
    }

    // Ingredients HTML Markup Generator
    _generateIngredients(ing) {
        return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
            ing.quantity ? new Fraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
  `;
    }
}
