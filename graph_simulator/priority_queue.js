
class PriorityQueue{
    queue;
    constructor(){
        this.queue=[];
    }
    //element => [priority, value]
    push(element){
        let i = 0;
        for(i = 0; i<this.queue.length;i++){
            if(this.queue[i]>element[0]){
                break;
            }
        }
        this.queue.splice(i,0,element);
    }

    isEmpty(){
        return this.queue.length==0;
    }

    dequeue(){
        return this.queue.shift();
    }

    top(){
        return this.queue[0];
    }
}

export {PriorityQueue};


