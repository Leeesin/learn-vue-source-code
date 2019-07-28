1. watcher的实例属性 this.getter 为一个函数
2. watcher分为 渲染 watcher 和用户定义的 watcher(watche 和 computed) 
```
若为渲染 watcher,执行 this.getter 将会更新组件 触发 patch ,最终更新dom
若为用户定义的 watcher, 执行 this.getter 将会把当前 watcher 加入dep.subs数组内
```
3. 每个对象对应的dep.subs内watcher的个数取决于
    * 模板内是否使用了该对象的属性，若使用，加 1(不会累加)
    * 该对象的属性被用户定义为侦听器(watch)时，加 1（可以累加）
    * 该对象的属性被用户定义的计算属性（computed）使用且在模板内使用，加 1(不会累加)
    
举个栗子，思考以下代码
```
<div id='app'>
    <h1>{{obj.a}}</h1>

    <h1>{{aaa}}</h1>

 </div>
  --------------------
   new Vue({
    el: "#app",
    data() {
      return {
        obj: {
          a: 1,
          b: 2,
        }
      }
    },
    watch: {
      'obj.a': function () { },
      'obj.b': function () { },
    },
    computed: {
      aaa() {
        return this.obj.a + this.obj.b
      },
    },
    mounted() {
      console.log('this.obj 的值是：', this.obj);
    }

```
 问题1， obj对象对应的subs数组有几个watcher?
 
```
1.obj的属性a在模板内被使用                             +1
2.obj.a 和 obj.b 被计算属性使用了并且在模板里被使用      +1
3.obj.a 和 obj.b 被watch 使用，总共两个属性被使用       +2
```

综上 ，答案为 4

![](https://user-gold-cdn.xitu.io/2019/7/28/16c37c56c89a92a5?w=688&h=335&f=png&s=36082)
