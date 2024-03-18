export async function generateCombinations(data: any) {
  const result: any = [];
  const stack: any = [];

  function backtrack(index: number) {
    if (index === data.length) {
      result.push({
        id: Math.floor(Math.random() * 999999),
        price: 0,
        salePrice: 0,
        combinations: stack.slice(), // Copy the stack
      });
      return;
    }

    for (const variant of data[index].values) {
      stack.push({
        variant: variant.variant,
        id: variant.id,
        parentName: data[index].title,
      });
      backtrack(index + 1);
      stack.pop();
    }
  }

  backtrack(0);
  return result;
  // if (currentCombination === null) {
  //   currentCombination = [];
  // }

  // if (combinations === null) {
  //   combinations = [];
  // }

  // if (index === data.length) {
  //   await combinations.push({
  //     currentCombination,
  //     id: Math.floor(Math.random() * 999999999),
  //     price: 0,
  //     salePrice: 0,
  //   });
  //   return;
  // }

  // for (let value of data[index].values) {
  //   currentCombination.push(value);
  //   await generateCombinations(
  //     data,
  //     currentCombination,
  //     index + 1,
  //     combinations
  //   );
  //   currentCombination.pop();
  // }

  // return combinations;
}
