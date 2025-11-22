# 缓存系统说明

## 概述

本项目使用 `ruoyi-eggjs-cache` 插件实现多层级缓存（Memory、File、Redis），并在应用启动时自动加载字典和参数配置缓存。

## 缓存常量

所有缓存键前缀统一在 `app/constant/index.js` 的 `CacheConstants` 中定义：

```javascript
module.exports.CacheConstants = {
  // 登录用户 Token 缓存键前缀
  LOGIN_TOKEN_KEY: 'login_tokens:',
  
  // 系统配置缓存键前缀
  SYS_CONFIG_KEY: 'sys_config:',
  
  // 数据字典缓存键前缀
  SYS_DICT_KEY: 'sys_dict:',
  
  // 验证码缓存键前缀
  CAPTCHA_CODE_KEY: 'captcha_codes:',
  
  // 防重提交缓存键前缀
  REPEAT_SUBMIT_KEY: 'repeat_submit:',
  
  // 限流处理缓存键前缀
  RATE_LIMIT_KEY: 'rate_limit:',
  
  // 密码错误次数缓存键前缀
  PWD_ERR_CNT_KEY: 'pwd_err_cnt:'
};
```

## 应用启动初始化

**文件**: `app.js`

应用启动时自动加载：
- ✅ 字典缓存（所有正常状态的字典数据）
- ✅ 参数配置缓存（所有参数配置）

```javascript
class AppBootHook {
  async didReady() {
    const { app } = this;
    const ctx = app.createAnonymousContext();
    
    // 加载字典缓存
    await DictUtils.loadingDictCache(app, ctx);
    
    // 加载参数配置缓存
    await ctx.service.system.config.loadingConfigCache();
  }
}
```

## 字典缓存

### 工具类

**文件**: `app/utils/dictUtils.js`

```javascript
const DictUtils = require('../utils/dictUtils');

// 获取字典标签
const label = await DictUtils.getDictLabel(app, 'sys_user_sex', '0');
// 返回: '男'

// 获取字典值
const value = await DictUtils.getDictValue(app, 'sys_user_sex', '男');
// 返回: '0'

// 获取所有字典值
const values = await DictUtils.getDictValues(app, 'sys_user_sex');
// 返回: '0,1,2'

// 获取所有字典标签
const labels = await DictUtils.getDictLabels(app, 'sys_user_sex');
// 返回: '男,女,未知'
```

### 服务层

**文件**: `app/service/system/dictType.js` 和 `app/service/system/dictData.js`

- 新增/修改/删除字典时，自动更新缓存
- 查询字典时，优先从缓存获取
- 提供缓存管理方法：`loadingDictCache`、`clearDictCache`、`resetDictCache`

## 参数配置缓存

### 服务层

**文件**: `app/service/system/config.js`

```javascript
// 获取参数配置（优先从缓存）
const value = await ctx.service.system.config.selectConfigByKey('sys.user.initPassword');

// 新增参数配置（自动缓存）
await ctx.service.system.config.insertConfig(config);

// 修改参数配置（自动更新缓存）
await ctx.service.system.config.updateConfig(config);

// 删除参数配置（自动删除缓存）
await ctx.service.system.config.deleteConfigByIds([configId]);

// 重新加载所有参数缓存
await ctx.service.system.config.resetConfigCache();
```

- 新增/修改/删除参数配置时，自动更新缓存
- 查询参数配置时，优先从缓存获取
- 提供缓存管理方法：`loadingConfigCache`、`clearConfigCache`、`resetConfigCache`

## 验证码缓存

**文件**: `app/service/system/login.js`

```javascript
// 生成验证码（自动缓存 5 分钟）
const { uuid, img } = await ctx.service.system.login.createCaptcha();

// 验证验证码（自动从缓存获取）
await ctx.service.system.login.validateCaptcha(code, uuid);
```

- 使用常量：`CacheConstants.CAPTCHA_CODE_KEY`
- TTL：300 秒（5 分钟）

## 在线用户缓存

**文件**: `app/service/system/login.js`

```javascript
// 记录在线用户（缓存 7 天）
await ctx.service.system.login.recordOnlineUser(user, token);

// 删除在线用户（Token 加入黑名单）
await ctx.service.system.login.removeOnlineUser(jti);
```

- 使用常量：`CacheConstants.LOGIN_TOKEN_KEY`
- TTL：7 天

## 缓存配置

### 默认配置

**文件**: `config/config.default.js` (ruoyi-eggjs-cache 插件)

```javascript
config.cache = {
  default: 'redis',   // 默认缓存方式：memory | fs | redis
  ttl: 86400,        // 默认 TTL（24 小时）
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 0,
  },
};
```

### 本地开发配置

**文件**: `config/config.local.js`

```javascript
config.cache = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 5,
  }
};
```

