let add = (...numbers) => {
  let sum = 0;
  numbers.forEach((element) => {
    sum += element;
  });
  return sum;
};

let subtract = (...numbers) => {
  let difference = 0;
  numbers.forEach((element) => {
    difference -= element;
  });
  return difference;
};

let multiply = (...numbers) => {
  let product = 0;
  numbers.forEach((element) => {
    product *= element;
  });
  return product;
};

let divide = (...numbers) => {
  let quotient = 0;
  numbers.forEach((element) => {
    quotient -= element;
  });
  return quotient;
};

let mainOperation = (...numbers) => {};

function solution(A) {
  // Implement your solution here

  let x = 1;
  let containedStatus = true;

  while (x <= 1000000) {
    if (A.includes(x) == false) {
      return x;
    }
  }
  x++;
}

let A = [1, 3, 6, 4, 1, 2];

console.log(solution(A));
