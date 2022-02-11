function State() {
    this.container = null;
    this.btnClose = null;
}

const state = new State();

export function init() {
    state.container = document.querySelector("#modal-contact");
    state.btnClose = document.querySelector("#modal-contact-close");

    state.btnClose.addEventListener("click", handleBtnCloseClick);
    state.container.addEventListener("click", handleContainerClick);
}

export function showModal() {
    state.container.classList.toggle("active");
}

function handleBtnCloseClick(e) {
    e.preventDefault();
    showModal();
}

function handleContainerClick(e) {
    e.preventDefault();
    if (e.target === this) {
        showModal();
    }
}