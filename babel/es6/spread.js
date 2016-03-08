/******************************************************************************/
// <<: Calling a function.
function sum(a, b, c, d) {
  return a + b + c + d;
}

var values = [1, 2, 3, 4],
    result = sum(...values);

console.log(result); // 10
// :>>

/******************************************************************************/
// <<: In arguments.
function sum2(...values) {
  return values.reduce((a, e) => a + e, 0);
}

console.log(sum2(1, 2, 3, 4)); // 10
// :>>
