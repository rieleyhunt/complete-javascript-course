

console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => {
    console.log(res);
});

Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 10000000; i++);
    console.log(res);
});

console.log('test end');

// Print in the following order:
// test start 
// test end 
// resolved promise 1
// resolved promise 2 
// 0 sec timer 