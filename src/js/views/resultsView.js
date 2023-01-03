import View from "./View";
import previewView from "./PreviewView";

class ResultsView extends View {
    // Parent Element for Recipe Viewer
    _parentEl = document.querySelector(".results");
    // Default Error Message
    _errorMsg = `That term seems wrong. Please Try Again.`;

    // Return markup for one recipe
    _generateHTML() {
        return this._data
            .map((result) => previewView.render(result, false))
            .join("");
    }
}

export default new ResultsView();

// <div class="preview__user-generated">
//               <svg>
//                 <use href="${icons}#icon-user"></use>
//               </svg>
//             </div>
