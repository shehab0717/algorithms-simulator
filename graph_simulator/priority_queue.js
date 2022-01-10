
class PriorityQueue{
    queue;
    constructor(){
        this.queue=[];
    }
    push(val){
        let i = 0;
        for(i = 0; i<this.queue.length;i++){
            if(this.queue[i]>val){
                break;
            }
        }
        this.queue.splice(i,0,val);
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


