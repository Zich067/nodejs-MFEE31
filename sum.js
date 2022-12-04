// 方法一
function sum(n){
    let sum=0

    for(let i=1;i<=n;i++){
        //sum = sum+i
        sum += i
    }
    return sum
}
console.log(sum(5))

// 方法二
function sum1(n) {
    return ((n + 1) * n) / 2
  }
  console.log(sum1(5))

// 壓力測試
console.time('SUM1')
for (let i = 1; i <= 10000; i++) {
  sum1(100000)
}
console.timeEnd('SUM1')

console.time('SUM2')
for (let i = 1; i <= 10000; i++) {
  sum2(100000)
}
console.timeEnd('SUM2')