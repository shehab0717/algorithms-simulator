
import { SortSimulator } from "./sort_simulator.js";

var simulator = new SortSimulator();
simulator.generateRandomArray(100);
var speedSlider = document.getElementById('speed');
var sizeSlider = document.getElementById('arraySize');
var sortBtn = document.getElementById('sortBtn');
var stopBtn = document.getElementById('stopBtn');
var algorithmSelector = document.getElementById('algorithmSelector');

speedSlider.oninput = function (){
    simulator.updateSpeed(this.value);
}

sizeSlider.oninput = function (){
    simulator.changeArraySize(this.value);
}

sortBtn.onclick = async ()=>{
    let algo = algorithmSelector.value;
    sortBtn.disabled = true;
    sizeSlider.disabled = true;
    if(algo == 'bubbleSort'){
        await simulator.bubbleSort();
    } else if(algo == 'selectionSort'){
        await simulator.selectionSort();
    } else if(algo == 'insertionSort'){
        await simulator.insertionSort();
    } else if(algo == 'mergeSort'){
        await simulator.mergeSort();
    } else if(algo == 'quickSort'){
        await simulator.quickSort();
    }
    sortBtn.disabled = false;
    sizeSlider.disabled = false;
}

stopBtn.onclick = function (){
    simulator = new SortSimulator();
}