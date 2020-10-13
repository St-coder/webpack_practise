import '../css/index.less';
import '../assets/README.md';

function add(x, y) {
  return x + y;
}
const add1 = (x, y) => x + y;

// eslint-disable-next-line
console.log(add(1, 2));

/* eslint-disable */
console.log(add1(111, 2222));
/* eslint-disable */
