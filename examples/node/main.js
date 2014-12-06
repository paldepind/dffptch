var dffptch = require('dffptch');

var diff = dffptch.diff;
var patch = dffptch.patch;

// Let's create a rabbit
var rabbit = {
  name: 'Frosty',
  type: 'animal',
  race: 'rabbit',
  color: 'white',
  weight: 1.2,
  parent: {
    name: 'Squirky',
  }
};

// And a horse
var horse = {
  name: 'Sunchaser',
  type: 'animal',
  race: 'horse',
  color: 'light-brown',
  weight: 455,
  parent: {
    name: 'Acapella',
  }
};

var rabbitToHorse = diff(rabbit, horse);
console.log(rabbitToHorse);
patch(rabbit, rabbitToHorse);
console.log(rabbit);
