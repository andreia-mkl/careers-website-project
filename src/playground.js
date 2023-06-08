const axios = require('axios');

const url = 'http://localhost:3000/jobs';

axios.get(url).then((response) => {
  response.data;
});

// COLLAPSIBLE ACCORDION.vue
// OPTIONS API VERSION
// props: {
//   header: {
//     type: String,
//     required: true
//   }
// },
// data() {
//   return {
//     isOpen: false
//   };
// },
// computed: {
//   caretIcon() {
//     return this.isOpen ? ['fas', 'angle-up'] : ['fas', 'angle-down'];
//   }
// },
// methods: {
//   open() {
//     this.isOpen = !this.isOpen;
//   }
// }

export function countCheckerboard2(width, height, resolution) {
  // All inputs are BigInts

  let checkerboard = [];
  for (let i = 0; i < height; i++) {
    checkerboard.push([]);
    let blackSquare = 0;
    for (let j = 0; j < width; j++) {
      if ((j < resolution && i < resolution) || blackSquare >= resolution) {
        checkerboard[i].push(0);
      } else {
        checkerboard[i].push(1);
        blackSquare++;
        if (blackSquare === resolution) {
          blackSquare = 0;
        }
      }
    }
  }
  console.log(checkerboard);

  return (width * height) / 2n; // Easy solution?
}

export function countCheckerboard(width, height, resolution) {
  // All inputs are BigInts

  let checkerboard = [];
  let isWhiteSquare = true;

  for (let i = 0; i < height; i++) {
    checkerboard.push([]);
    for (let j = 0; j < width; j++) {
      if (isWhiteSquare) {
        checkerboard[i].push(0);
      } else {
        checkerboard[i].push(1);
      }

      if (BigInt(i + 1) % resolution === 0n && BigInt(j + 1) % resolution === 0n) {
        isWhiteSquare = !isWhiteSquare;
      }
    }
    if (height % resolution !== 0n) {
      isWhiteSquare = !isWhiteSquare;
    }
  }
  console.log(checkerboard);

  return (width * height) / 2n; // Easy solution?
}

function countCheckerboard(width, height, resolution) {
  // All inputs are BigInts

  // let checkerboard = [];
  let counter = 0;
  for (let i = 0; i < width; i++) {
    // checkerboard.push([]);
    for (let j = 0; j < height; j++) {
      const isWhiteSquare =
        Math.floor(i / parseInt(resolution)) % 2 === Math.floor(j / parseInt(resolution)) % 2;
      if (!isWhiteSquare) {
        counter++;
      }
      // checkerboard[i].push(isWhiteSquare ? 0 : 1);
    }
  }

  return counter;
}

function countCheckerboard(width, height, resolution) {
  // All inputs are BigInts
  // this was correct, but timed out:
  // let checkerboard = [];
  let counter = 0n;
  for (let i = 0; i < parseInt(width); i++) {
    // checkerboard.push([]);
    for (let j = 0; j < parseInt(height); j++) {
      const isWhiteSquare =
        Math.floor(i / parseInt(resolution)) % 2 === Math.floor(j / parseInt(resolution)) % 2;
      if (!isWhiteSquare) {
        counter++;
      }
      // checkerboard[i].push(isWhiteSquare ? 0 : 1);
    }
  }

  return counter;
}

function stringExpansion(s) {
  // Good luck!
  const hasNumber = /\d/;
  if (!hasNumber.test(s)) return s;
  let temp = '';

  for (let i = 0; i < s.length; i++) {
    if ((!isNaN(s[i]) && isNaN(s[i + 1])) || (isNaN(s[i]) && isNaN(s[i + 1]))) {
      temp += s[i];
    }

    if (isNaN(s[i]) && !isNaN(s[i + 1])) {
      temp += s[i] + '-';
    }
  }

  let tempArr = temp.split('-');
  let result = '';
  for (let j = 0; j < tempArr.length; j++) {
    let substring = '';
    if (!hasNumber.test(tempArr[j])) {
      result += tempArr[j];
    }
    substring = tempArr[j].substring(1);

    for (let k = 0; k < substring.length; k++) {
      if (!isNaN(tempArr[j][0])) {
        result += substring[k].repeat(tempArr[j][0]);
      }
    }
  }

  return result;
}
