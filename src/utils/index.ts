/**
 * 检测类型
 * @param {any} target 检测的目标
 * @returns {'string'|'number'|'array'|'boolean'|'object'|'function'|'null'|'undefined'|'regexp'|'promise'} 只枚举一些常用的类型
 */
export function checkType(target: unknown): string {
  const value = Object.prototype.toString.call(target);
  const matchValue = value.match(/\[object (\S*)\]/);
  const result = matchValue ? matchValue[1] : 'unknown';
  return result.toLocaleLowerCase();
}

/**
 * 修改属性值-只修改之前存在的值
 * @param {object} target 修改的目标
 * @param {object} value 修改的内容
 */
export function modiflyData<T>(target: T, value: T) {
  if (checkType(target) == 'object' && checkType(value) == 'object') {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        if (checkType(target[key]) == 'object') {
          modiflyData(target[key], value[key]);
        } else {
          target[key] = value[key];
        }
      }
    }
  }
}

/**
 * 格式化日期
 * @param {string | number | Date} value 指定日期
 * @param {string} format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, 'h:m:s');
 * formatDate(1603264465956, 'Y-M-D');
 * formatDate(1603264465956, 'Y年-M月-D日');
 * ```
 */
export function formatDate(
  value: string | number | Date = Date.now(),
  format: string = 'Y-M-D h:m:s'
): string {
  // ios 和 mac 系统中，带横杆的字符串日期是格式不了的，这里做一下判断处理
  if (value == null || value == undefined) {
    return '';
  }
  if (
    typeof value === 'string' &&
    new Date(value).toString() === 'Invalid Date'
  ) {
    value = value.replace(/-/g, '/');
  }
  const formatNumber = (n: number) => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ['Y', 'M', 'D', 'h', 'm', 's'];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

//获取当前url
export function getRootUrl(): string {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  return `${protocol}//${hostname}${port ? ':' + port : ''}/#/`;
}

//生成长度为11的随机字母数字字符串
export function randomStr(): string {
  return Math.random().toString(36).substring(2);
}

export function jsonToFormData (params: object) : string {
  let str = ''
  for (const key in params) {
    str += `&${key}=${params[key]}`
  }
  return str.slice(1)
}
//防抖
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as T;
}
/**
 * 生成随机数值
 * @param bit 
 * @returns 
 */
export function randomNum(bit: number = 5): number {
	return Math.floor(Math.random() * Math.pow(10, bit))
}