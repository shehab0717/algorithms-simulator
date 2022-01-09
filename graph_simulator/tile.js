class Tile {
    #type;
    id;
    visited;
    htmlElement;
    constructor(id, htmlElement) {
        this.#type = 'tile';
        this.visited = false;
        this.id = id;
        this.htmlElement = document.createElement('div');
        this.htmlElement = htmlElement;
    }

    setType(type) {
        this.#type = type;
        this.htmlElement.className = `tile ${type}`;
    }

    visit() {
        this.htmlElement.classList.add('visited');
        this.visited = true;
    }
    available() {
        return (this.#type != 'block' && !this.visited);
    }

    isTarget() {
        return this.#type == 'target';
    }

}


export { Tile };