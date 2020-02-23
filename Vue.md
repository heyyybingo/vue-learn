# Vue

## 简介

### SPA single Page Application

- 作者 尤雨溪
- 构建用户界面的js框架

## 网站交互方式

- 经典的多页面
  - 体验一般，刷新跳转，等待事件长
  - 前后端糅合，不利于维护
  - 每个页面都需要重新加载渲染，速度慢
  - 有利于SEO搜索引擎搜索(蜘蛛会爬链接)
- 现代的单叶面
  - 只需要加载渲染局部视图
  - 技术不是特别成熟，不好兼容ie
  - 有许多框架
  - 无法兼顾第版本浏览器
  - 现在除了电商网站，很少有系统去兼容低版本浏览器
  - 不利于SEO
  - 开发方式好，前后端分离

## MVC与MVVM的区别

## MVC

Node后端开发的概念

## MVVM

前端视图层的概念

## ![image-20200222214208864](/home/caoqiubin/.config/Typora/typora-user-images/image-20200222214208864.png)

## Vue代码与MVVM的关系

### 创建vue实例

```
    
  //创建一个Vue实例
    //我们new的是一个vm对象，vm调度者
    var vm = new Vue({
      el: '#app',//表示我们new这个Vue实例，实际控制的区域
      data: {
        //该属性中控制el所要用到的数据
        msg: 'helloworld'
      }

    })
```

### v-clock，v-text,v-html

```html
 <div id="app">
    <!-- VUE 实例控制的元素区域，就是v -->
    <!-- 解决刷新表达式闪烁的问题 -->
    <p v-cloak>{{msg}}</p>
    <!-- 默认v-text没有闪烁问题 -->
    <h4 v-text="msg">111</h4>

    <div v-html="msg2">{{msg2}}</div>
  </div>
```

### v-bind

```html
<!-- v-bind是用于绑定属性的指令 -->
    <!--  v-bind: 可以简写为一个冒号:-->
    <input type="button" value="按钮" v-bind:title="mytitle">
    <input type="button" value="按钮" :title="mytitle">
```

### v-on

```html
<!-- v-on 用来绑定事件 -->
    <!-- 缩写是@ -->
    <input type="button" value='按钮2' v-on:click='myalert'>
    <input type="button" value="按钮3" @click="show">
```

​	

### v-on与事件修饰符

- stop
- prevent
- self
- capture
- once
- 事件修饰符时可以串起来的

v

```html
<div id="app">
    <!-- .capture 执行捕获事件-->
    <div class="inner" @click.capture="innerDiv">
      <!-- .stop 阻止冒泡 -->
      <input type="button" value="阻止冒泡" @click.stop="innerBtn">
      <!-- .prevent 阻止默认行为 -->
      <a href="http://www.baidu.com" value="阻止默认行为" @click.prevent="innerBtn">链接</a>
      <!-- .once 触发一次-->
      <input type="button" value="按钮" @click.once="innerBtn">
      <input type="button" value="按钮" @click.stop="innerBtn">

      <!-- .self 点击自己才触发事件 -->
      <div @click.self="innerinnerDiv">
        <input type="button" value="按钮" @click.stop="innerBtn">
      </div>
    </div>
  </div>

```

### v-model和数据双向绑定

```html
  <div id="app">
    <h4>
      {{msg}}
    </h4>
    <!-- v-bind只能单向绑定,不能实现数据的双向绑定 -->
    <input type="text" v-bind:value="msg">
    <!-- v-model只能运用在表单元素中,可以实现数据的双向绑定 -->
    <input type="text" v-model:value="msg">
  </div>

```

v-for循环

在组件中，v-for遍历的key是必须的

```html
<body>
  <div id="app">

    <!-- 使用v-for循环 -->
    <p v-for="item in list">{{item}}</p>

    <!-- 获取索引值 -->
    <p v-for="(item,index) in list">{{item}} 索引值:{{index}}</p>
    <!-- 在遍历对象身上的键值对 -->
    <p v-for="(val,key) in user">key:{{key}}----val:{{val}}</p>

    <!-- 如果迭代数字，数字会从1开始 -->
    <p v-for="count in 10">{{count}}</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        user: {
          id: 1,
          name: 'heyyybingo',
          gender: "男"

        },
        list: [1, 2, 3, 4, 5, 6]
      },
      methods: {

      }
    })
  </script>
</body>
```

key值的使用

