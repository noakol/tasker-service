export const calculateSum = (numbers: number[]) => {
  let res = 0;

  numbers.forEach((num) => {
    if (typeof num !== 'number') {
      return null;
    }

    res += num;
  });

  return res;
};

export const concatStr = (strings: string[]) => {
  let res = '';

  strings.forEach((str) => {
    if (typeof str !== 'string') {
      return null;
    }

    res += str;
  });

  return res;
};
