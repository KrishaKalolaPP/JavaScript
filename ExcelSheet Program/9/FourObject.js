const originalObj = {
  name: "Alice",
  age: 25,
  country: "India",
  profession: "Engineer"
};
const obj1 = {
  name: originalObj.name
};

const obj2 = {
  age: originalObj.age
};

const obj3 = {
  country: originalObj.country,
  profession: originalObj.profession
};

console.log(obj1)
console.log(obj2)
console.log(obj3)
