const assert = require('assert');
const normalizeFunctions = require('../src/utils/varsNormalize');


const runTests = (tests = [], func) => {
  tests.forEach(config => {

    it(config.name, () => {
      // console.log(func(...config.args));
      assert.equal(
        config.wrapFunc ? config.wrapFunc(func(...config.args)) : func(...config.args),
        config.result
      );
    });

  });
};


const validateValueNumberTests = [
  {
    name: 'Test 1 - 22, "number" (true)',
    args: [22, 'number'],
    result: true
  },
  {
    name: 'Test 2 - "22", "number" (true)',
    args: ['22', 'number'],
    result: true
  },
  {
    name: 'Test 3 - -827, "number" (true)',
    args: [-827, 'number'],
    result: true
  },
  {
    name: 'Test 4 - "-827", "number" (true)',
    args: ['-827', 'number'],
    result: true
  },
  {
    name: 'Test 5 - 0.8736, "number" (true)',
    args: [0.8736, 'number'],
    result: true
  },
  {
    name: 'Test 6 - "0.8736", "number" (true)',
    args: ['0.8736', 'number'],
    result: true
  },
  {
    name: 'Test 7 - -0.8736, "number" (true)',
    args: [-0.8736, 'number'],
    result: true
  },
  {
    name: 'Test 8 - "-0.8736", "number" (true)',
    args: ['-0.8736', 'number'],
    result: true
  },
  {
    name: 'Test 9 - .1, "number" (true)',
    args: [.1, 'number'],
    result: true
  },
  {
    name: 'Test 10 - ".1", "number" (true)',
    args: ['.1', 'number'],
    result: true
  },
  {
    name: 'Test 11 - .010, "number" (true)',
    args: [.010, 'number'],
    result: true
  },
  {
    name: 'Test 12 - ".010", "number" (true)',
    args: ['.010', 'number'],
    result: true
  },
  {
    name: 'Test 13 - -.010, "number" (true)',
    args: [-.010, 'number'],
    result: true
  },
  {
    name: 'Test 14 - "-.010", "number" (true)',
    args: ['-.010', 'number'],
    result: true
  },
  {
    name: 'Test 15 - "", "number" (false)',
    args: ['', 'number'],
    result: false
  },
  {
    name: 'Test 16 - NaN, "number" (false)',
    args: [NaN, 'number'],
    result: false
  },
  {
    name: 'Test 17 - false, "number" (false)',
    args: [false, 'number'],
    result: false
  },
  {
    name: 'Test 18 - true, "number" (false)',
    args: [true, 'number'],
    result: false
  },
  {
    name: 'Test 19 - undefined, "number" (false)',
    args: [undefined, 'number'],
    result: false
  },
  {
    name: 'Test 20 - "string", "number" (false)',
    args: ['string', 'number'],
    result: false
  },
  {
    name: 'Test 21 - ".a", "number" (false)',
    args: ['.a', 'number'],
    result: false
  },
  {
    name: 'Test 22 - "-O", "number" (false)',
    args: ['-O', 'number'],
    result: false
  },
  {
    name: 'Test 23 - ".12-", "number" (false)',
    args: ['.12-', 'number'],
    result: false
  },
  {
    name: 'Test 24 - 20.0001, "number", { min: 20 } (true)',
    args: [20.0001, 'number', { min: 20 }],
    result: true
  },
  {
    name: 'Test 24 - 19.99999, "number", { min: 20 } (false)',
    args: [19.99999, 'number', { min: 20 }],
    result: false
  },
  {
    name: 'Test 25 - "20.0001", "number", { min: 20 } (true)',
    args: ['20.0001', 'number', { min: 20 }],
    result: true
  },
  {
    name: 'Test 26 - "19.99999", "number", { min: 20 } (false)',
    args: ['19.99999', 'number', { min: 20 }],
    result: false
  },
  {
    name: 'Test 27 - -178.33, "number", { max: 1932 } (true)',
    args: [-178.33, 'number', { max: 1932 }],
    result: true
  },
  {
    name: 'Test 28 - 19923, "number", { max: 1932 } (false)',
    args: [19923, 'number', { max: 1932 }],
    result: false
  },
  {
    name: 'Test 29 - "-178.33", "number", { max: 1932 } (true)',
    args: ['-178.33', 'number', { max: 1932 }],
    result: true
  },
  {
    name: 'Test 30 - "19923", "number", { max: 1932 } (false)',
    args: ['19923', 'number', { max: 1932 }],
    result: false
  },
  {
    name: 'Test 31 - 2.323, "number", { max: 2.323, min: 2.323 } (true)',
    args: [2.323, 'number', { max: 2.323, min: 2.323 }],
    result: true
  },
  {
    name: 'Test 32 - 2.323, "number", { max: -2.323, min: 12.323 } (false)',
    args: [2.323, 'number', { max: -2.323, min: 12.323 }],
    result: false
  },
  {
    name: 'Test 33 - "-11", "number", { max: -2.323, min: -12.323 } (true)',
    args: ['-11', 'number', { max: -2.323, min: -12.323 }],
    result: true
  },
  {
    name: 'Test 34 - "-999", "number", { max: 10, min: 0 } (false)',
    args: ['-999', 'number', { max: 10, min: 0 }],
    result: false
  },
  {
    name: 'Test 35 - 5e3, "number", { max: 5e3, min: -5e3 } (true)',
    args: [5e3, 'number', { max: 5e3, min: -5e3 }],
    result: true
  },
  {
    name: 'Test 36 - "-5e3", "number", { max: "11e3", min: -5e2 } (false)',
    args: ['-5e3', 'number', { max: '11e3', min: -5e2 }],
    result: false
  },
  {
    name: 'Test 37 - 0x323, "number", { max: 0x333, min: 0x313 } (true)',
    args: [0x323, 'number', { max: 0x333, min: 0x313 }],
    result: true
  },
  {
    name: 'Test 38 - "0x377", "number", { max: 0x666, min: "0x555" } (false)',
    args: ['0x377', 'number', { max: 0x666, min: '0x555' }],
    result: false
  },
  {
    name: 'Test 39 - 07777, "number", { max: 077772, min: -07777 } (true)',
    args: [07777, 'number', { max: 077772, min: -07777 }],
    result: true
  },
  {
    name: 'Test 40 - "-0023377", "number", { max: -0073234, min: -0073734 } (false)',
    args: ['-0023377', 'number', { max: '-0073234', min: '-0073734' }],
    result: false
  }
];


