/**
 * 检测类型
 * @param {any} target 检测的目标
 * @returns {'string'|'number'|'array'|'boolean'|'object'|'function'|'null'|'undefined'|'regexp'|'promise'} 只枚举一些常用的类型
 */
export function checkType (target: any) : string {
	const value = Object.prototype.toString.call(target)
	const result = value.match(/\[object (\S*)\]/)[1]
	return result.toLocaleLowerCase()
}

/**
 * 修改属性值-只修改之前存在的值
 * @param {object} target 修改的目标
 * @param {object} value 修改的内容
 */
export function modiflyData (target: Object, value: Object) {
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(target, key)) {
			if (checkType(target[key]) == 'object') {
				modiflyData(target[key], value[key])
			} else {
				target[key] = value[key]
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
export function formatDate(value: string | number | Date = Date.now(), format: string = 'Y-M-D h:m:s') {
  // ios 和 mac 系统中，带横杆的字符串日期是格式不了的，这里做一下判断处理
  if (typeof value === 'string' && new Date(value).toString() === 'Invalid Date') {
    value = value.replace(/-/g, '/');
  }
  const formatNumber = n => `0${n}`.slice(-2);
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