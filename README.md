# RuoYi-Eggjs

> 若依（RuoYi）Node.js 版本，基于 Egg.js 企业级框架

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)
[![Egg](https://img.shields.io/badge/egg-%5E3-blue.svg)](https://eggjs.org)

基于 Egg.js 框架开发的企业级后台管理系统，100% 实现若依（RuoYi-Vue）系统功能。采用 MyBatis XML 风格编写 SQL，完全复用若依原有的数据库结构和 MyBatis XML 映射文件，实现从 Java 到 Node.js 的无缝迁移。

## 前端项目

本项目是后端服务，可无缝对接若依官方 Vue3 前端项目：

- **RuoYi-Vue3**: [https://gitcode.com/yangzongzhuan/RuoYi-Vue3](https://gitcode.com/yangzongzhuan/RuoYi-Vue3)
- 完全兼容若依前端所有功能
- API 接口与若依 Java 版本保持一致
- 支持所有前端页面和组件

**配置后端接口**：

在前端项目的 `vite.config.js` 中设置后端接口地址：

```javascript
const baseUrl = 'http://localhost:7001' // 后端接口
```

## ✨ 特性

### 核心特性

- 🗄️ **MyBatis XML 编写 SQL** - 业务逻辑与 SQL 分离，支持动态 SQL（[文档](https://github.com/undsky/ruoyi-eggjs-mybatis)）
- 🔌 **多数据库支持** - 支持 MySQL、PostgreSQL、SQLite 等多种数据库，支持多数据源配置（[MySQL](https://github.com/undsky/ruoyi-eggjs-mysql) | [PostgreSQL](https://github.com/undsky/ruoyi-eggjs-pgsql) | [SQLite](https://github.com/undsky/ruoyi-eggjs-sqlite)）
- 🤖 **代码自动生成** - 基于 XML Mapper 自动生成 Service 层代码（[文档](https://github.com/undsky/ruoyi-eggjs-cli)）
- 🌐 **内网穿透** - 内置 FRP 客户端，快速将本地服务暴露到公网（[文档](https://github.com/undsky/ruoyi-eggjs-cli#frp-内网穿透)）
- 📝 **文件模版** - 使用 VSCode 插件快速生成代码模板（[文档](https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode)）
- 🎯 **路由注解** - 使用装饰器定义路由，简洁优雅（[文档](https://github.com/fyl080801/egg-decorator-router)）
- ⏰ **定时任务调度** - 基于 egg-bull 实现动态定时任务，支持从数据库读取 cron 表达式、手动执行、失败重试、分布式支持、任务日志记录和可视化监控
- 🔐 **JWT 认证** - 基于 JWT 的用户认证和权限控制
- 🔒 **权限控制** - 类似 Spring Boot `@PreAuthorize` 的权限装饰器，支持通配符、AND/OR 逻辑
- 💡 **IDE 智能提示**  - 完整的 TypeScript 类型定义，支持代码跳转、智能提示和参数提示
- 🚀 **缓存支持** - 多层级缓存策略（内存、文件、Redis）（[文档](https://github.com/undsky/ruoyi-eggjs-cache)）
- 🛡️ **限流保护** - API 请求频率限制，防止恶意攻击（[文档](https://github.com/undsky/ruoyi-eggjs-ratelimiter)）

### 技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| [Node.js](https://nodejs.org) | >=20.0.0 | JavaScript 运行时 |
| [Egg.js](https://eggjs.org) | ^3 | 企业级 Node.js 框架 |

### 自研插件

| 插件 | 说明 | 文档 |
| --- | --- | --- |
| [ruoyi-eggjs-mybatis](https://github.com/undsky/ruoyi-eggjs-mybatis) | MyBatis XML SQL 映射 | [README](https://github.com/undsky/ruoyi-eggjs-mybatis) |
| [ruoyi-eggjs-mysql](https://github.com/undsky/ruoyi-eggjs-mysql) | MySQL 数据库操作 | [README](https://github.com/undsky/ruoyi-eggjs-mysql) |
| [ruoyi-eggjs-pgsql](https://github.com/undsky/ruoyi-eggjs-pgsql) | PostgreSQL 数据库操作 | [README](https://github.com/undsky/ruoyi-eggjs-pgsql) |
| [ruoyi-eggjs-sqlite](https://github.com/undsky/ruoyi-eggjs-sqlite) | SQLite 数据库操作 | [README](https://github.com/undsky/ruoyi-eggjs-sqlite) |
| [ruoyi-eggjs-cache](https://github.com/undsky/ruoyi-eggjs-cache) | 多层级缓存 | [README](https://github.com/undsky/ruoyi-eggjs-cache) |
| [ruoyi-eggjs-ratelimiter](https://github.com/undsky/ruoyi-eggjs-ratelimiter) | API 限流 | [README](https://github.com/undsky/ruoyi-eggjs-ratelimiter) |
| [ruoyi-eggjs-cli](https://github.com/undsky/ruoyi-eggjs-cli) | 代码生成工具、FRP 内网穿透 | [README](https://github.com/undsky/ruoyi-eggjs-cli) |
| [ruoyi-eggjs-handlebars](https://github.com/undsky/ruoyi-eggjs-handlebars) | Handlebars 模板引擎 | [README](https://github.com/undsky/ruoyi-eggjs-handlebars) |

## 📦 项目结构

```
ruoyi-eggjs/
├── app/
│   ├── controller/          # 控制器
│   │   ├── system/         # 系统模块控制器
│   │   │   ├── user.js    # 用户管理
│   │   │   ├── role.js    # 角色管理
│   │   │   ├── menu.js    # 菜单管理
│   │   │   ├── dept.js    # 部门管理
│   │   │   ├── post.js    # 岗位管理
│   │   │   ├── dictType.js # 字典类型
│   │   │   ├── dictData.js # 字典数据
│   │   │   ├── config.js  # 参数配置
│   │   │   ├── notice.js  # 通知公告
│   │   │   ├── profile.js # 个人中心
│   │   │   └── login.js   # 登录认证
│   │   ├── monitor/        # 监控模块控制器
│   │   │   ├── online.js  # 在线用户
│   │   │   ├── logininfor.js # 登录日志
│   │   │   ├── operlog.js # 操作日志
│   │   │   ├── server.js  # 服务监控
│   │   │   ├── cache.js   # 缓存监控
│   │   │   ├── job.js     # 定时任务
│   │   │   └── jobLog.js  # 任务日志
│   │   ├── tool/           # 工具模块控制器
│   │   ├── common.js       # 公共接口（上传/下载）
│   │   └── index.js        # 首页控制器
│   ├── service/            # 服务层
│   │   ├── db/            # 数据库服务（自动生成）
│   │   │   └── mysql/
│   │   │       └── ruoyi/ # 若依系统表服务
│   │   ├── system/        # 系统模块服务
│   │   ├── monitor/       # 监控模块服务
│   │   ├── tool/          # 工具模块服务
│   │   ├── ryTask.js      # 定时任务执行类
│   │   └── upload.js      # 文件上传服务
│   ├── decorator/          # 装饰器
│   │   ├── permission.js  # 权限控制装饰器
│   │   └── log.js         # 操作日志装饰器
│   ├── middleware/         # 中间件
│   │   ├── permission.js  # 权限验证中间件
│   │   └── formatBody.js  # 响应格式化
│   ├── queue/             # 队列处理器
│   │   └── ryTask.js      # 定时任务队列
│   ├── extend/            # 框架扩展
│   ├── constant/          # 常量定义
│   ├── util/              # 工具类
│   ├── templates/         # 代码生成模板
│   └── public/            # 静态资源
│       └── uploads/       # 上传文件目录
├── config/
│   ├── config.default.js  # 默认配置
│   ├── config.local.js    # 本地开发配置
│   ├── config.prod.js     # 生产环境配置
│   └── plugin.js          # 插件配置
├── mapper/                # MyBatis XML 映射文件
│   └── mysql/
│       └── ruoyi/        # 若依系统表 Mapper
│           ├── SysUserMapper.xml
│           ├── SysRoleMapper.xml
│           ├── SysMenuMapper.xml
│           └── ...
├── sql/                   # SQL 脚本文件
├── docs/                  # 文档目录
├── typings/               # TypeScript 类型定义
├── cache/                 # 文件缓存目录
├── logs/                  # 日志目录
├── run/                   # 运行时文件
├── app.js                 # 应用启动配置
├── package.json
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.0.0
- MySQL >= 5.7
- Redis >= 5.0

### 1. 克隆项目

```bash
git clone https://github.com/undsky/ruoyi-eggjs.git
cd ruoyi-eggjs
```

### 2. 安装依赖

```bash
npm install
```

### 3. 导入数据库

导入若依数据库脚本到 MySQL：

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS ruoyi DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;

-- 导入数据表和数据
-- SQL 脚本位于项目 sql/ 文件夹下
```

### 4. 配置数据库

创建或修改 `config/config.local.js`：

```javascript
// config/config.local.js
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // MySQL 数据库配置
  config.mysql = {
    default: {
      port: 3306,
      charset: 'utf8mb4',
      multipleStatements: true,
      connectionLimit: 100,
    },
    clients: {
      ruoyi: {
        host: '127.0.0.1',
        user: 'root',
        password: 'your_password',  // 修改为你的密码
        database: 'ruoyi',
      },
    },
  };

  // 缓存配置（使用 Redis）
  config.cache = {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  // 限流配置（使用 Redis）
  config.ratelimiter = {
    points: 100,
    duration: 60,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  return config;
};
```

### 5. 运行项目

#### 开发模式

开发模式会自动启动 Mapper 代码生成器和调试服务：

```bash
npm run dev
```

#### 生产模式

```bash
# 启动
npm start

# 停止
npm stop
```

### 6. 访问应用

打开浏览器访问：[http://localhost:7001](http://localhost:7001)

测试接口：
- 版本信息：`GET http://localhost:7001/version`


## ⚙️ 配置说明

### 核心配置

#### JWT 认证配置

```javascript
// config/config.default.js
config.jwt = {
  enable: true,
  match: /^\/api[\/]?((?!version|auth).)*$/i,  // 需要验证的路由
  secret: 'z2Em*CpGBZDw+',  // 密钥（生产环境务必修改）
  expiresIn: '7d',  // 过期时间
  getToken(ctx) {
    // 从 Header 或 Query 获取 Token
    const authorization = ctx.headers.authorization;
    if (authorization) {
      const [pre, token] = authorization.split(' ');
      if ('Bearer' == pre || 'Token' == pre) {
        return token;
      }
    }
    return ctx.request.body.token || ctx.query.token;
  },
  isRevoked: async (ctx, payload) => {
    // 检查 Token 是否被撤销
    return 'revoked' == await ctx.app.cache.default.get(payload.jti);
  },
};
```

#### CORS 跨域配置

```javascript
config.cors = {
  allowMethods: 'GET,POST',
  credentials: true,
  origin: '*',  // 生产环境建议配置具体域名
};
```

#### 文件上传配置

```javascript
config.multipart = {
  fileSize: '100mb',  // 单文件大小限制
  files: 10,          // 同时上传文件数量
  whitelist: [
    '.jpg', '.jpeg', '.png', '.gif',
    '.doc', '.docx', '.xls', '.xlsx',
    '.pdf', '.txt', '.zip',
  ],
};
```

## 🔧 核心功能

### 1. MyBatis XML SQL 映射

在 `mapper` 目录下编写 XML 映射文件：

```xml
<!-- mapper/mysql/ruoyi/SysUserMapper.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mapper/mysql/ruoyi/SysUserMapper.xml">
    
    <select id="selectUserList">
        SELECT * FROM sys_user
        <where>
            <if test="userName">
                AND user_name LIKE '%${userName}%'
            </if>
        </where>
        ORDER BY create_time DESC
        LIMIT ?, ?
    </select>
    
</mapper>
```

### 2. 自动生成 Service 代码

运行代码生成器：

```bash
npm run mapper
```

会自动生成 `app/service/db/mysql/ruoyi/SysUserMapper.js`：

```javascript
class SysUserMapperService extends Service {
    async selectUserList(values, params) {
        return await this.db().select(this.selectUserListMapper(values, params));
    }
}
```

### 3. 路由注解

使用装饰器定义路由：

```javascript
const { Route, HttpGet, HttpPost } = require('egg-decorator-router');

@Route('/user')
class UserController extends Controller {
  
  @HttpPost('/list')
  async list() {
    const { ctx } = this;
    const users = await ctx.service.db.mysql.ruoyi.sysUserMapper.selectUserList(
      ctx.helper.page(ctx.request.body),
      ctx.request.body
    );
    ctx.body = users;
  }

  @HttpGet('/:id')
  async info() {
    const { ctx } = this;
    const user = await ctx.service.db.mysql.ruoyi.sysUserMapper.selectUserById(
      [ctx.params.id]
    );
    ctx.body = user;
  }
}
```

### 4. 缓存使用

```javascript
// 在 Service 中使用缓存
async getUserById(userId) {
  const { app } = this;
  
  return await app.cache.default.wrap(`user:${userId}`, async () => {
    // 缓存不存在时执行此函数
    return await this.service.db.mysql.ruoyi.sysUserMapper.selectUserById([userId]);
  }, { ttl: 600 });  // 缓存 10 分钟
}
```

### 5. 统一响应格式

所有 API 响应会自动格式化为：

```json
{
  "code": 200,
  "msg": "",
  "data": {
    // 业务数据
  }
}
```

### 6. FRP 内网穿透

使用 `ruoyi-eggjs-cli` 的 FRP 功能可以将本地服务快速暴露到公网，方便开发和测试：

```bash
# 安装 ruoyi-eggjs-cli（如果还未安装）
npm install -g ruoyi-eggjs-cli

# 使用 FRP 内网穿透（所有参数必填）
rec frp 127.0.0.1:7001 -saddr frp.example.com -sport 39998 -auth your_token

# 指定本地端口（IP 默认为 127.0.0.1）
rec frp 7001 -saddr frp.example.com -sport 39998 -auth your_token

# 指定自定义域名（可选）
rec frp 127.0.0.1:7001 -saddr frp.example.com -sport 39998 -auth your_token -cdomain myapp.example.com
```

**参数说明：**

| 参数 | 说明 | 是否必填 |
| --- | --- | --- |
| `localURL` | 本地服务地址，格式：`IP:PORT` 或 `PORT` | 必填 |
| `-saddr, --serverAddr` | FRP 服务端地址 | 必填 |
| `-sport, --serverPort` | FRP 服务端端口 | 必填 |
| `-auth, --authToken` | 身份验证令牌 | 必填 |
| `-cdomain, --customDomains` | 自定义域名 | 可选 |

**使用场景：**

- 本地开发时，需要让远程客户端访问本地服务
- 微信小程序开发，需要 HTTPS 域名进行调试
- 临时分享本地服务给团队成员测试
- 内网穿透，访问内网服务

更多详情请参考：[ruoyi-eggjs-cli FRP 功能文档](https://github.com/undsky/ruoyi-eggjs-cli#frp-内网穿透)

## 📝 开发指南

### 开发工作流

1. **编写 XML Mapper**
   ```bash
   # 在 mapper/mysql/ruoyi/ 目录下创建或修改 XML 文件
   ```

2. **自动生成 Service**
   ```bash
   # 开发模式会自动监听 XML 变化并生成代码
   npm run dev
   ```

3. **编写 Controller**
   ```javascript
   // 使用生成的 Service
   await ctx.service.db.mysql.ruoyi.xxxMapper.methodName(values, params);
   ```

4. **测试接口**
   ```bash
   # 使用 Postman 或 curl 测试
   ```

### 命令说明

```bash
# 开发模式（自动生成 Mapper + 调试）
npm run dev

# 仅生成 Mapper 代码
npm run mapper

# 仅启动调试服务
npm run debug

# 生产模式启动
npm start

# 停止服务
npm stop
```

### 目录规范

- **Controller**：`app/controller/**/*.js` - API 控制器
- **Service**：`app/service/*.js` - 业务逻辑
- **Middleware**：`app/middleware/*.js` - 中间件
- **Mapper**：`mapper/mysql/数据库名/*.xml` - SQL 映射文件
- **自动生成**：`app/service/db/mysql/数据库名/*.js` - 自动生成的 Service

## 🚢 部署说明

### 使用 egg-scripts 部署

```bash
# 安装依赖
npm install --production

# 启动服务（后台运行）
npm start

# 停止服务
npm stop
```

### 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动
pm2 start npm --name ruoyi-eggjs -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs ruoyi-eggjs

# 停止
pm2 stop ruoyi-eggjs

# 重启
pm2 restart ruoyi-eggjs
```

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:7001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源。

## 🙏 鸣谢

- [若依（RuoYi）](https://gitee.com/y_project/RuoYi-Vue) - 优秀的开源后台管理系统
- [Egg.js](https://eggjs.org) - 企业级 Node.js 框架
- 所有贡献者

## 📞 联系方式

- 网站：[https://www.undsky.com](https://www.undsky.com)
- GitHub：[https://github.com/undsky/ruoyi-eggjs](https://github.com/undsky/ruoyi-eggjs)
- Issues：[https://github.com/undsky/ruoyi-eggjs/issues](https://github.com/undsky/ruoyi-eggjs/issues)
