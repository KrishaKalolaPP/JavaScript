let name = "Alice";        // String
let age = 30;              // Number
let isLoggedIn = true;     // Boolean
let score;                 // Undefined
let salary = null;         // Null
let big = 123456789123456789123456789n;  // BigInt
let sym = Symbol('sym');   // Symbol

let person = { name: "Bob", age: 25 };  // Object
let fruits = ["apple", "banana"];      // Array
function greet() { console.log("Hi"); } // Function
typeof "Hello";      // "string"
typeof 123;          // "number"
typeof null;         // "object" ← quirk of JS
typeof undefined;    // "undefined"
typeof {};           // "object"
typeof [];           // "object"
typeof function(){}; // "function"
typeof NaN ; // number // important!!!!!!!!!!!!!!!!!!!!!!!!!!!!

///dem of clouser
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
;

// console.log(a);
// let a=5;

console.log(Array.isArray([1,2,3])) // use to check is it a array!!!!

const obj = {};
const a = { key: "a" };
const b = { key: "b" };

obj[a] = 123;
obj[b] = 456;

console.log(obj[a]);
