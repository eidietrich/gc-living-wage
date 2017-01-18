
import {format} from 'd3-format';

export const annualFormat = format('$,.0f');
export const hourlyFormat = format('$,.2f');

export function sentenceCase(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function clone(object){
  return JSON.parse(JSON.stringify(object));
}

export function validateNum(string){
  return Number(parseFloat(string)) == string; // Needs to be '==', not '==='!
}

export function objectSum(object){
  // Totals an object (i.e. expenses) across multiple keys}
  let sum = 0;
  Object.keys(object).forEach(function(key){
    sum += +object[key];
  });
  return sum;
}