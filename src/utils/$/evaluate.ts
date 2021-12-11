import { add, sub, multip, division } from './math';

/**
 * @function 精准数学运算
 * @param math 数学表达式
 * @example evaluate('0.1 + 0.2')  => 输入: 0.3
 */
const evaluate = (math: string): number => {
  let formulaArray = __stringToArray(math);
  let number = __arrayToNumber(formulaArray)
  return number;
}

type IType = '+' | '-' | '*' | '/';
type ICell = Array<ICell> | IType | number;
const __stringToArray = (str: string): ICell[] => {
  let arr = str.replace(/\s*/g, '').split('');
  let formula = [];
  let indexes = 0;        // 索引，指向当前数组
  let n = '';
  arr.map((s, i) => {
    if (s === '(') {
      __currentFormula(formula, indexes).push([]);
      indexes++;
    } else if (s === ')') {
      n && __currentFormula(formula, indexes).push(Number(n));
      n = ''
      indexes--;
    } else if (i === arr.length - 1) {
      __currentFormula(formula, indexes).push(Number(n ? n + s : s));
    } else if (s === '.') {
      n += s;
    } else if (Number.isNaN(Number(n + s))) {
      n && __currentFormula(formula, indexes).push(Number(n));
      __currentFormula(formula, indexes).push(s);
      n = '';
    } else {
      n += s;
    }
  });

  return formula;
}

const __types = ['*', '/', '+', '-'];
const __getFn = (str: IType) => ({ '+': add, '-': sub, '*': multip, '/': division })[str];
const __arrayToNumber = (formula: Array<ICell>): any => {
  if (formula.some(f => Array.isArray(f))) {
    formula.map((f, i) => {
      if (Array.isArray(f)) {
        formula[i] = __arrayToNumber(f);
      }
    });
  }
  let times = formula.reduce<number>((t, f: any) => t += __types.includes(f) ? 1 : 0, 0);
  for (let i = 0; i < times; i++) {
    let index = formula.reduce<number>((i, c: any, idx) => { i = ['*', '/', '^'].includes(c) ? idx : i; return i; }, 1);
    let num = __getFn(formula[index] as IType)(formula[index - 1] as number, formula[index + 1] as number);
    formula.splice(index - 1, 3, num)
  }
  return formula[0];
};

const __currentFormula = (formula, index): any[] => {
  let current = formula;
  for (let i = 0; i < index; i++) {
    current = current[current.length - 1];
  }
  return current;
}


export default evaluate;