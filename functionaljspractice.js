function isIsogram(text) {
  var wordSet = new Set();
  text.split('').forEach(function(letter) {
  	return wordSet.add(letter.toLowerCase());
  });
  return wordSet.size === text.length;
}

function assertIsEqual(actual, expected, testName){
  if(actual === expected){
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName +
  	'] Expected ' + expected + 
  	' but got ' + actual);
  }
}
var actual = isIsogram('Spinach');
var expected = true;
assertIsEqual(actual, expected, 'it detects whether the word is an isogram');

var actualWithLetterUpcaseLowerCase = isIsogram('Every');
var expectedWithLetterUpcaseLowerCase = false;
assertIsEqual(actualWithLetterUpcaseLowerCase, expectedWithLetterUpcaseLowerCase, 'it detects whether the word is an isogram');

------------

function getUniqueValues(wordOrSentence){
  var lettersOrWords = wordOrSentence.indexOf(' ') ? wordOrSentence.split(' ') : wordOrSentence.split('');
  var uniqueValues = lettersOrWords.filter(function(letter, index, self){
	return self.indexOf(letter) === index;
  });
  return uniqueValues;
}

Array.prototype.countLetter = function(letter){
  var numberOfLetterInstances = 0;
  for(var i = 0; i< this.length;i++){
	if(this[i] === letter) { 
	  numberOfLetterInstances++;
	}
  }
  return numberOfLetterInstances;
}

function getLetterMostRepeatedCount(uniqueValues){
  var letter = '';
  var count = 0;
  for(var i = 0; i< uniqueValues.length; i++){
 	var letterCount = uniqueValues.countLetter(uniqueValues[i]);
 	if(letterCount > count){
 	  letter = uniqueValues[i];
 	  count = letterCount;
 	}
  }
  return count;
} 

function findMaxRepeatCountInWord(word) {
  var uniqueLetters = getUniqueValues(word);
  var maxRepeatCount = getLetterMostRepeatedCount(uniqueLetters);
  return maxRepeatCount;
}

function getWordWithMaxRepeatCount(uniqueWords){
  var maxRepeatCountOverall = 0;
  var wordWithMaxRepeatCount = '';

  for(var i = 0; i< uniqueWords.length; i++){
  	var repeatCountForWord = findMaxRepeatCountInWord(uniqueWords[i]);
 	if(repeatCountForWord > maxRepeatCountOverall){
 	  wordWithMaxRepeatCount = uniqueWords[i];
 	  maxRepeatCountOverall = repeatCountForWord;
 	}
  }
  return wordWithMaxRepeatCount;
}

function findFirstWordWithMostRepeatedChars(text) {
  var uniqueWords = getUniqueValues(text);
  var wordWithMaxRepeatCount = getWordWithMaxRepeatCount(uniqueWords);
  return wordWithMaxRepeatCount;
}

var actual = findFirstWordWithMostRepeatedChars("Hello there all racecars");
var expected = "Hello";
assertEqual(actual, expected, 'it detects that two values are equal');

function assertEqual(actual, expected, testName) {
  if(actual === expected){
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName +
  	'] Expected "' + expected + 
  	'", but got "' + actual + '"');
  }
}
---------------------------------------
var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain beige suede moccasin', price: 950},
      {name: 'plain olive suede moccasin', price: 1050}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800},
      {name: 'black leather laced sneakers', price: 900}
    ]
  }
];

function computeSum(values){
  return values.reduce(function(a,b){
  	return a + b;
  });
}

function computeTotalCost(shoeList){
  var prices = shoeList.map(function(shoe){
	return shoe.price;
  });
  return computeSum(prices);
}

function computeAverageCostOfShoes(goodsByDesigner){
  var shoeList = goodsByDesigner.shoes;
  var totalCost = computeTotalCost(shoeList);
  return totalCost / shoeList.length;
}

function renderAverageShoeCostPerDesigner(inventory){
  return inventory.map(function(goodsByDesigner){
	return {
	  name: goodsByDesigner.name,
	  averagePrice: computeAverageCostOfShoes(goodsByDesigner)
	}	
  });
}

function formatToObjectAverageShoeCostPerDesigner(averageShoeCostPerDesignerArr){
  var inventoryObj = {};
  inventoryObj.designers = averageShoeCostPerDesignerArr;
  return inventoryObj;
}


function assertObjectsEqual(actual, expected, testName){
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName + 
  	'] Expected "' + JSON.stringify(expected) + 
  	'", but got "' + JSON.stringify(actual) + '"');
  }
}
var avgShoeCostPerDesignerObj = formatToObjectAverageShoeCostPerDesigner(renderAverageShoeCostPerDesigner(currentInventory));

