Array.prototype.select_three = function (n) {
  return this.filter((_, i) => i >= n - 1 && i <= n + 1);
};

Array.prototype.shuffle = function () {
  return this.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
