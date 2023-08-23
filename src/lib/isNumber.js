const isNumber = string => !isNaN(parseFloat(string)) && isFinite(string);
export default isNumber;