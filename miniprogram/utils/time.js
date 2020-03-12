function padZero(num, targetLength) {
  if (targetLength === void 0) { targetLength = 2;}
  var str = num + ''
  while (str.length<targetLength) {
    str = '0' +str
  }
  return str
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 *MINUTE

function parseTimeData(time) {
  var hours = Math.floor(time/HOUR)
  var minutes = Math.floor((time%HOUR)/MINUTE)
  var seconds = Math.floor((time%MINUTE)/SECOND)

  return {
    hours,
    minutes,
    seconds
  }
}

exports.parseTimeData = parseTimeData;

function parseFormat(format, timeData) {
  var hours = timeData.hours, minutes = timeData.minutes, seconds = timeData.seconds
  if (format.indexOf('HH') === -1) {
    minutes += hours *60;
  } else {
    format = format.replace('HH',padZero(hours))
  }
  if (format.indexOf('mm') === -1) {
    seconds +=minutes * 60
  } else {
    format = format.replace('mm', padZero(minutes))
  }
  if (format.indexOf('ss') === -1) {
    console.error('format格式错误')
  }else {
    format = format.replace('ss', padZero(seconds))
  }

  return format
  
}

exports.parseFormat = parseFormat