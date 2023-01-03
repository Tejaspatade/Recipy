import * as model from "./model.js";

import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarkView from "./views/bookmarkView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Fetch and Display recipe data on dahsboard
async function controlRecipe() {
    try {
        // 1) Get hash id from URL
        const id = window.location.hash.slice(1);

        // Guard Clause if we have no id in URL
        if (!id) return;

        // Select recipe in reultsView
        resultsView.update(model.getSearchResultsItems());

        // 2) Loading Animation Spinner
        recipeView.renderSpinner();

        // 3) Fetch Request to Load recipe
        await model.loadRecipe(id);

        // 4) Render the recipe with state from model.js
        recipeView.render(model.state.recipe);

        // 5) Render Bookmarked recipes on bookmarkView
        bookmarkView.update(model.state.bookmarks);
    } catch (err) {
        // Display Error Screen on DOM
        recipeView.renderError();
    }
}

// Fetch Search results for query from View
async function controlSearchResults() {
    try {
        // 1) Display Loader in Results View
        resultsView.renderSpinner();

        // 2) Get recipe term to be searched from DOM
        const searchTerm = searchView.getSearchWord();
        // Guard Clause if term is empty
        if (!searchTerm) return;

        // 3) Request Data for searched term
        await model.loadSearchResults(searchTerm);

        // 4) Render Results on Result View
        resultsView.render(model.getSearchResultsItems());

        // 5) Render Appropriate Pagination
        paginationView.render(model.state.searchResults);
    } catch (err) {
        // Display Error Screen on DOM
        recipeView.renderError();
        console.log(err);
    }
}

// Change Results based on Page number supplied
function controlPaginationClicks(pageNum) {
    console.log("Control Pag", pageNum);
    // 1) Render new Results on Result View
    resultsView.render(model.getSearchResultsItems(pageNum));

    // 2) Render Respective Pagination Buttons
    paginationView.render(model.state.searchResults);
}

// Update Servings on click event in state and update DOM accordingly as well
function controlServings(newServings) {
    // Update Servings data in state model.js
    model.updateServings(newServings);
    // Update Servings data in DOM recipeView.js
    recipeView.update(model.state.recipe);
}

// Control bookmark event as well as update DOM
function controlBookmark() {
    // Add/Remove Bookmark
    if (!model.state.recipe.bookmarked)
        // Add recipe as bookmark
        model.addBookmark(model.state.recipe);
    // Add recipe as bookmark
    else model.removeBookmark(model.state.recipe.id);

    // Update recipeView DOM
    recipeView.update(model.state.recipe);

    // Render BookmarkView bookmarkView.js
    bookmarkView.render(model.state.bookmarks);
}

// Set up bookmarks from localStorage
function initBookmarks() {
    bookmarkView.render(model.state.bookmarks);
}

// Control Form Submit for new Recipe
async function controlAddRecipe(newRecipe) {
    try {
        addRecipeView.renderSpinner();
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        // Render Recipe
        recipeView.render(model.state.recipe);

        addRecipeView.renderMessage();
        bookmarkView.render(model.state.bookmarks);

        // Update Browser URL
        window.history.pushState(null, "", `#${model.state.recipe.id}`);

        // Close Modal
        setTimeout(function () {
            addRecipeView.toggleModal();
        }, 2500);
    } catch (err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }
}

// Initialise Event handlers with respective controller functions as callbacks
function init() {
    // Publisher Subscriber Pattern
    bookmarkView.addHandlerRender(initBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerServingsUpdate(controlServings);
    recipeView.addHandlerBookmark(controlBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPaginationClicks);
    addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
