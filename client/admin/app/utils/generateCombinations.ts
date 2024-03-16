export function generateCombinations(
  data: any,
  currentCombination: any = [],
  index = 0,
  combinations: any = []
) {
  if (currentCombination === null) {
    currentCombination = [];
  }

  if (combinations === null) {
    combinations = [];
  }

  if (index === data.length) {
    combinations.push([...currentCombination]);
    return;
  }

  for (let value of data[index].values) {
    currentCombination.push({ price: 0, salePrice: 0, ...value });
    generateCombinations(data, currentCombination, index + 1, combinations);
    currentCombination.pop();
  }

  return combinations;
}
