
import { createElement } from "./createVDom";

const ele = createElement('div', { id: 'app' }, [
  createElement('p', {}, ['VirtualDom']),
  createElement('ul', { class: 'ul' }, [
    createElement('li', { class: 'item' }, ['Item1']),
    createElement('li', { class: 'item' }, ['Item2']),
    createElement('li', { class: 'item' }, ['Item3']),
  ]),
  createElement('div', {}, ['Hello World'])
])

console.log(ele);