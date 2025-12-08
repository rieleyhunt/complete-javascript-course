'use strict';

// SHALLOW VS DEEP COPY

const jessica = {
    firstName: "Jessica",
    lastName: "Hunt",
    age: 24,
    friends: ["David", "Janice"]
}

const jessicaShallowCopy = {...jessica};

jessicaShallowCopy.friends.push("John");

console.log(jessica);
console.log(jessicaShallowCopy);

const jessicaDeepCopy = structuredClone(jessica);

jessicaDeepCopy.friends.push("Maria");

console.log("structured clone/deep copy:",jessicaDeepCopy);


// The this keyword...?

const myFunction = function() {
    const people = ["Jessica", "Albert"];
    const x = 2;

    console.log(this);
}


const myFunction2 = (value) => {
    const people = ["Jessica", "Albert"];
    const x = value;
    console.log(this);
}


myFunction();
myFunction2();