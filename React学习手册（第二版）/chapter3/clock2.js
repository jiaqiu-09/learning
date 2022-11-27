const utils = require('../utils/index.js')
// 函数式编程版本
// 每秒钟记录一次时钟时间

const onSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = msg => console.log(msg)

const serializeClockTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
})

const civilianHours = clockTime => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
})

const appendAMPM = clockTime => ({
  ...clockTime,
  ampm: clockTime.hours >= 12 ? 'PM' : 'AM'
})

const display = target => time => target(time)

const formatClock = format => time => {
  return format.replace('hh', time.hours)
    .replace('mm', time.minutes)
    .replace('ss', time.seconds)
    .replace('tt', time.ampm)
}

const prependZero = key => clockTime => {
  return {
    ...clockTime,
    [`${key}`]: clockTime[key] < 10 ? '0' + clockTime[key] : clockTime[key]
  }
}

const convertToCivilianTime = clockTime => {
  log(clockTime)
  return utils.compose(
    appendAMPM,
    civilianHours
  )(clockTime)
}

const doubleDigits = civilianTime => {
  return utils.compose(
    prependZero('hours'),
    prependZero('minutes'),
    prependZero('seconds')
  )(civilianTime)
}

const startTicking = () => 
  setInterval(
    utils.compose(
      clear,
      getCurrentTime,
      serializeClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock('hh:mm:ss tt'),
      display(log)
    )
  , onSecond())

startTicking()