class SortSimulator {

    #board;
    #nums;
    #simCols;
    waitTime;

    constructor() {
        this.#board = document.getElementById('board');
        this.waitTime = 30;
    }
    #randomNumber(max) {
        return Math.floor(Math.random() * 2000) % max;
    }
    generateRandomArray() {
        let n = 100;
        this.#nums = new Array(n);
        this.#simCols = new Array(n);
        for (let i = 0; i < n; i++) {
            let val = this.#randomNumber(200);
            this.#nums[i] = val;
            this.#display(i);
        }
    }

    generateArray(array) {
        this.#nums = array;
        this.#simCols = new Array(array.length);
        for (let i = 0; i < array.length; i++) {
            this.#display(i);
        }
    }
    #display(index) {
        let div = document.createElement('div');
        div.style.height = `${this.#nums[index]}px`;
        div.id = index;
        div.className = 'val-sim primary';
        this.#simCols[index] = div;
        this.#board.appendChild(div);
    }
    async #color(i, color) {
        this.#simCols[i].className = `val-sim ${color}`;
        await this.#wait();
    }
    async #color2(i, j, color) {
        this.#simCols[i].className = `val-sim ${color}`;
        this.#simCols[j].className = `val-sim ${color}`;
        await this.#wait();
    }
    #wait() {
        return new Promise(resolve => { setTimeout(resolve, this.waitTime) });
    }
    #swap(i, j) {
        let temp = this.#nums[i];
        this.#nums[i] = this.#nums[j];
        this.#nums[j] = temp;
    }
    #updateUI(index) {
        this.#simCols[index].style.height = `${this.#nums[index]}px`;
    }

    async bubbleSort() {
        for (let i = 0; i < this.#nums.length; i++) {
            for (let j = 0; j < this.#nums.length - i - 1; j++) {
                await this.#color2(j, j + 1, 'check');
                if (this.#nums[j] > this.#nums[j + 1]) {
                    await this.#color2(j, j + 1, 'swap');
                    this.#swap(j, j + 1);
                    this.#updateUI(j);
                    this.#updateUI(j + 1);
                }
                await this.#color2(j, j + 1, 'primary');
            }
        }
    }

    async selectionSort() {
        for (let i = 0; i < this.#nums.length; i++) {
            for (let j = i + 1; j < this.#nums.length; j++) {
                await this.#color2(i, j, 'check');

                if (this.#nums[i] > this.#nums[j]) {
                    await this.#color2(i, j, 'swap');

                    this.#swap(i, j);
                    this.#updateUI(i);
                    this.#updateUI(j);
                }
                await this.#color2(i, j, 'primary');
            }
        }
    }

    async insertionSort() {
        for (let i = 1; i < this.#nums.length; i++) {
            let j = i - 1;
            let val = this.#nums[i];
            await this.#color(i, 'check');
            while (j >= 0 && this.#nums[j] > val) {
                await this.#color(j, 'check');
                this.#nums[j + 1] = this.#nums[j];
                if (j + 1 < i) {
                    this.#updateUI(j + 1);
                }
                await this.#color(j, 'primary');
                j--;
            }
            await this.#color(j+1,'swap');
            this.#nums[j + 1] = val;
            await this.#color2(j+1, i, 'primary');
            this.#updateUI(i);
            this.#updateUI(j + 1);
        }
    }

    #hueRange(left, right) {
        for (let i = left; i <= right; i++) {
            this.#simCols[i].className = 'val-sim hue primary';
        }
    }
    #unhueRange(left, right) {
        for (let i = left; i <= right; i++) {
            this.#simCols[i].className = 'val-sim primary'
        }
    }
    async #_quickSort(left, right) {
        if (left >= right || left < 0) {
            return;
        }
        this.#unhueRange(left, right);
        let smallIndex = left - 1;
        let j = left;
        await this.#color(right, 'pivot');
        while (j < right) {
            await this.#color(j, 'check');

            if (this.#nums[j] < this.#nums[right]) {
                smallIndex++;
                this.#swap(smallIndex, j);
                this.#updateUI(smallIndex);
                this.#updateUI(j);
                await this.#color2(smallIndex, j, 'swap');

                await this.#color(smallIndex, 'primary');
            }
            await this.#color(j, 'primary');
            j++;
        }
        //insert pivot
        smallIndex++;
        await this.#color(smallIndex, 'pivot');

        this.#swap(smallIndex, right);
        this.#updateUI(smallIndex);
        this.#updateUI(right);
        await this.#color2(smallIndex, right, 'primary');
        this.#hueRange(left, right);
        await this.#_quickSort(left, smallIndex - 1);
        await this.#_quickSort(smallIndex + 1, right);
    }

    async quickSort() {
        console.log(this.#nums);
        let n = this.#nums.length;
        this.#hueRange(0, n - 1);
        await this.#_quickSort(0, n - 1);
        this.#unhueRange(0, n - 1);
        console.log(this.#nums);
    }

    // #merge(left, mid, right) {
    //     let arr = [];
    //     let a = left, b = mid + 1;
    //     while (a <= mid && b <= right) {
    //         if (this.#nums[a] < this.#nums[b]) {
    //             arr.push(this.#nums[a++]);
    //         } else {
    //             arr.push(this.#nums[b++]);
    //         }
    //     }
    //     while (a <= mid) {
    //         arr.push(this.#nums[a++]);
    //     }
    //     while (b <= right) {
    //         arr.push(this.#nums[b++]);
    //     }

    //     for (let j = 0; j <= arr.length; j++) {
    //         this.#nums[left + j] = arr[j];
    //     }
    // }



    async #merge(left, mid, right) {
        let arr = [];
        let a = left, b = mid + 1;
        while (a <= mid && b <= right) {
            if (this.#nums[a] < this.#nums[b]) {
                arr.push(this.#nums[a++]);
            } else {
                arr.push(this.#nums[b++]);
            }
        }
        while (a <= mid) {
            arr.push(this.#nums[a++]);
        }
        while (b <= right) {
            arr.push(this.#nums[b++]);
        }
        for (let i = 0; i < arr.length; i++) {
            this.#nums[left + i] = arr[i];
            await this.#color(left+i, 'check');
            this.#updateUI(left+i);
            await this.#color(left+i, 'primary');
        }
    }

    async #_mergeSort(left, right) {
        if (left >= right) {
            return;
        }
        let mid = Math.floor((left + right) / 2);
        this.#hueRange(left, right);
        this.#unhueRange(left, mid);
        await this.#_mergeSort(left, mid);
        this.#hueRange(left, right);
        this.#unhueRange(left, mid);
        await this.#_mergeSort(mid + 1, right);
        await this.#merge(left, mid, right);
    }
    async mergeSort() {
        let n = this.#nums.length;
        this.#_mergeSort(0, n - 1);
    }
}

var sortSimulator = new SortSimulator();
// sortSimulator.generateArray([140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
sortSimulator.generateRandomArray();
sortSimulator.mergeSort();

