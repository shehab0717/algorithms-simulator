
import { SortSimulator } from "./sort_simulator.js";

var simulator = new SortSimulator();

var speedSlider = document.getElementById('speed');
var sizeSlider = document.getElementById('arraySize');
var sortBtn = document.getElementById('sortBtn');
var algorithmSelector = document.getElementById('algorithmSelector');


algorithmSelector.onchange = function(){
    
    console.log(this.value);
}

speedSlider.oninput = function (){
    simulator.updateSpeed(this.value);
}

sizeSlider.oninput = function (){
    simulator.changeArraySize(this.value);
}

sortBtn.onclick = ()=>{
    let algo = algorithmSelector.value;
    if(algo == 'bubbleSort'){
        simulator.bubbleSort();
    } else if(algo == 'selectionSort'){
        simulator.selectionSort();
    } else if(algo == 'insertionSort'){
        simulator.insertionSort();
    } else if(algo == 'mergeSort'){
        simulator.mergeSort();
    } else if(algo == 'quickSort'){
        simulator.quickSort();
    }
}
