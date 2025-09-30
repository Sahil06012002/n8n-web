let arr = [1, 2, 3];

function callnack(num) {
  return num * 3;
}
function checkMap(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

checkMap(arr, callnack);
