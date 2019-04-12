

 // tsc (command) compiles typescript file and turn to js then node (command) run the converted js file
function typeDemo(){
     // var define variable and acceses values of variable nearest to the function..
    // let define variable too and skop of the value nearest to current block..
    for (let i = 0; i < 5; i++){
        console.log(i);
        console.log('Finally' + i);
    }
    let count = 5;
    // console.log(count);
    // typeCasting example for typecasting use keyword 'as'
    let message: any;
    message = 'abd';
    let endsWithC = message.endsWith('c') as string;
    console.log( typeof(message));
}
typeDemo();

interface Person {
    fName: string;
    lName?: string; // ? defines variable optional
}

function fullname( person: Person) {
console.log(`${person.fName} ${person.lName}`);
}
let p = {
    fName: 'G'
};

fullname(p);
// arrow function..
let log = (message: any) => {
    console.log(message);
};

log('Without arrow function');
let doLog = (message: any) => {
    console.log(message);
};
doLog('arrowFunction');

// class example..

enum colors {Red = 0, Green = 1, Blue = 2 }
let bColor = colors.Red;

class Point{
    // byDefault everythings are public..
        constructor(private _X?: number, private _Y?: number) { // ? sign define variable optional..
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
let X: number;
point.x = 10; // setter call directly as properties calling
console.log(point.x); // to compile getters and setters use command tsc -target es5 (filename)

let x=4;


//setTimeout(doThingsDoOne,1000); 
//doThingsDoTwo();

function success( data ) {
    console.log('Success: ', data);
}

function fail( errDetails ) {
    console.log('Failure: ', errDetails);
}

/* Custom Events Emmiter */

interface Events{
    [key : string] : Function [] ;

}

class EventsEmiiter{
    public events: Events;
    constructor (events ?: Events){
        this.events = events || {};
    }
    public subscribe (name: string, cb: Function) {
        (this.events[name] || (this.events[name]=[])).push(cb);

        return {
            unsubscribe: () =>
              this.events[name] && this.events[name].splice(this.events[name].indexOf(cb) >>> 0, 1)
        }    
    }
    public emit(name: string, ...args: any[]): void {
        (this.events[name] || []).forEach(fn => fn(...args));
      }
}

let n=0;
let s: string;
const customEvent= new EventsEmiiter();
customEvent.subscribe('THUNDER_ON_THE_MOUNTAIN', value => n = value );
customEvent.subscribe('THUNDER', value => s = value );
customEvent.emit ('THUNDER_ON_THE_MOUNTAIN', 18);
customEvent.emit('THUNDER', 'Gaurang');
console.log(n);
console.log(s);

