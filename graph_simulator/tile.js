class Tile {
    type;
    id;
    visited;
    htmlElement;
    value;
    constructor(id, htmlElement) {
        this.type = 'tile';
        this.visited = false;
        this.id = id;
        this.value = Math.floor(Math.random() * 100) % 50;
        this.htmlElement = document.createElement('div');
        this.htmlElement = htmlElement;
    }

    showValue(show){
        this.htmlElement.innerHTML = show? this.value:'';
    }
    setType(type) {
        if(type=='tile'){
            this.visited=false;
        }
        this.type = type;
        this.htmlElement.className = `tile ${type}`;
    }

    visit() {
        this.htmlElement.classList.add('visited');
        this.visited = true;
    }
    available() {
        return (this.type != 'block' && !this.visited);
    }

    isTarget() {
        return this.type == 'target';
    }

}


export { Tile };