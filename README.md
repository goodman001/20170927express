1. 首先修改front下的packet.json的ip（端口不要改），ip应该是当前运行机器的公网或>者内网ip，如果本地测试的话就是localhost
2. 数据库配置：server/config/config.json
3. noteapp目录下，首先npm install,然后front目录下npm install
4. noteapp 目录下 npm start,另开窗口，在front下npm start
5. 坐等操作即可

app框架：
#####后端 server/
  config: 配置数据库
  models: 数据表结构
  routes/index.js:后端向前端提供的api接口
  controllers:以上api接口的具体实现
#### 前端client/
  所有核心文件均在src下
  LoginScreen.js: login.js register.js的父文件
      login.js:登录界面的实现
      register.js:注册页面的实现
  UserPage.js:后端页面实现的父文件，包含了左侧navbar
      NoteScreen: notelist,noteedit,createnote三个功能
      ProfileScreen:用户信息管理界面






