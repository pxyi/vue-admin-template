/**
 * @method 加法运算
 */
export const add = (num1: number, num2: number): number => {
  let len1 = `${num1}`.split('.')[1]?.length || 0;
  let len2 = `${num2}`.split('.')[1]?.length || 0;
  let base = Math.pow(10, Math.max(len1, len2));
  return (num1 * base + num2 * base) / base;
}

/**
 * @method 减法运算
 */
export const sub = (num1: number, num2: number): number => {
  let len1 = `${num1}`.split('.')[1]?.length || 0;
  let len2 = `${num2}`.split('.')[1]?.length || 0;
  let base = Math.pow(10, Math.max(len1, len2));
  let precision = (len1 >= len2) ? len1 : len2;
  return Number(((num1 * base - num2 * base) / base).toFixed(precision));
}

/**
 * @method 乘法运算
 */
export const multip = (num1: number, num2: number): number => {
  let base = 0;
  base += `${num1}`.split('.')[1]?.length || 0;
  base += `${num2}`.split('.')[1]?.length || 0;
  return Number(`${num1}`.replace('.', '')) * Number(`${ num2 }`.replace('.', '')) / Math.pow(10, base);
}


/**
 * @method 除法运算
 */
export const division = (num1: number, num2: number): number => {
  let len1 = `${num1}`.split('.')[1]?.length || 0;
  let len2 = `${num2}`.split('.')[1]?.length || 0;
  let base3 = Number(`${num1}`.replace('.', ''));
  let base4 = Number(`${num2}`.replace('.', ''));
  return (base3 / base4) * Math.pow(10, len2 - len1);
}

export const toChines = (num: number) => {
  if (!/^\d*(\.\d*)?$/.test(`${num}`)) { return "Number is wrong!"; }
  let AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let BB = ['', '十', '百', '千', '万', '亿', '点', ''];
  let a = `${num}`.replace(/(^0*)/g, '').split('.'),
      k = 0,
      re = '';
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != '0' && a[0].charAt(i + 1) == '0') { re = AA[0] + re };
    if (a[0].charAt(i) != '0') { re = AA[a[0].charAt(i)] + BB[k % 4] + re };
    k++;
  }
  if (a.length > 1) {
    re += BB[6];
    for (var i = 0; i < a[1].length; i++) { re += AA[a[1].charAt(i)] };
  }
  return re;
};


import evaluate from './evaluate';

export default { add, sub, multip, division, evaluate }