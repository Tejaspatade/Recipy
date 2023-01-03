import View from "./View";
import icons from "url:../../img/icons.svg";
import { RES_PER_PAGE } from "../config";

class PaginationView extends View {
    _parentEl = document.querySelector(".pagination");

    addHandlerClick(handlerFunc) {
        this._parentEl.addEventListener("click", (event) => {
            // Get Page Button that was clicked
            const btn = event.target.closest(".btn--inline");

            // Guard Clause
            if (!btn) return;

            // Get Page number to go to from button clicked
            const goToPage = +btn.dataset.goto;

            // Pass page num to handler in controller.js
            handlerFunc(goToPage);
        });
    }

    _generateHTML() {
        const currentPage = this._data.page;
        const numOfPages = Math.ceil(this._data.results.length / RES_PER_PAGE);

        // Scenario 1: First Page without other pages
        if (currentPage === 1 && numOfPages === 1) {
            return "";
        }
        // Scenario 2: First Page with other pages
        if (currentPage === 1 && numOfPages !== 1) {
            return `
                <button data-goto="${
                    currentPage + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // Scenario 4: Last Page
        if (currentPage === numOfPages && numOfPages > 1) {
            return `
                    <button data-goto="${
                        currentPage - 1
                    }" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currentPage - 1}</span>
                    </button>
                    `;
        }
        // Scenario 3: Middle Page
        if (currentPage !== numOfPages) {
            return `
                <button data-goto="${
                    currentPage - 1
                }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto="${
                    currentPage + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
    }
}

/*
<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
*/

export default new PaginationView();
