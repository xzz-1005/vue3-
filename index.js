// 完善的响应系统
let activeEffect
const bucket = new Set()
const data = { text: 'hello world' }
const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set (target, key, value) {
    console.log('go')
    target[key] = value
    bucket.forEach(fn => fn())
    return true
  }
})
function effect(fn) {
  activeEffect = fn
  fn()
}
effect(() => {
  console.log('123')
  document.body.innerText = obj.text
})
setTimeout(() => {
  document.body.innerText = 'hello world 123'
  obj.otherText = '123'
}, 1000);

// 响应式数据的基本实现
// // 储存副作用函数桶 
// const bucket = new Set()

// // 原始数据
// const data = { text: 'hello world' }

// // 对原始数据的代理
// const obj = new Proxy(data, {
//   get(target, key) {
//     console.log(target, key)
//     bucket.add(effect)
//     return target[key]
//   },
//   set(target, key, value) {
//     console.log(target, key, value, bucket)
//     target[key] = value
//     bucket.forEach(fn => fn())
//     return true
//   }
// })

// // 副作用函数
// function effect () {
//   document.body.innerText = obj.text
// }
// effect()
// setTimeout(() => {
//   obj.text = 'hello world 123'
// }, 1000);