var actual = avgShoeCostPerDesignerObj;
var expected = { 
  designers: 
  [ 
  	{ name: 'Brunello Cucinelli', averagePrice: 1025 },
  	{ name: 'Gucci', averagePrice: 850 } 
  ] 
};

assertObjectsEqual(actual, expected, 'it detects that two objects are equal');
---------
#3
var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain beige suede moccasin', price: 950},
      {name: 'plain olive suede moccasin', price: 1050}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800},
      {name: 'black leather laced sneakers', price: 900}
    ]
  }
];

Array.prototype.concatAll = function(){
  var result = [];
  this.forEach(function(arr){
	result.push.apply(result, arr);
  });
  return result;
}

function mapDesignerNameAndShoes(currentInventory){
  return currentInventory.map(function(designer){
    return { 
  	  name: designer.name,
      shoes: designer.shoes.map(function(shoe){
	    return shoe.name + ', ' + shoe.price;
	  })
    }
  });
}
  
function getShoeList(inventory){
  var designerNameAndShoes = mapDesignerNameAndShoes(inventory);
  return designerNameAndShoes.map(function(designer){
	return designer.shoes.map(function(shoe){
	  return designer.name + ', ' + shoe;
    });
  }).concatAll();
}

function getBlackShoesOnly(inventory){
  var shoeList = getShoeList(inventory);
  var blackShoeList = shoeList.filter(function(shoeDescription){
	return shoeDescription.includes('black');
  });
  return blackShoeList;
}

function renderBlackShoesOnly(inventory){
  var blackShoeList = getBlackShoesOnly(inventory);
  return blackShoeList.join('\n');
}

function assertEqual(actual, expected, testName){
  if (actual === expected) {
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName + 
  	'] Expected "' + expected + 
  	'" but got "' + actual + '"');
  }
}

function assertArraysEqual(actual, expected, testName){
  var lengthsAreEqual = expected.length === actual.length;
  var elementsAreEqual = actual.every((num, index) => num === expected[index]);
  if(lengthsAreEqual && elementsAreEqual){
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName + 
  	'] Expected "' + expected + 
  	'" but got "' + actual + '"');
  }
}

var actualNums = [[1, 2], [3, 4]].concatAll();
var expectedNums = [1, 2, 3, 4];
assertArraysEqual(actualNums, expectedNums, 'it detects that two array are equal');

var actualCatalogue = renderBlackShoesOnly(currentInventory);
var expectedCatalogue = 'Brunello Cucinelli, tasselled black low-top lace-up, 1000\nGucci, black leather laced sneakers, 900';

assertEqual(actualCatalogue, expectedCatalogue, 'it detects that two arrays are equal');

------------------
#4
var currentInventory = [
  {
    name: 'Brunello Cucinelli',
    shoes: [
      {name: 'tasselled black low-top lace-up', price: 1000},
      {name: 'tasselled green low-top lace-up', price: 1100},
      {name: 'plain beige suede moccasin', price: 950},
      {name: 'plain olive suede moccasin', price: 1050}
    ]
  },
  {
    name: 'Gucci',
    shoes: [
      {name: 'red leather laced sneakers', price: 800},
      {name: 'black leather laced sneakers', price: 900}
    ]
  }
];

Array.prototype.concatAll = function(){
  var result = [];
  this.forEach(function(arr){
	result.push.apply(result, arr);
  });
  return result;
}

function mapDesignerNameAndShoes(inventory){
  return inventory.map(function(designer){
    return { 
  	  name: designer.name,
      shoes: designer.shoes.map(function(shoe){
	    return shoe.name + ', ' + shoe.price;
	  })
    }
  });
}
  
function renderShoeList(inventory){
  var designerNameAndShoes = mapDesignerNameAndShoes(inventory);
  return designerNameAndShoes.map(function(designer){
	return designer.shoes.map(function(shoe){
	  return designer.name + ', ' + shoe;
    });
  }).concatAll();
}		

function renderShoeDescriptionsOnly(inventory){
  var shoeList = renderShoeList(inventory);
  shoeList = shoeList.map( shoe => shoe.split(', ')[1] );
  var lacedShoesOnly = shoeList.filter(function(shoe){
    return shoe.includes('lace');
  });
  return lacedShoesOnly;
}

function computeWordIndexArray(shoeDescription){
  var shoeDescriptionWords = shoeDescription.split(' ');
  return shoeDescriptionWords.map(function(word){
    if (word.includes('lace')) { 
	  return shoeDescriptionWords.indexOf(word);
	}
  });
}

function filterForTargetWordsIndex(shoeDescription){
  var targetWordIndexArr = computeWordIndexArray(shoeDescription);
  return targetWordIndexArr.filter( word => word)[0]
}

