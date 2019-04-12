// tsc (command) compiles typescript file and turn to js then node (command) run the converted js file
function typeDemo() {
    // var define variable and acceses values of variable nearest to the function..
    // let define variable too and skop of the value nearest to current block..
    for (let i = 0; i < 5; i++) {
        console.log(i);
        console.log('Finally' + i);
    }
    let count = 5;
    // console.log(count);
    // typeCasting example for typecasting use keyword 'as'
    let message;
    message = 'abd';
    let endsWithC = message.endsWith('c');
    console.log(typeof (message));
}
typeDemo();
function fullname(person) {
    console.log(`${person.fName} ${person.lName}`);
}
let p = {
    fName: 'G'
};
fullname(p);
// arrow function..
let log = (message) => {
    console.log(message);
};
log('Without arrow function');
let doLog = (message) => {
    console.log(message);
};
doLog('arrowFunction');
// class example..
var colors;
(function (colors) {
    colors[colors["Red"] = 0] = "Red";
    colors[colors["Green"] = 1] = "Green";
    colors[colors["Blue"] = 2] = "Blue";
})(colors || (colors = {}));
let bColor = colors.Red;
class Point {
    // byDefault everythings are public..
    constructor(_X, _Y) {
        this._X = _X;
        this._Y = _Y;
    }
    draw() {
        // method definition.
        console.log('draw method calling');
        console.log('X ' + this._X + ' Y ' + this._Y);
    }
    get x() {
        return this._X;
    }
    set x(x) {
        this._X = x;
    }
}
let point = new Point(2, 1); // object declaration.
point.draw();
let X;
point.x = 10; // setter call directly as properties calling
console.log(point.x); // to compile getters and setters use command tsc -target es5 (filename)
let x = 4;
//setTimeout(doThingsDoOne,1000); 
//doThingsDoTwo();
function success(data) {
    console.log('Success: ', data);
}
function fail(errDetails) {
    console.log('Failure: ', errDetails);
}
class EventsEmiiter {
    constructor(events) {
        this.events = events || {};
    }
    subscribe(name, cb) {
        (this.events[name] || (this.events[name] = [])).push(cb);
        return {
            unsubscribe: () => this.events[name] && this.events[name].splice(this.events[name].indexOf(cb) >>> 0, 1)
        };
    }
    emit(name, ...args) {
        (this.events[name] || []).forEach(fn => fn(...args));
    }
}
let n = 0;
let s;
const customEvent = new EventsEmiiter();
customEvent.subscribe('THUNDER_ON_THE_MOUNTAIN', value => n = value);
customEvent.subscribe('THUNDER', value => s = value);
customEvent.emit('THUNDER_ON_THE_MOUNTAIN', 18);
customEvent.emit('THUNDER', 'Gaurang');
console.log(n);
console.log(s);
