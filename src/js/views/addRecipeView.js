import View from "./View";

class AddRecipeView extends View {
    _parentEl = document.querySelector(".upload");
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    _message = "Recipe was successfully Uploaded";
    constructor() {
        super();
        this._addHandlerShowModal();
        this._addHandlerHideModal();
    }

    toggleModal() {
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }

    _addHandlerShowModal() {
        this._btnOpen.addEventListener("click", this.toggleModal.bind(this));
    }

    _addHandlerHideModal() {
        this._btnClose.addEventListener("click", this.toggleModal.bind(this));
        this._overlay.addEventListener("click", this.toggleModal.bind(this));
    }

    addHandlerUpload(handlerFunc) {
        this._parentEl.addEventListener("submit", (event) => {
            event.preventDefault();
            const dataArr = [...new FormData(this._parentEl)];
            const data = Object.fromEntries(dataArr);
            handlerFunc(data);
        });
    }

    _generateHTML() {}
}

export default new AddRecipeView();
