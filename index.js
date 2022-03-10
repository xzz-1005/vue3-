// 响应式数据的基本实现
const bucket = new WeakMap()

const data = {text: 'hello world'}
const obj = new Proxy(data, {
  get(target, key) {
    console.log(target, key)
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
    console.log(bucket, depsMap, deps)
    return target[key]
  },
  set (target, key, newVal) {
    target[key] = newVal
    console.log(target[key], target)
    const depsMap = bucket.get(target)
    console.log(depsMap, key)
    if (!depsMap) return
    console.log(depsMap, key)
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
    // console.log(target, key, newVal)
  }
})

let activeEffect

function effect(fn) {
  activeEffect = fn
  fn()
}

effect(() => {
  document.body.innerText = obj.text
})

setTimeout(() => {
  obj.text = 'hello world 123'
  obj.notExist = 'xx'
}, 1000);