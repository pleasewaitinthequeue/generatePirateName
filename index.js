'use strict';

const {dialogflow} = require('actions-on-google');

const functions = require('firebase-functions');

const app = dialogflow({debug:true});

// ARRAYS THAT HOLD PIRATE NAMES
const firstNames = ["Lady", "Dirty", "Squidlips", "Bowman", "Buccaneer", "Two Toes", "Sharkbait", "Old", "Peg Leg", "Fluffbucket", "Scallywag", "Bucko", "Dead man", "Matey", "Jolly", "Stinky", "Bloody", "Miss", "Mad", "Red", "Captain", "Bretheren", "Rapscallion", "Landlubber", "Wench", "Freebooter"];
const middleNames = ["Creeper", "Jim", "Storm", "John", "Legs", "O'", "Rat", "Jack", "George", "Head", "Cackle", "Patch", "Bones", "Plank", "Greedy", "Sea", "Mama", "Spike", "Squiffy", "Gold", "Yellow", "Felony", "Eddit", "Bay", "Thomas", "Spot"];
const lastNames = ["Magoo", "Byrd", "Jackson", "Sparrow", "McCracken", "Jones", "Ned Head", "Bar", "O'Fish", "Kidd", "O'Malley", "Barnacle", "Holystone", "Hornswaggle", "McStinky", "Swashbuckler", "Sea Wolf", "Beard", "Chumbucket", "Rivers", "Morgan", "Tuna Breath", "Three Gates", "Bailey", "the Wrangler", "Of Dark Water"];

app.intent("return_name_random", (conv) =>{
  // LOGIC GOES IN HERE
  var message;

  let first = firstNames[Math.floor(Math.random()*firstNames.length)];
  let middle = middleNames[Math.floor(Math.random()*middleNames.length)];
  let last = lastNames[Math.floor(Math.random()*lastNames.length)];

  message = `Your random pirate name is ${first} ${middle} ${last} argggggggg!`;
  conv.close(message);
});

app.intent("return_name_specific", (conv, {fi, mi, li}) =>{
  var message;
  
  let first = firstNames[getPositionInAlphabet(fi)];
  let middle = middleNames[getPositionInAlphabet(mi)];
  let last = lastNames[getPositionInAlphabet(li)];
  
  message = `Your specific pirate name is ${first} ${middle} ${last} using initials ${fi} ${mi} ${li} argggggggg!`;
  conv.close(message);
});

function getPositionInAlphabet(incomingLetter) {
  let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  
  return alphabet.indexOf(incomingLetter);
}

exports.generateRandomName = functions.https.onRequest(app);