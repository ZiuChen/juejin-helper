# juejin-helper-SCF

[原仓库地址](https://github.com/iDerekLi/juejin-helper)

## 与原仓库的区别

- 仅保留`workflow`部分的代码
- 修改原仓库`workflow`入口逻辑 使其适合在腾讯云函数上运行
- 添加`dotenv` 从.env文件读取环境变量 (云函数对环境变量的体积有限制)
- 统一消息推送位置到`index.js` 合并所有的消息到一条推送

## 腾讯云函数解决puppeteer启动问题

由于puppeteer需要以chromium为依赖 而云函数的代码和其执行环境是分离的

- puppeteer和chromium的版本必须一一对应
  - `~\node_modules\puppeteer-core\lib\cjs\puppeteer\revisions.js`
  - [下载Chromium](https://registry.npmmirror.com/binary.html?path=chromium-browser-snapshots)
- 需要将下载得到的安装包放到层中 函数执行时 依赖将被解压到对应文件夹 代码中涉及到启动puppeteer的情况 需要指定executablePath 从`/opt`目录下读取chromium
- 需要覆写环境变量`PUPPETEER_EXECUTABLE_PATH`为`/opt/chrome-linux/chrome`指向层中的可执行文件

## 部署项目到腾讯云函数

### 1. 创建函数:

从头开始 / 事件函数 / 环境`Nodejs16` / 内存`128MB` / 勾选异步执行 / 执行超时时间`86400` / 参数填入环境变量

可根据实际情况配置`触发器`定时执行，**其余内容保持默认**

### 2. 克隆代码:

复制以下代码，使用腾讯云函数的 在线编辑器 点击 `终端/新终端`，右键点击终端窗口即粘贴，Enter运行

```shell
  git clone https://github.com/ZiuChen/juejin-helper-SCF.git
```

### 3. 安装依赖:

复制以下代码，右键点击上一步的终端窗口(粘贴)，Enter运行

```shell
  mv juejin-helper-SCF src && cd src/ && yarn
```

**完整执行**上述步骤后，点击“部署”，部署成功后点击“测试”，查看日志输出即可，如配置了触发器，则将每天定时触发。

### 更新函数

复制以下代码，点击 `终端/新终端`，右键点击终端窗口即粘贴,Enter运行 

```shell
  cd src && git pull
```