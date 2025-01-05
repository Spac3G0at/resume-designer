const alignArraysById = (array1, array2) => {
  // Create a map for quick lookup of items in array2 by their id
  const mapArray2 = new Map(array2.map((item) => [item.id, item]));

  // Generate the aligned array2 based on array1's order
  const alignedArray2 = array1.map((item) => mapArray2.get(item.id));

  // Check if the original array2 is already aligned
  const isAlreadyAligned = alignedArray2.every(
    (item, index) => item.id === array2[index].id
  );

  return isAlreadyAligned ? null : alignedArray2;
};

export default alignArraysById;
