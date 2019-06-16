'use strict';

const { dialogflow } = require('actions-on-google');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = dialogflow({debug:true});

admin.initializeApp();

// ARRAYS THAT HOLD PIRATE NAMES
const firstNames = ["Lady", "Dirty", "Squidlips", "Bowman", "Buccaneer", "Two Toes", "Sharkbait", "Old", "Peg Leg", "Fluffbucket", "Scallywag", "Bucko", "Dead man", "Matey", "Jolly", "Stinky", "Bloody", "Miss", "Mad", "Red", "Captain", "Bretheren", "Rapscallion", "Landlubber", "Wench", "Freebooter"];
const middleNames = ["Creeper", "Jim", "Storm", "John", "Legs", "O'", "Rat", "Jack", "George", "Head", "Cackle", "Patch", "Bones", "Plank", "Greedy", "Sea", "Mama", "Spike", "Squiffy", "Gold", "Yellow", "Felony", "Eddit", "Bay", "Thomas", "Spot"];
const lastNames = ["Magoo", "Byrd", "Jackson", "Sparrow", "McCracken", "Jones", "Ned Head", "Bar", "O'Fish", "Kidd", "O'Malley", "Barnacle", "Holystone", "Hornswaggle", "McStinky", "Swashbuckler", "Sea Wolf", "Beard", "Chumbucket", "Rivers", "Morgan", "Tuna Breath", "Three Gates", "Bailey", "the Wrangler", "Of Dark Water"];

app.intent('Default Welcome Intent', (conv) =>{
	let message;
	let random = randBetween(1,3);
	switch(random){
		case 1:
			message = "Would ye be liking a random, or a specific name based on yer initials?";
			break;
		case 2:
			message = "Avast, would ye prefer a random name, or a specific name based on yer initials?";
			break;
		case 3:
			message = "Would ye fancy, or a specific name based on yer initials? aaaaaaarrrrrrrgggggg";
			break;
		default:
			message = "Would ye be liking a random, or a specific name based on yer initials?";
			break;
	}
	console.log(message);
	conv.ask(message);
});

app.intent("Random Intent", (conv) =>{
  // LOGIC GOES IN HERE
  var message;

  let first = firstNames[randBetween(0, firstNames.length)];
  let middle = middleNames[randBetween(0, middleNames.length)];
  let last = lastNames[randBetween(0, lastNames.length)];

  message = `Your random pirate name is ${first} ${middle} ${last} argggggggg!`;
  console.log(message);
  conv.close(message);
});

app.intent("Specific Intent", (conv, {fi, mi, li}) =>{
  var message;
  
  let first = firstNames[getPositionInAlphabet(fi)];
  let middle = middleNames[getPositionInAlphabet(mi)];
  let last = lastNames[getPositionInAlphabet(li)];
  
  message = `Your specific pirate name is ${first} ${middle} ${last} using initials ${fi} ${mi} ${li} argggggggg!`;
  console.log(message);
  conv.close(message);
});

const randBetween = (min, max) => {
	let rand = Math.floor(Math.random() * (max - min)) + min;
	return rand;
}

const getPositionInAlphabet = (incomingLetter) => {
  let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  return alphabet.indexOf(incomingLetter.toLowerCase());
}

exports.generatePirateName = functions.https.onRequest(app);