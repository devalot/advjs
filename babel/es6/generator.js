let something = {
  [Symbol.iterator]: function*() {
    for (let i=0; i<10; ++i) {
      yield i;
    }
  },
};

for (let x of something) {
  console.log(x);
}
