
import Vue from 'vue'
import App from './App'

// 一些配置,关闭生产环境下的提示
Vue.config.productionTip = false
// 手动挂载
const app = new Vue(App)
app.$mount()

export default{
  config: {
    'pages': ['^pages/me/main'],
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#EA5149',
      'navigationBarTitleText': '慧荣图书',
      'navigationBarTextStyle': 'light'
    },
    'tabBar': {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }

  }
}
