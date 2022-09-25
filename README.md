# *juejin-helper* 腾讯云函数部署

## 🚀 主要功能

项目主体部分(签到、抽奖、BUG、海底掘金)来自[iDerekLi/juejin-helper](https://github.com/iDerekLi/juejin-helper)

每日成长任务部分来自[chinjiaqing/juejin-helper](https://github.com/chinjiaqing/juejin-helper)

## 🔰 使用步骤
### 💡 环境变量

基础环境变量参考[iDerekLi/juejin-helper](https://github.com/iDerekLi/juejin-helper)

| 变量名           | 含义                                                         | 是否必填 |
| ---------------- | ------------------------------------------------------------ | -------- |
| COOKIE           | 掘金网站Cookie                                               | 是       |
| COOKIE_2         | 多用户, 当需要同时运行多个掘金用户时所需, 支持最多 **5** 名用户(即COOKIE + COOKIE_2 - COOKIE_5) | 否       |
| EMAIL_USER       | 发件人邮箱地址(需要开启 SMTP)                                | 否       |
| EMAIL_PASS       | 发件人邮箱密码(SMTP密码)                                     | 否       |
| EMAIL_TO         | 订阅人邮箱地址(收件人). 如需多人订阅使用 `, `分割, 例如: `a@163.com, b@qq.com` | 否       |
| DINGDING_WEBHOOK | 钉钉机器人WEBHOOK                                            | 否       |
| PUSHPLUS_TOKEN   | [Pushplus](http://www.pushplus.plus/) 官网申请，支持微信消息推送 | 否       |
| MERGE            | 是否聚合消息通知，可选值`true`/`false`，默认不聚合           | 否       |

成长任务相关环境变量（**均非必填**）

| 变量名       | 用途                                    | 默认值 | 可选值                                                       |
| ------------ | --------------------------------------- | ------ | ------------------------------------------------------------ |
| APPEND_EMOJI | 发布沸点/沸点评论/文章评论时是否跟随表情     | `false` | `true`/`false`                                               |
| ONLY_EMOJI   | 沸点评论是否只评论一个表情            | `false` | `true`/`false`                                               |
| READARTICLE | 阅读文章功能开关 | `true` | `true`/`false` |
| COLLECTARTICLE | 收藏文章功能开关 | `true` | `true`/`false` |
| DIGGARTICLE | 点赞文章功能开关 | `true` | `true`/`false` |
| PUBLISHARTICLE | 发表文章功能开关 | `true` | `true`/`false` |
| PUBLISHPIN | 发表沸点功能开关 | `true` | `true`/`false` |
| DIGGPIN | 点赞沸点功能开关 | `true` | `true`/`false` |
| COMMENTARTICLE | 评论文章功能开关 | `true` | `true`/`false` |
| COMMENTPIN | 评论沸点功能开关 | `true` | `true`/`false` |
| FOLLOWAUTHOR | 关注掘友功能开关 | `true` | `true`/`false` |
| WORDS_API    | 发布沸点/沸点评论时使用的句子类型参数 | `i` | 查看下表 |

句子类型参数 来源：[一言](https://developer.hitokoto.cn/sentence/#句子类型-参数)

| 参数 | 说明     |
| ---- | -------- |
| a    | 动画     |
| b    | 漫画     |
| c    | 游戏     |
| d    | 文学     |
| e    | 原创     |
| f    | 来自网络 |
| g    | 其他     |
| h    | 影视     |
| i    | 诗词     |
| j    | 网易云   |
| k    | 哲学     |
| l    | 抖机灵   |


### 🎯 项目部署

#### 1. 创建函数:

从头开始 / 事件函数 / 环境`Nodejs16` / 内存`64MB` / 勾选异步执行 / 执行超时时间`86400` / 参数填入环境变量

可根据实际情况配置`触发器`定时执行, **其余内容保持默认**

#### 2. 克隆代码:

复制以下代码,使用腾讯云函数的 在线编辑器 点击 `终端/新终端`,右键点击终端窗口即粘贴,Enter运行 

```shell
  git clone https://github.com/ZiuChen/juejin-helper-SCF.git
```

#### 3. 安装依赖:

复制以下代码,右键点击上一步的终端窗口即粘贴,Enter运行

```shell
  mv juejin-helper-SCF src && cd src/ && yarn
```

**完整执行**上述步骤后，点击“部署”，部署成功后点击“测试”，查看日志输出即可，如配置了触发器，则将每天定时触发。

### 📦 更新函数

复制以下代码，点击 `终端/新终端`，右键点击终端窗口即粘贴,Enter运行 

```shell
  cd src && git pull
```

## 💻开发相关

Branch `main` <-- Branch `dev`