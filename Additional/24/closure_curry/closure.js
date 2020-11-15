//not Closure
const nonCountDown = () => {
    let time = 10;
    time -= 1;
    console.log(time);
};

console.log("<< nonCountDown >>");
nonCountDown(); // 「9」
nonCountDown(); // 「9」
nonCountDown(); // 「9」


//Closure
const createCountDown = () => {
    let time = 10;
 
    return () => {
        time -= 1;
        console.log(time);
    };
};

const countDown1 = createCountDown();
const countDown2 = createCountDown();
console.log("<< CountDown >>");
countDown1(); // 「9」
countDown2(); // 「9」
countDown1(); // 「8」
countDown2(); // 「8」
countDown1(); // 「7」
countDown2(); // 「7」
