# 生命周期

- 从实例被创建，运行，到销毁徽期间，总是伴随着各种生命周期

- 生命周期钩子，就是生命周期事件的别名

- 生命周期钩子=生命周期函数=生命周期事件

- 函数分类

  - 创建期间

    - beforeCreate
    - created
    - beforeMount
    - mounted

    ```js
    beforeCreate() {
            //这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
            //console.log(this.msg) undefined
            //this.show()   not a function
            //在这个生命周期函数时，data以及methods还没有被初始化
          },
          created() {
            //第二个生命周期函数
            //在created中，data和methods以及被初始化
            //如果要调用method以及操作data数据，最早只能在created中操作
            console.log(this.msg)
            this.show()
          },
          beforeMount() {
            //Vue开始编译模板，把Vue代码中的指令进行执行，最终在内存中生成一个编译好的最终模板字符串
            //最后，把这个模板字符串，渲染为内存中的DOM
            //并没有把模板挂载到真正的页面中去
            console.log('beforemounted ' + document.getElementById('h3').innerText)
            //页面中的元素还没有被替换，只是之前的字符串，输出会时原本的字符串内容
          },
          mounted() {
            //表示内存中的模板，已经渲染到了页面中，用户以及可以看到渲染好的页面
            console.log('mounted ' + document.getElementById('h3').innerText)
            //注意,mounted表示实例以及创建完全了，没有其他操作的话，实例不会变化
          }
    ```

  - 运行期间

    - beforeUpdate
    - updated

    ```js
     //运行期间
          beforeUpdate() {
            //表示我们的数据被更新，但页面没有同步
            console.log('beforeUpdated \n' + '页面:' + document.getElementById('h3').innerText)
            console.log('数据:' + this.msg)
            //元素内容并没有改变，但是msg改变了
          },
          updated() {
            //表示更新后的数据渲染完毕，数据和页面保持同步
            console.log('updated \n' + '页面:' + document.getElementById('h3').innerText)
            console.log('数据:' + this.msg)
    
          },
    ```

    

  - 销毁期间

    - beforeDestroy
    - destroyed

    ```js
    
    ```

    

![lifecycle](/home/caoqiubin/桌面/前段框架/Vue/learn/vue-learn/lifecycle.png)

# jsonp

- 浏览器的安全性限制，不允许ajax跨域请求
- 可以通过动态创建<script>被标签的形式，把标签中的src属性，指向数据接口地址，因为这个标签不存在跨域限制，这种数据获取方式，成为jsonp，只支持get请求
- 具体实现过程
  - 现在客户端定义一个回调方法，预定义对

# Vue中的动画

## transition

```html
 <!-- 自定义样式，来控制trainsition内部的元素实现动画 -->
  <style>
    /* v-enter 是一个时间点  是进入之前，元素的起始状态，此时还没有进入 */
    /* v-leave-to 是动画离开之后，离开的终止状态 */
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateX(80px);
    }

    /* v-enter-active 入场动画的时间段 */
    /* v-leave-active 离场动画的时间段 */
    .v-enter-active,
    .v-leave-active {
      transition: all 1s ease;
    }


    .my-enter,
    .my-leave-to {
      opacity: 0;
      transform: translateY(80px);
    }

    .my-enter-active,
    .my-leave-active {
      transition: all 1s ease;
    }
  </style>



<div id="app">
    <input type="button" value="toggle" @click="flag=!flag">
    <!-- 需求：点击让h3显示，在点击隐藏 -->
    <!-- transition是Vue官方提供的 -->
    <transition>
      <h3 v-if=" flag">这是一个h3</h3>
    </transition>

    <transition name="my">
      <h4 v-if=" flag">这是一个h4</h3>
    </transition>
  </div>
```

# 组件化和模块化的区别

组件的出现是为了拆分Vue实例的代码量，让我们以不同的组件，来划分不同的功能模块

- 模块化：代码逻辑的角度进行划分
- 组件化：从UI界面的角度进行划分，方便UI组件的重用

## 全局组件的定义

```html
<body>
  <div id="app">
    <my-com1></my-com1>
    <my-com2></my-com2>
    <my-com3></my-com3>

    <template id="tmp1">
      <div>
        <h4>这是一个Vue.extend创建的第三种方式<h4></h4>
      </div>

    </template>

  </div>

  <script>
    //第一种方式
    //使用Vue.extend来创建全局的Vue组件
    var com1 = Vue.extend({
      template: '<h3>这是一个Vue.extend创建的组件<h3>'
    })
    //Vue.component('组件名称'，创建出来的模板对象)
    //如果采用驼峰命名，需要改称小写并用‘-’隔开
    Vue.component('myCom1', com1)
    //也可以直接
    Vue.component('myCom2', Vue.extend({
      template: '<h4>这是一个Vue.extend创建的第二个组件<h4>'
    }))

    //第二种方式
    //如果有多个标签存在，模板元素需要用唯一的元素包裹起来，
    Vue.component('myCom3', {
      template: '<h4>这是一个Vue.extend创建的第二种方式<h4>'
    })

    //第三种方式
    Vue.component('myCom4', {
      template: '#tmp1'
    })
    var vm = new Vue({
      el: '#app',
      data: {

      },
      methods: {

      }
    })
  </script>
</body>
```

## 私有组件

```html
<body>
  <div id="app">

    <login></login>
    <template id="tmp">
      <h2>这也是一个私有组件</h2>

    </template>

  </div>

  <script>
    var vm = new Vue({
      el: '#app',
      data: {

      },
      methods: {

      },
      components: {
        login: {
          template: '<h1>这是一个私有的login组件<h1>'
        },
        regist: {
          template: "tmp"
        }
      }
    })
  </script>
</body>
```

## 组件中的数据

```js
 data: function () {
            return {
              msg: '这是一个组件中的数据'
            }
          
```

## 组件的切换

​	

```html
 <!-- Vue提供了component用来展示对应的组件 -->
    <!-- :is属性,用来指定要展示的组件的名称 -->
    <component :is="compName"></component>

```

## 组件切换过渡动画

```htm
  //mode指定切换的方式
  <transition mode="out-in">
      <component :is="compName"></component>
    </transition>
```

