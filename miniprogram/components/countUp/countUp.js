// components/countUp/countUp.js
import { parseFormat,parseTimeData } from '../../utils/time.js'

function simpleTick(fn) {
  return setTimeout(fn, 30)
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startTime: {       //任务开始的时间
      type: Number,
      value: null
    },
    format: {     //任务输出时间格式
      type: String,
      value: 'HH:mm:ss'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formattedTime: '0',
    timeBucket: 0
  },
  
  /**
   * 组件生命周期函数-在组件实例被从页面节点树移除时执行
   */
  detached: function() {   //清除定时器
    clearTimeout(this.tid)
    this.tid = null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //开始
    start() {
      this.data.startTime = Date.now()
      this.tick()
    },

    //继续
    goto() {
      this.tick()
    },

    // 结束
    pause() {
      clearTimeout(this.tid)
      this.tid = null
    },

    // 计时
    tick() {
      this.microTick()
    },

    // 毫秒计时
    microTick() {
      this.tid = simpleTick(() =>{
        let timeBucket = this.getTimeBucket()
        this.setTimeBucket(timeBucket)
        this.microTick()
      })
    },

    // 获取计时
    getTimeBucket() {
      return Math.max(Date.now()- this.data.startTime,0)
    },
    // 设置计时
    setTimeBucket(time) {
      this.timeBucket = time
      this.setData({
        formattedTime: parseFormat(this.data.format, parseTimeData(time))
      })
    },

    startTick: function (event) {
      this.start()
    },

    pauseTick: function (event) {
      this.pause()
    }
  },

  pageLifetimes: {
    show:function(){
      if(this.data.startTime !== null){
        this.goto()
      }
    }
  }
})
