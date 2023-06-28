var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var count = 0;

function binarySearch(array, item) {
    var start = 0;
    var end = array.length;
    var middle;
    var found = false;
    var position = -1;
    while (found === false && start <= end) {
        count += 1;
        middle = Math.floor((start + end) / 2);
        if (array[middle] === item) {
            found = true;
            position = middle;
            return position;
        }
        if (item < array[middle]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return position;
}

function recursiveBinarySearch(array, item, start, end) {
    var middle = Math.floor((start + end) / 2);
    count += 1;
    if (item === array[middle]) {
        return middle;
    }
    if (item < array[middle]) {
        return recursiveBinarySearch(array, item, 0, middle - 1);
    } else {
        return recursiveBinarySearch(array, item, middle + 1, end);
    }
}

console.log(recursiveBinarySearch(array, 0, 0, array.length));
console.log(count);
