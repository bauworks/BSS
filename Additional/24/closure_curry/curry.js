// non Curry
console.log("<< non Curry >>")
const add = (x, y) => x + y
console.log( add(2, 3) ) // 5


// Curry
console.log("<< Curry >>")
const curry_add = x => y => x + y
console.log( curry_add(2)(3) )  // 5


console.log("<< Curry usecase>>")
curry_add1 = curry_add(2)
console.log( curry_add1(3) )     // 5
console.log( curry_add1(10) )    // 12
console.log( curry_add1(48) )    // 50
