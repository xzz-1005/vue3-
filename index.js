// 响应式数据的基本实现
const bucket = new Set()

const data = {text: 'hello world'}
const obj = new Proxy(data, {
  get(target, key) {
    bucket.add(effect)
    return target[key]
  },
  set (target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn => {
      fn()
    })
    console.log(target, key, newVal)
  }
})

function effect() {
  document.body.innerText = obj.text
}

effect()

setTimeout(() => {
  obj.text = 'hello world 123'
}, 1000);