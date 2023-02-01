require('dotenv').config()
const notification = require('./utils/notification-kit')
const checkin = require('./checkin')
const seaGold = require('./seagold')
const utils = require('./utils/utils')
const env = require('./utils/env')

exports.main_handler = async () => {
  // 保存全局的消息列表 包含所有用户的消息列表 用于合并消息
  const msgList = []

  // 获取所有用户的cookie
  const cookies = utils.getUsersCookie(env)

  // 获取所有用户的cookie并执行相关操作
  for (const ck of cookies) {
    // 当前用户的消息列表
    const usrMsgList = []
    // 默认执行签到、海底掘金 两个任务 每个任务使用try-catch包裹
    // 函数执行后返回messageList数组
    try {
      const res = await checkin(ck)
      usrMsgList.push(res)
    } catch (e) {
      console.log('签到任务出错: ' + e)
    }

    try {
      const res = await seaGold(ck)
      usrMsgList.push(res)
    } catch (e) {
      console.log('海底掘金任务出错: ' + e)
    }

    // 任务执行完毕 将当前用户的消息列表添加到全局
    msgList.push(usrMsgList.join(`\n${'-'.repeat(30)}\n`))
  }

  // 合并消息推送
  const msg = msgList.join(`\n${'-'.repeat(50)}\n${'-'.repeat(50)}\n`)

  await notification.pushMessage({
    title: '掘金助手',
    content: msg,
    msgtype: 'html',
  })
}
