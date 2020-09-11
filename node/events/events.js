// .on(eventname, callbackFunc) in the node.js
// process.on('exit', () => {
//     console.log('exit 이벤트 실행');
// });

// setTimeout(() => {
//     console.log('2초 후 시스템 종료');
//     process.exit();
// }, 2000);

// 사용자 정의 이벤트 생성
// process.on('tick', (count) => {
//     console.log('tick 이벤트 발생: %s', count);
// });
// setTimeout(() => {
//     console.log('2초후 이벤트 실행');
//     process.emit('tick', 777)
// }, 2000)

process.on('exit', (code) => {
    setTimeout(() => console.log('This will not run'), 0);
    console.log(code);
});
process.exit();