### 生产环境配置

**文件**: `config/config.prod.js`

```javascript
config.cache = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: 1,
  }
};
```

## 缓存 TTL 策略

| 缓存类型 | TTL | 说明 |
|---------|-----|------|
| 字典数据 | 24 小时 | 使用默认 TTL，CRUD 操作后自动更新 |
| 参数配置 | 永不过期 (ttl: 0) | CRUD 操作后自动更新 |
| 验证码 | 5 分钟 | 短期有效，验证后删除 |
| 在线用户 | 7 天 | 与 Token 过期时间一致 |
| Token 黑名单 | 7 天 | 用于登出控制 |

## 缓存更新策略

### 1. 字典缓存

- **新增字典类型**: 设置空数组缓存
- **修改字典类型**: 重新查询并更新缓存
- **删除字典类型**: 删除对应缓存
- **新增字典数据**: 重新查询并更新该类型的缓存
- **修改字典数据**: 重新查询并更新该类型的缓存
- **删除字典数据**: 重新查询并更新该类型的缓存

### 2. 参数配置缓存

- **新增参数**: 缓存新参数值
- **修改参数**: 删除旧缓存（如果键名改变），更新新缓存
- **删除参数**: 删除对应缓存

### 3. 验证码缓存

- **生成验证码**: 缓存 5 分钟
- **验证验证码**: 验证后删除（一次性使用）

### 4. 在线用户缓存

- **用户登录**: 记录在线用户信息
- **用户登出**: Token 加入黑名单

## 缓存管理 API

### 基本操作

```javascript
const { app } = this;

// 设置缓存
await app.cache.default.set('key', 'value', 3600);

// 获取缓存
const value = await app.cache.default.get('key');

// 删除缓存
await app.cache.default.del('key');

// 删除多个缓存
await app.cache.default.del(['key1', 'key2']);

// 查询缓存键
const keys = await app.cache.default.keys('prefix:*');

// 清空所有缓存
await app.cache.default.reset();
```

### 缓存包装器（推荐）

```javascript
// 自动缓存函数结果
const result = await app.cache.default.wrap('cache_key', async () => {
  // 这里的代码只在缓存不存在时执行
  return await fetchDataFromDatabase();
}, { ttl: 600 });
```

## 最佳实践

### 1. 使用常量定义缓存键

✅ **正确**:
```javascript
const { CacheConstants } = require('../../constant');
const cacheKey = CacheConstants.SYS_CONFIG_KEY + configKey;
```

❌ **错误**:
```javascript
const cacheKey = `config:${configKey}`;
```

### 2. 合理设置 TTL

- 频繁变化的数据：短 TTL（1-5 分钟）
- 稳定的数据：长 TTL（10-60 分钟）
- 配置类数据：超长 TTL（1-24 小时）或永不过期

### 3. 及时更新缓存

在数据更新（UPDATE）或删除（DELETE）后，立即更新或删除相关缓存。

### 4. 缓存 key 命名规范

- 使用有意义的前缀
- 使用统一的分隔符（`:`）
- 示例：`sys_dict:sys_user_sex`、`sys_config:sys.user.initPassword`

### 5. 错误处理

```javascript
try {
  await DictUtils.loadingDictCache(app, ctx);
  app.logger.info('✅ 字典缓存初始化完成');
} catch (error) {
  app.logger.error('❌ 字典缓存初始化失败:', error);
}
```

## 监控和调试

### 查看缓存内容

```javascript
// 查看所有字典缓存键
const keys = await app.cache.default.keys('sys_dict:*');
console.log('字典缓存键:', keys);

// 查看特定缓存内容
const dictData = await app.cache.default.get('sys_dict:sys_user_sex');
console.log('字典数据:', JSON.parse(dictData));
```

### 清空特定类型缓存

```javascript
// 清空所有字典缓存
await ctx.service.system.dictType.clearDictCache();

// 清空所有参数缓存
await ctx.service.system.config.clearConfigCache();
```

### 重新加载缓存

```javascript
// 重新加载字典缓存
await ctx.service.system.dictType.resetDictCache();

// 重新加载参数配置缓存
await ctx.service.system.config.resetConfigCache();
```

## 相关文档

- [字典缓存实现详情](./DICT_CACHE_IMPLEMENTATION.md)
- [ruoyi-eggjs-cache 插件文档](https://github.com/undsky/ruoyi-eggjs-cache)

## 注意事项

1. **开发环境**: TTL 默认 24 小时（已移除开发环境的 1 秒限制）
2. **生产环境**: 使用 Redis 缓存，支持多实例共享
3. **缓存键前缀**: 统一使用 `CacheConstants` 常量定义
4. **TTL 为 0**: 表示永不过期（cache-manager 标准）
5. **应用启动**: 自动加载字典和参数配置缓存
