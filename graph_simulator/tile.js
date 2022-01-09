class Tile{
    #type;
    id;
    visited;
    htmlElement;
    constructor(id, htmlElement){
        this.#type = 'tile';
        this.visited = false;
        this.type = id;
        this.htmlElement = document.createElement('div');
        this.htmlElement = htmlElement;
    }

    setType(type){
        this.#type = type;
        this.htmlElement.className = `tile ${type}`;
    }

    available(){
        return (this.#type!='block' && !this.visited);
    }

    isTarget(){
        return this.#type=='target';
    }

}


export {Tile};