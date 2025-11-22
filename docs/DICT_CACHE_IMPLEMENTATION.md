# 字典缓存功能实现说明

## 概述

本文档说明基于 Java 版 RuoYi 实现的字典缓存功能。

## 实现的功能

### 1. 字典工具类 (DictUtils)

**文件位置**: `app/utils/dictUtils.js`

#### 主要方法

| 方法 | 说明 | 对应 Java 方法 |
|------|------|----------------|
| `setDictCache(app, key, dictDatas)` | 设置字典缓存 | `setDictCache(String key, List<SysDictData> dictDatas)` |
| `getDictCache(app, key)` | 获取字典缓存 | `getDictCache(String key)` |
| `getDictLabel(app, dictType, dictValue, separator)` | 根据字典值获取字典标签 | `getDictLabel(String dictType, String dictValue, String separator)` |
| `getDictValue(app, dictType, dictLabel, separator)` | 根据字典标签获取字典值 | `getDictValue(String dictType, String dictLabel, String separator)` |
| `getDictValues(app, dictType)` | 获取所有字典值 | `getDictValues(String dictType)` |
| `getDictLabels(app, dictType)` | 获取所有字典标签 | `getDictLabels(String dictType)` |
| `removeDictCache(app, key)` | 删除指定字典缓存 | `removeDictCache(String key)` |
| `clearDictCache(app)` | 清空所有字典缓存 | `clearDictCache()` |
| `getCacheKey(configKey)` | 获取缓存键 | `getCacheKey(String configKey)` |
| `loadingDictCache(app, ctx)` | 加载所有字典缓存 | - |
| `resetDictCache(app, ctx)` | 重置字典缓存 | - |

#### 使用示例

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

### 2. 字典类型服务 (DictTypeService)

**文件位置**: `app/service/system/dictType.js`

#### 优化内容

1. **引入 DictUtils 工具类**
   ```javascript
   const DictUtils = require('../../utils/dictUtils');
   ```

2. **优化 `insertDictType` 方法**
   - 新增字典类型后，设置空缓存

3. **优化 `updateDictType` 方法**
   - 更新字典类型后，重新加载该类型的字典数据缓存

4. **优化 `deleteDictTypeByIds` 方法**
   - 删除字典类型后，移除对应的缓存

5. **优化 `loadingDictCache` 方法**
   - 使用 DictUtils.loadingDictCache 统一加载

6. **优化 `clearDictCache` 方法**
   - 使用 DictUtils.clearDictCache 统一清空

7. **优化 `resetDictCache` 方法**
   - 使用 DictUtils.resetDictCache 统一重置

#### 对应 Java 方法

| Node.js 方法 | Java 方法 |
|-------------|-----------|
| `loadingDictCache()` | `@PostConstruct init()` |
| `selectDictDataByType(dictType)` | `selectDictDataByType(String dictType)` |
| `insertDictType(dictType)` | `insertDictType(SysDictType dict)` |
| `updateDictType(dictType)` | `updateDictType(SysDictType dict)` |
| `deleteDictTypeByIds(dictIds)` | `deleteDictTypeByIds(Long[] dictIds)` |
| `clearDictCache()` | `clearDictCache()` |
| `resetDictCache()` | `resetDictCache()` |

### 3. 字典数据服务 (DictDataService)

**文件位置**: `app/service/system/dictData.js`

#### 优化内容

1. **引入 DictUtils 工具类**
   ```javascript
   const DictUtils = require('../../utils/dictUtils');
   ```

2. **优化 `selectDictDataByType` 方法**
   - 优先从缓存获取
   - 缓存未命中时从数据库查询并更新缓存

3. **优化 `insertDictData` 方法**
   - 新增字典数据后，更新对应类型的缓存

4. **优化 `updateDictData` 方法**
   - 修改字典数据后，更新对应类型的缓存

5. **优化 `deleteDictDataByIds` 方法**
   - 删除字典数据后，更新对应类型的缓存

6. **移除 `updateDictCache` 方法**
   - 使用 DictUtils 统一管理，简化代码

#### 对应 Java 方法

