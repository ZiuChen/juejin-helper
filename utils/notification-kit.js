const path = require('path')
const nodemailer = require('nodemailer')
const axios = require('axios')
const env = require('./env')
const pkg = require('../package.json')

class NotificationKit {
  constructor() {
    this.newVersion = {
      has: false,
      name: pkg.version,
      url: pkg.homepage,
    }
  }
  /**
   * 邮件推送
   * @param options
   */
  async email(options) {
    const auth = {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS, // generated ethereal password
    }
    if (!auth.user || !auth.pass || auth.user === '' || auth.pass === '') {
      throw new Error('邮箱功能不可用, 请先配置邮箱用户和密码。')
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.' + auth.user.match(/@(.*)/)[1],
      secure: true,
      port: 465,
      auth,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })
    const template = `
<style>
  .jj-header {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .jj-update-tip {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 12px;
    background: #fff4e5;
    color: #663c00;
    text-decoration: none;
  }
  .jj-main {
    padding: 10px;
  }
  .jj-footer {
    padding: 10px 0;
    border-top: 1px solid #f1f1f1;
    text-align: center;
    font-size: 12px;
    color: #6e6e73;
  }
</style>
<section>
  <header class="jj-header">
    <img src="cid:logo.svg" width="120" height="24" alt="稀土掘金" />
  </header>
  ${
    this.newVersion.has
      ? `<a class="jj-update-tip" href="${this.newVersion.url}" target="_blank"><span>稀土掘金助手 ${this.newVersion.name} 现在可用 ›</span></a>`
      : ''
  }
  <main class="jj-main">
    ${
      options.msgtype === 'html'
        ? options.content
        : `<pre style="margin: 0;">${options.content}</pre>`
    }
  </main>
  <footer class="jj-footer">
    <span>稀土掘金助手v${pkg.version}</span> |
    <span>Copyright © ${new Date().getFullYear()} Derek Li.</span>
  </footer>
</section>
`.trim()
    await transporter.sendMail({
      from: `稀土掘金助手 <${auth.user}>`,
      to: env.EMAIL_TO,
      subject: options.title,
      // text, // plain text body
      html: template,
      attachments: [
        {
          filename: 'logo.svg',
          path: path.resolve(__dirname, '../resources/logo.svg'),
          cid: 'logo.svg', //same cid value as in the html img src
        },
      ],
    })
  }

  /**
   * PushPlus推送
   * @param options
   */
  async pushplus(options) {
    const token = env.PUSHPLUS_TOKEN
    if (!token || token === '') {
      throw new Error('未配置PushPlus Token。')
    }
    const config = {
      token,
      title: options.title,
      content: options.content,
      topic: '',
      template: 'html',
      channel: 'wechat',
      webhook: '',
      callbackUrl: '',
      timestamp: '',
    }
    return axios.post('http://www.pushplus.plus/send', config, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * 钉钉Webhook
   * @param options
   */
  async dingtalkWebhook(options) {
    const url = env.DINGDING_WEBHOOK
    if (!url || url === '') {
      throw new Error('未配置钉钉Webhook。')
    }
    return axios.post(url, {
      msgtype: 'text',
      text: {
        content: `${options.title}\n${options.content}`,
      },
    })
  }

  /**
   * 企业微信Webhook
   * @param options
   */
  async wecomWebhook(options) {
    const url = env.WEIXIN_WEBHOOK
    if (!url || url === '') {
      throw new Error('未配置企业微信Webhook。')
    }
    return axios.post(url, {
      msgtype: 'text',
      text: {
        content: `${options.title}\n${options.content}`,
      },
    })
  }

  async weixinWebhook(options) {
    return this.wecomWebhook(options)
  }

  async checkupdate() {
    try {
      const result = await axios.get(pkg.releases_url)
      const data = result.data[0]
      this.newVersion.has = pkg.version < data.tag_name.replace(/^v/, '')
      this.newVersion.name = data.tag_name
    } catch (e) {}
  }

  async pushMessage(options) {
    const trycatch = async (name, fn) => {
      try {
        await fn(options)
        console.log(`[${name}]: 消息推送成功!`)
      } catch (e) {
        console.log(`[${name}]: 消息推送失败! 原因: ${e.message}`)
      }
    }
    await this.checkupdate()
    if (this.newVersion.has) {
      console.log(`稀土掘金助手 ${this.newVersion.name} 现在可用`)
    }
    await trycatch('邮件', this.email.bind(this))
    await trycatch('钉钉', this.dingtalkWebhook.bind(this))
    await trycatch('微信', this.wecomWebhook.bind(this))
    await trycatch('PushPlus', this.pushplus.bind(this))
  }
}

module.exports = new NotificationKit()
