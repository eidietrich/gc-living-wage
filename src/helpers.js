
import {format} from 'd3-format';

export const annualFormat = format('$,.0f');
export const hourlyFormat = format('$,.2f');

export function sentenceCase(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}