| Node.js 方法 | Java 方法 |
|-------------|-----------|
| `selectDictDataByType(dictType)` | - |
| `insertDictData(dictData)` | `insertDictData(SysDictData data)` |
| `updateDictData(dictData)` | `updateDictData(SysDictData data)` |
| `deleteDictDataByIds(dictCodes)` | `deleteDictDataByIds(Long[] dictCodes)` |

### 4. 应用启动初始化

**文件位置**: `app.js`

#### 功能说明

在应用启动完成后，自动加载所有字典缓存和参数配置缓存到内存中。

```javascript
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const { app } = this;
    const ctx = app.createAnonymousContext();
    
    try {
      // 加载字典缓存
      await DictUtils.loadingDictCache(app, ctx);
      app.logger.info('✅ 字典缓存初始化完成');
    } catch (error) {
      app.logger.error('❌ 字典缓存初始化失败:', error);
    }

    try {
      // 加载参数配置缓存
      await ctx.service.system.config.loadingConfigCache();
      app.logger.info('✅ 参数配置缓存初始化完成');
    } catch (error) {
      app.logger.error('❌ 参数配置缓存初始化失败:', error);
    }
  }
}
```

#### 对应 Java 实现

Java 版使用 `@PostConstruct` 注解在 Bean 初始化后自动执行：

```java
@PostConstruct
public void init() {
    loadingDictCache();
}
```

## 缓存键规则

- **缓存键前缀**: `sys_dict:` (定义在 `app/constant/index.js` 中的 `CacheConstants.SYS_DICT_KEY`)
- **完整缓存键**: `sys_dict:${dictType}`
- **示例**: `sys_dict:sys_user_sex`

## 缓存策略

1. **写入策略**: 
   - 新增、修改、删除字典数据时，立即更新对应类型的缓存
   - 新增字典类型时，设置空数组缓存
   - 删除字典类型时，移除对应缓存

2. **读取策略**:
   - 优先从缓存读取
   - 缓存未命中时从数据库查询并更新缓存

3. **过期策略**:
   - 缓存永不过期 (TTL = 0)
   - 通过主动更新保证数据一致性

## 与 Java 版的差异

1. **方法参数**:
   - Java: 使用 Spring 的依赖注入，方法参数较少
   - Node.js: 需要显式传递 `app` 和 `ctx` 参数

2. **初始化时机**:
   - Java: 使用 `@PostConstruct` 注解自动执行
   - Node.js: 使用 Egg.js 的生命周期钩子 `didReady()`

3. **缓存实现**:
   - Java: 使用 Redis (通过 RedisCache 类)
   - Node.js: 使用 ruoyi-eggjs-cache 插件（支持 Memory、File、Redis 多层级缓存）

4. **静态方法**:
   - Java: 所有方法都是静态方法
   - Node.js: 使用类的静态方法，保持一致的调用方式

## 测试建议

1. **单元测试**:
   - 测试 DictUtils 的各个方法
   - 测试缓存的读写更新

2. **集成测试**:
   - 测试应用启动时缓存初始化
   - 测试字典 CRUD 操作后缓存的更新

3. **性能测试**:
   - 对比缓存前后的查询性能
   - 测试高并发下的缓存稳定性

## 注意事项

1. 确保 `ruoyi-eggjs-cache` 插件已正确配置
2. 数据库中的 `sys_dict_data` 表需要有 `dict_sort` 字段用于排序
3. 应用启动时会自动加载字典缓存，首次启动可能需要几秒钟
4. 缓存使用的是应用级别的缓存实例 (`app.cache.default`)

## 参考文档

- [RuoYi-Vue DictUtils.java](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/utils/DictUtils.java)
- [RuoYi-Vue SysDictTypeServiceImpl.java](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-system/src/main/java/com/ruoyi/system/service/impl/SysDictTypeServiceImpl.java)
- [RuoYi-Vue SysDictDataServiceImpl.java](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-system/src/main/java/com/ruoyi/system/service/impl/SysDictDataServiceImpl.java)
- [Egg.js 生命周期](https://www.eggjs.org/zh-CN/basics/app-start)
