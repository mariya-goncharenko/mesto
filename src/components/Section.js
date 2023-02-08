export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedArray.forEach((item) => {const renderCard = this._renderer(item);
        this.addItem(renderCard);});
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
