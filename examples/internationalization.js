// See:
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
//
// http://www.ecma-international.org/publications/standards/Ecma-402.htm

// Numbers and currency:
var n = 123456.78;

var formatted = new Intl.NumberFormat().format(n);
console.log(formatted);

var currency = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
}).format(n);

console.log(currency);
