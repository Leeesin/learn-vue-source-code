
const Dep = require('./Dep')

class Observer {
  constructor(targetObject) {
    def(targetObject, '__ob__', this);//在 targetObject 上 添加  Observer 实例, setter时 通知该实例
    observe(targetObject)
    this.dep = new Dep()
  }
}

function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  });
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get');
      return val
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return
      val = newVal
      const ob = this.__ob__
      ob.dep.notify();
    },

  })
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}


module.exports = Observer