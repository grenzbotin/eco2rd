function generateRandomNumber(maxLimit = 27876813146) {
  const rand = Math.random() * maxLimit;
  return Math.floor(rand);
}

const generateYear = (months: number) => {
  const year = {};

  for (let i = 0; i < months; i++) {
    const total = generateRandomNumber();
    const green = generateRandomNumber(total);
    year[i] = { green, total };
  }

  return year;
};

const historicalMock = {
  2021: generateYear(12),
  2022: generateYear(6)
};

export default historicalMock;
