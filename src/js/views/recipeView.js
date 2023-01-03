import icons from "url:../../img/icons.svg";
import View from "./View";

class RecipeView extends View {
    // Parent Element for Recipe Viewer
    _parentEl = document.querySelector(".recipe");
    // Default Error Message
    _errorMsg = `We couldn't find that Recipe :(. Please Try Again`;

    // Add eventHandlers to listen for event when page loads and hash Link changes
    addHandlerRender(handlerFunc) {
        // Event for hash change in URL or reloading page
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handlerFunc)
        );
    }

    // Add eventHandler to listen when we click to change servings
    addHandlerServingsUpdate(handlerFunc) {
        this._parentEl.addEventListener("click", (event) => {
            // Get Button Clicked
            const btn = event.target.closest(".btn--update-servings");
            // Guard Clause
            if (!btn) return;

            // Get updates servings
            const updateTo = +btn.dataset.updateTo;
            // Call Handler to control changes in servings & ingeredients
            if (updateTo > 0) handlerFunc(updateTo);
        });
    }

    //
    addHandlerBookmark(handlerFunc) {
        this._parentEl.addEventListener("click", (event) => {
            // Get Button Clicked
            const btn = event.target.closest(".btn--bookmark");
            // Guard Clause
            if (!btn) return;
            handlerFunc();
        });
    }

    //----------------------------------------------------------------------------
    // -> Private Methods
    // Generate Markup To be rendered
    _generateHTML() {
        // Generate Makup HTML with dynamic data
        return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
            this._data.title
        }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                  this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings"  data-update-to="${
                  this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>

          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
            this._data.bookmarked ? "-fill" : ""
        }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateIngredients).join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
                this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    }
}

{
    /* <div class="recipe__user-generated">
<svg>
  <use href="${icons}#icon-user"></use>
</svg>
</div> */
}

export default new RecipeView();
