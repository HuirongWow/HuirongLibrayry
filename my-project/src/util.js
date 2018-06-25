import config from './config'

// 工具函数库
//
export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  console.log('post')
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
export function showModal (text) {
  wx.showModal({
    title: '提示',
    content: text,
    success: function (res) {
      if (res.confirm) {
        console.log('确定')
      } else if (res.cancel) {
        console.log('取消')
      }
    }
  })
}
