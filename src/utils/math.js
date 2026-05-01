function average(numbers) {
  const total = numbers.reduce((sum, value) => sum + value, 0);
  return Math.round(total / numbers.length);
}

function percentage(part, whole) {
  return (part / whole) * 100;
}

module.exports = {
  average,
  percentage
};
