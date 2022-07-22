// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

/*
Typescript: Mixins

Introduction to Mixins in TypeScript
https://tinyurl.com/hw7wrm69

Mixin Classes in TypeScript
https://tinyurl.com/5aezs8uj

*/

//EXAMPLE 1
class Subscribe {
  Remind() {
    console.log('Remember to subscribe to my channel');
    appDiv.innerHTML = 'Remember to subscribe to my channel<br />';
  }
}

class Youtube {
  Begin() {
    console.log('Hi, Welcome to my channel!');
    appDiv.innerHTML += 'Hi, Welcome to my channel!<br />';
  }
  Ending() {
    console.log('Thank you for watching my video!');
    appDiv.innerHTML += 'Thank you for watching my video!<br />';
  }
}

/* 
  ERROR: can't extend from two classes. Needs mixin
  export class Recording extends Youtube, Subscribe{} 
*/

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
      );
    });
  });
}

export class Recording {}
export interface Recording extends Youtube, Subscribe {}
applyMixins(Recording, [Youtube, Subscribe]);
const recording = new Recording();
recording.Remind();
recording.Ending();

//EXAMPLE 2
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class Timestamped extends Base {
    timestamp = Date.now();
  };
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Create a new class by mixing `Timestamped` into `User`
const TimestampedUser = Timestamped(User);

const user = new TimestampedUser('John Doe');

console.log(user.name);
console.log(user.timestamp);
