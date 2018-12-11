export function shuffle(arr) {
    let length = arr.length;
    for (const [index, value] of arr.entries()) {
        let random = Math.floor(Math.random() * length);
        let temp = value;
        arr[index] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

module.exports = shuffle;