function renderLacedShoeDescriptions(inventory){
  var lacedShoesOnly = renderShoeDescriptionsOnly(inventory);
  return lacedShoesOnly.map(function(shoeDescription){
    return {
	'nameWords': shoeDescription.split(' '),
	'targetWordIndex': filterForTargetWordsIndex(shoeDescription)
    }
  });
}

function assertArraysEqual(actual, expected, testName){
  var lengthsAreEqual = expected.length === actual.length;
  var elementsAreEqual = actual.every((num, index) => num === expected[index]);
  if(lengthsAreEqual && elementsAreEqual){
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName + 
  	'] Expected "' + expected + 
  	'" but got "' + actual + '"');
  }
}

var actualNums = [[1, 2], [3, 4]].concatAll();
var expectedNums = [1, 2, 3, 4];
assertArraysEqual(actualNums, expectedNums, 'it detects that two array are equal');

function assertObjectsEqual(actual, expected, testName){
  var lengthsAreEqual = expected.length === actual.length;
  var elementsAreEqual = actual.every((obj, index) => JSON.stringify(obj) === JSON.stringify(expected[index]));
  if(lengthsAreEqual && elementsAreEqual){
  	console.log('passed');
  } else {
  	console.log('FAILED [' + testName + 
  	'] Expected "' + expected + 
  	'" but got "' + actual + '"');
  }
}

var actual = renderLacedShoeDescriptions(currentInventory);
var expected = [
  {
    "nameWords": [
      "tasselled",
      "black",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "tasselled",
      "green",
      "low-top",
      "lace-up"
    ],
    "targetWordIndex": 3
  },
  {
    "nameWords": [
      "red",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  },
  {
    "nameWords": [
      "black",
      "leather",
      "laced",
      "sneakers"
    ],
    "targetWordIndex": 2
  }
];
assertObjectsEqual(actual, expected, 'it detects that two objects are equal');


----



function assert(expectedBehavior, descriptionOfCorrectBehavior) {
  if (!expectedBehavior) {
    console.log(descriptionOfCorrectBehavior);
  } else {
    console.log('test passed');
  }
}

var x = 12;

assert(x === 12, "x should be equal to 12");


console.log([1, 2, 3] === [1, 2, 3]);



function testArrayEquality(array1, array2) {
  if(array1.length !== array2.length){
    return false;
  }
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}


var first = [1, 2, 3, 4, 5];
var second = [1, 2, 3, 4, 5];
var third = [1, 9, 2, 4, 6];
var fourth = [1, 2, 3, 4, 5, 6];




assert(testArrayEquality(first, second) === true, 'it should return true when inputs are equivalent');
assert(testArrayEquality(first, third) === false, 'it should return false when inputs are different');
assert(testArrayEquality(first, fourth) === false, 'it should return false when inputs are different');






/* data set */


var factories = [
  {
    'factory name': 'c&h plush',
    'products': 'stutffed animales',
    'rating': 'B',
    'monthly capacity': 100000,
    'total current orders': 10000,
    'days to deliver': 20,
    'shipping port': ['yantian']
  },
  {
    'factory name': 'Fox Con',
    'products': 'electronics',
    'rating': 'A',
    'monthly capacity': 1000000,
    'total current orders': 1000000,
    'days to deliver': 10,
    'shipping port': ['yantian','shang hai', 'beijing']
  },
  {
    'factory name': 'SS clothing',
    'products':'textiles',
    'rating':'F',
    'monthly capacity': 10000,
    'total current orders': 0,
    'days to deliver': 30,
    'shipping port': ['yantian']
  }
];








/*
Specs:
- it should return an array
- the array should be made up of tuples (arrays with a length of 2)
- the array should have one tuple for each factory
- the first value of the tuple should be a string
- the second value of the tuple should be a number
*/


// EXAMPLE OUTPUT:  [['factory name', monthlyCapacity], ['another factory name', otherMonthlyCapacity]]


function getFactoryCapacities(factories) {
  // your code here
}

assert(Array.isArray(getFactoryCapacities(factories)) === true, 'it should return an array')

assert(getFactoryCapacities(factories).every(function(factory){ return factory.length === 2}), 'it should return an array of tuples')

assert(getFactoryCapacities(factories).every(function(factory){ return typeof factory[0] === 'string'}), 'it should return an array of tupples with the first value being a string')

assert(getFactoryCapacities(factories).every(function(factory){ return typeof factory[1] === 'number'}), 'it should return an array of tupples with the second value being a number')

assert(getFactoryCapacities(factories).length === factories.length, 'it should return an array with one tuple for each factory')





assert(x === 12, "x should be equal to 12");

var actual = getFactoryCapacities(factories)

function testArrayEquality(array1, array2) {
  if(array1.length !== array2.length){
    return false;
  }
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