const testGeneratorsParams = {
  number: {
    mockIntegersAmount: 2,
    mockFloatsAmount: 2
  }
}

// unsigned
function getRandFloat() {
  let exp = Math.floor(Math.random() * 18);
  if (Math.floor(Math.random() * 10 + 1) > 5) {
    exp = exp * -1;
  }
  let randNum = Math.random() * Number('1e' + exp);
  return randNum;
}

// unsigned
function getRandInteger() {
  let exp = Math.floor(Math.random() * 18);
  let randNum = Math.random() * Number('1e' + exp);
  return Math.floor(randNum);
}


function getTestsForNumber() {
  const params = testGeneratorsParams.number;
  const randomValues = [];
  const tests = [];

  // random integers
  for (let i = 0; i < params.mockIntegersAmount; i++) {
    randomValues.push(getRandInteger());
  }
  // random floats
  for (let i = 0; i < params.mockFloatsAmount; i++) {
    randomValues.push(getRandFloat());
  }

  // true
  for (let i = 0; i < randomValues.length; i++) {
    for (let j = 0; j < 2 ; j++) {
      for (let k = 0; k < 2 ; k++) {
        const test = {};
        const multiplier = j ? -1 : 1;
        test.args = k
          ? [String(Number(randomValues[i] * multiplier)), 'number']
          : [Number(randomValues[i] * multiplier), 'number'];
        test.result = true;
        const argStr = k
          ? '"' + Number(randomValues[i] * multiplier) + '"'
          : Number(randomValues[i] * multiplier);
        test.name =
          'Test ' + (tests.length + 1) +
          ', args: [' + argStr +
          ', "number"], expect: true';
        tests.push(test);
      }
    }
  }

  return tests;
}


const run = () => {
  describe('#argsNormalize.validateValue()', () => {
    runTests(validateValueNumberTests, normalizeFunctions.validateValue);
  });
  describe('#argsNormalize.validateValue() - generated', () => {
    runTests(getTestsForNumber(), normalizeFunctions.validateValue);
  });
};


module.exports = run;
