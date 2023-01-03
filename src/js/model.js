import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, API_KEY } from "./config";
import { getJson, sendJson } from "./helper";

// State that gets exported
export const state = {
    recipe: {},
    searchResults: {
        query: "",
        results: [],
        page: 1,
    },
    resultsPerPage: RES_PER_PAGE,
    bookmarks: [],
};

// Format Data to State
function formatData(data) {
    const { recipe } = data.data;
    console.log(recipe);
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
}

// Fetching Recipe data from API
export async function loadRecipe(id) {
    try {
        // Fetch Data from API in JSON Format
        const data = await getJson(`${API_URL}${id}?key=${API_KEY}`);

        // Format Recipe Data onto our state
        state.recipe = formatData(data);

        if (state.bookmarks.some((bk) => bk.id === id)) {
            state.recipe.bookmarked = true;
        } else state.recipe.bookmarked = false;
    } catch (err) {
        throw err;
    }
}

// Load Results from API for Search term
export async function loadSearchResults(query) {
    try {
        // Fetch Data from API in JSON Format
        const { data } = await getJson(
            `${API_URL}?search=${query}&key=${API_KEY}`
        );

        // Store Query Searched in state
        state.searchResults.query = query;
        // Store Fetched data to the state
        state.searchResults.results = data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            };
        });
        // Start displaying results from page 1
        state.searchResults.page = 1;
    } catch (err) {
        throw err;
    }
}

// Return Only 10 recipe items
export function getSearchResultsItems(page = state.searchResults.page) {
    // Save Page No.in state
    state.searchResults.page = page;

    // Get Start & End Index for
    const start = (page - 1) * state.resultsPerPage;
    const end = page * state.resultsPerPage;

    return state.searchResults.results.slice(start, end);
}

// Update Servings info in state
export function updateServings(numOfServings) {
    // Update quantity for each ingredient in ingredients array
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity * numOfServings) / state.recipe.servings;
    });
    console.log(numOfServings);
    // Update Servings in state
    state.recipe.servings = numOfServings;
}

// Persistantly store bookmarks in localstorage
function updateLocalStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

// Add passed in recipe as a bookmarked recipe
export function addBookmark(recipe) {
    // Bookmark in state variable
    state.bookmarks.push(recipe);

    // Check if it's currently loaded recipe
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    // Reflect bookmarked changes in localStorage
    updateLocalStorage();
}

// Delete passed in recipe as a bookmarked recipe
export function removeBookmark(id) {
    // Find index of recipe to remove from bookmarks
    const idx = state.bookmarks.findIndex((el) => el.id === id);
    state.bookmarks.splice(idx, 1);

    // Check if it's currently loaded recipe
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    // Reflect bookmarked changes in localStorage
    updateLocalStorage();
}

// Initialise Bookmarks in state
function initBookmarks() {
    const data = localStorage.getItem("bookmarks");
    if (data) state.bookmarks = JSON.parse(data);
}
initBookmarks();

// Upload Recipe to API
export async function uploadRecipe(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(
                (entry) => entry[0].startsWith("ingredient") && entry[1] !== ""
            )
            .map((entry) => {
                const ings = entry[1].split(",").map((el) => el.trim());
                if (ings.length !== 3) {
                    throw new Error(
                        "Incorrect Input!! Please Input Data In Specified Format."
                    );
                }
                const [qtty, unit, desc] = ings;
                return {
                    quantity: qtty ? +qtty : null,
                    unit,
                    description: desc,
                };
            });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: newRecipe.cookingTime,
            servings: newRecipe.servings,
            ingredients,
        };

        // Post data onto API helper.js
        const data = await sendJson(`${API_URL}?key=${API_KEY}`, recipe);

        // Format Recipe Data onto our state
        state.recipe = formatData(data);

        // Store the Recipe in Bookmarks
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
}
