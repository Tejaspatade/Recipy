import View from "./View";
import previewView from "./PreviewView";

class BookmarkView extends View {
    // Parent Element for Recipe Viewer
    _parentEl = document.querySelector(".bookmarks__list");
    // Default Error Message
    _errorMsg = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

    //
    addHandlerRender(handlerFunc) {
        window.addEventListener("load", handlerFunc);
    }

    // Return markup for one recipe
    _generateHTML() {
        return this._data
            .map((bookmark) => previewView.render(bookmark, false))
            .join("");
    }
}

export default new BookmarkView();

// <div class="preview__user-generated">
//               <svg>
//                 <use href="${icons}#icon-user"></use>
//               </svg>
//             </div>
