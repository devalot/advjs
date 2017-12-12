let something = {
  [Symbol.iterator]: function() {
    let n = 0;

    return {
      next: () => ({value: n, done: n++ >= 10}),
    };
  },
};

for (let x of something) {
  console.log(x);
}
