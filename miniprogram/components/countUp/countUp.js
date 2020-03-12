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
    useSlot: Boolean,
    millisecond: Boolean,
    time: {
      type: Number,
      observer: 'reset'
    },
    format: {
      type: String,
      value: 'HH:mm:ss'
    },
    autoStart: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeData: 0,
    formattedTime: '0',
    startTime: 0,
    timeLong: 0,
  },

  detached: function() {
    clearTimeout(this.tid)
    this.tid = null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //开始
    start() {
      // if (this.counting) {
      //   this.data.startTime = Date.now()
      //   this.tick()
      //   return
      // }
      // this.counting = true
      this.data.startTime = Date.now()
      this.tick()
    },

    // 暂停
    pause() {
      // this.counting = true
      clearTimeout(this.tid)
      this.tid = null
    },

    // 重置
    reset() {
      this.pause()
      this.continueTime = 0
      if (this.data.autoStart) {
        this.start();
      }
    },

    tick() {
      this.microTick()
    },

    microTick() {
      this.tid = simpleTick(() =>{
        const timeLong = this.getLongTime()
        this.setTimeLong(timeLong)
        this.microTick()
      })
    },

    getLongTime() {
      return Math.max(Date.now()- this.data.startTime,0)
    },

    setTimeLong(time) {
      this.timeLong = time
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
      this.start()
    }
  }
})
