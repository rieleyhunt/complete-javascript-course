
const lotteryPromise = new Promise(function(resolve, reject) {
    if (Math.random() >= 0.5) {
        resolve('you WIN');
    } else {
        reject('you LOSE');
    }
});

lotteryPromise.then(res => console.log(res)).catch
(err => console.log(err));