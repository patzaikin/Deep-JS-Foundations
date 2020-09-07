// In this exercise, you will define a `findAll(..)` function that searches an array and returns an array with all coercive matches.

// ## Instructions

// 1. The `findAll(..)` function takes a value and an array. It returns an array.

// 2. The coercive matching that is allowed:

// 	- exact matches (`Object.is(..)`)
// 	- strings (except "" or whitespace-only) can match numbers
// 	- numbers (except `NaN` and `+/- Infinity`) can match strings (hint: watch out for `-0`!)
// 	- `null` can match `undefined`, and vice versa
// 	- booleans can only match booleans
// 	- objects only match the exact same object

// TODO: write `findAll(..)`
function findAll(match, array) {
  let result = [];
  for (let el of array) {
    if (Object.is(match, el)) {
      result.push(el);
    } else if (match == null && el == null) {
      result.push(el);
    } else if (typeof match === "boolean" && match === el) {
      result.push(el);
    } else if (typeof match === "string" && match.trim() !== "" && typeof el === "number" && !Object.is(-0, el)) {
      if (match == el) {
        result.push(el);
      }
    } else if (
      typeof match === "number" &&
      !Object.is(match, -0) &&
      typeof el === "string" &&
      el.trim() !== "" &&
      !Object.is(match, NaN) &&
      !Object.is(match, Infinity) &&
      !Object.is(match, -Infinity)
    ) {
      if (match == el) {
        result.push(el);
      }
    }
  }

  return result;
}

// tests:
var myObj = { a: 2 };

var values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  "",
  "0",
  "42",
  "42hello",
  "true",
  "NaN",
  true,
  false,
  myObj,
];

console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
console.log(setsMatch(findAll(0, values), [0, "0"]) === true);
console.log(setsMatch(findAll(-0, values), [-0]) === true);
console.log(setsMatch(findAll(13, values), [13]) === true);
console.log(setsMatch(findAll(42, values), [42, "42"]) === true);
console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll("", values), [""]) === true);
console.log(setsMatch(findAll("0", values), [0, "0"]) === true);
console.log(setsMatch(findAll("42", values), [42, "42"]) === true);
console.log(setsMatch(findAll("42hello", values), ["42hello"]) === true);
console.log(setsMatch(findAll("true", values), ["true"]) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(0, values), [0, -0]) === false);
console.log(setsMatch(findAll(42, values), [42, "42hello"]) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false);
console.log(setsMatch(findAll("", values), ["", 0]) === false);
console.log(setsMatch(findAll("false", values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, "true"]) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);

// ***************************

function setsMatch(arr1, arr2) {
  if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
