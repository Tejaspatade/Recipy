class SearchView {
    #parentEl = document.querySelector(".search");

    // Returns value from search input field
    getSearchWord() {
        return this.#parentEl.querySelector(".search__field").value;
    }

    // Listen for click on search button
    addHandlerSearch(handlerFunc) {
        this.#parentEl.addEventListener("submit", (event) => {
            // Prevent Page from reloading on search click
            event.preventDefault();
            handlerFunc();

            // Empty Search Field
            this.#clearSearchBar();
        });
    }

    //----------------------------------------------------------------------------
    // -> Privaate Methods
    #clearSearchBar() {
        this.#parentEl.querySelector(".search__field").value = "";
    }
}

export default new SearchView();