```html
<body>
  <div id="app">
    <div>
      <label>ID：
        <input type="text" v-model="id">
        Name
        <input type="text" v-model="name">
      </label>
      <input type="button" @click="add">
    </div>
    <!-- key属性在for循环时只能使用number获取string -->
    <!-- key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值 -->
    <!-- 在组件中使用的时候必须使用key -->
    <p v-for="item in list" :key="item.id">
      <input type="checkbox">{{item.id}}----{{item.name}}</p>
  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        id: '',
        name: '',
        list: [
          { id: 1, name: '张三' },
          { id: 2, name: '张2' },
          { id: 3, name: '张3' },
          { id: 4, name: '张4' }
        ]
      },
      methods: {
        add() {
          var usr = {}
          usr.id = this.id
          usr.name = this.name
          this.list.unshift(usr)
        }
      }
    })
  </script>
</body>
```



## 类与样式样式

### 类

```html
<body>
  <div id="app">
    <!--  -->
    <h1 class="red thin">一个h1标签</h1>
    <!--第一种使用模式，直接绑定  -->
    <h2 :class="['thin','red']">一个h2标签</h2>
    <!-- 在数组中使用对象代替三元表达式 -->
    <h3 :class="['thin','red',{'active':flag}]" @click="flag=!flag">一个h3标签</h3>
    <!-- 直接使用对象 -->
    <h4 :class="{'thin':flag,'red':flag,'active':flag}" @click="flag=!flag">hello</h4>
    <h4 :class="classOBJ" @click="flag=!flag">hello</h4>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      flag: true,
      //  classOBJ: { 'thin': this.flag, 'red': this.flag, 'active': this.flag }
    },
    computed: {
      classOBJ: function () {
        return { 'thin': this.flag, 'red': this.flag, 'active': this.flag }
      },
      //classOBJ: { 'thin': this.flag, 'red': this.flag, 'active': this.flag }

    },
    methods: {

    }
  })
</script>
```

### v-if与v-show

### 样式

```html
<div id="app">
    <!-- 一个对就是无序键值对的集合 -->
    <h1 :style="{color:'red',fontWeight:5000}">这是一个h1</h1>

    <h1 :style="styOBJ">这是一个h1</h1>
  </div>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        styOBJ: { color: 'red', fontWeight: 5000 }
      },
      methods: {

      }
    })
  </script>
```

# 过滤器

Vue允许自定义过滤器，可被用作一些常见的文本格式化，过滤器可以用在:mustache插值和v-bind表达式，过滤器应被添加在js表达式的尾部，由管道符表示

```html
<div id="app">
    <p>{{msg | msgfilter}}</p>
  </div>

  <script>
    //定义一个全局的Vue过滤器
    Vue.filter('msgfilter', function (msg) {
      var reg = /[傻逼|枪毙]/g
      return msg.replace(reg, '*')
    })
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '曾经，有一个人，他是个大傻逼，建议枪毙'
      },
      methods: {

      }
    })
  </script>
```

# 按键修饰府

@keyup

- .enter
- .tab
- .delete 删除和退格键
- .esc
- .space
- .up
- .down
- .left
- .right
- 也可以直接使用js键盘码

# 自定义指令

```js
//自定义全局指令
    //参数1：指令名称 定义时不需要加v-前缀，调用时需要
    //参数2：是一个对象，这个对象上，有许多钩子函数
    Vue.directive('focus', {
      bind: function (el) {
        //当指令绑定到元素上时，就会执行
        //在每一个函数中，第一个参数永远是el，这是一个原生的js对象（DOM）
        //在元素港绑定时，还没有插入到DOM中，调用focus没有作用
        //el.focus()
      },
      inserted: function (el) {
        //当元素插入DOM时候，会执行
        el.focus()
      },
      updated: function () {
        //当vNode更新的时候，会执行updated
      }

    })




    Vue.directive('color', {
      bind: function (el) {
        //当指令绑定到元素上时，就会执行
        //样式只要通过指令绑定给元素，不管这个元素有没有被插入，肯定有一个内联样式
        el.style.color = 'red'
      },
      inserted: function (el) {
        //当元素插入DOM时候，会执行
        //和JS有关的相关操作，一般在这里使用
      },
      updated: function () {
        //当vNode更新的时候，会执行updated
      }

    })
```

## 私有

```js
var vm=new Vue({
    el:"#app",
    data:{
        
    },
   directives:{
          'fontweight':{
              bind:function(el){

              }
          }
        }
})
```

## 简写

```js
//指令简写
    Vue.directive('fontweight',function(el,binding){
      //等同于在bind和update中写入
    })
```

