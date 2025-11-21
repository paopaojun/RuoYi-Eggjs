# 定时任务新增功能修复说明

## 问题描述

在新增定时任务时报错：
```
Error: Field 'invoke_target' doesn't have a default value
```

## 问题原因

### 1. MyBatis Mapper XML 配置问题

**原配置**（`SysJobMapper.xml` 第 83-109 行）：
```xml
<insert id="insertJob" parameterType="SysJob" useGeneratedKeys="true" keyProperty="jobId">
    insert into sys_job(
        <if test="jobId != null and jobId != 0">job_id,</if>
        <if test="jobName != null and jobName != ''">job_name,</if>
        <if test="jobGroup != null and jobGroup != ''">job_group,</if>
        <if test="invokeTarget != null and invokeTarget != ''">invoke_target,</if>
        <if test="cronExpression != null and cronExpression != ''">cron_expression,</if>
        ...
    )values(
        <if test="jobId != null and jobId != 0">#{jobId},</if>
        <if test="jobName != null and jobName != ''">#{jobName},</if>
        <if test="jobGroup != null and jobGroup != ''">#{jobGroup},</if>
        <if test="invokeTarget != null and invokeTarget != ''">#{invokeTarget},</if>
        <if test="cronExpression != null and cronExpression != ''">#{cronExpression},</if>
        ...
    )
</insert>
```

**问题**：
- 所有核心字段都使用了条件判断 `<if test="...">`
- 当字段值为空时，SQL 不会包含该字段
- 数据库表的 `invoke_target` 字段没有默认值且不允许为 NULL
- 导致插入失败

### 2. 服务层缺少校验和默认值

**原代码**（`job.js` 第 137-151 行）：
```javascript
async insertJob(job) {
  const { ctx } = this;
  
  try {
    const mapper = ctx.helper.getDB(ctx).sysJobMapper;
    
    // 设置创建信息
    job.createBy = ctx.state.user ? ctx.state.user.userName : "system";
    job.createTime = ctx.helper.formatDate(new Date());
    
    // 新任务默认暂停状态
    job.status = "1";
    
    // 插入数据库
    const result = await mapper.insertJob([job]);
    // ...
}
```

**问题**：
- 没有校验必填字段
- 没有设置合理的默认值
- Mapper 调用参数格式错误（应该是 `mapper.insertJob([], job)`）

## 修复方案

### 1. 修复 MyBatis Mapper XML

**文件**：`mapper/mysql/ruoyi/SysJobMapper.xml`

**修改内容**：
```xml
<insert id="insertJob" parameterType="SysJob" useGeneratedKeys="true" keyProperty="jobId">
    insert into sys_job(
        <if test="jobId != null and jobId != 0">job_id,</if>
        job_name,
        job_group,
        invoke_target,
        cron_expression,
        <if test="misfirePolicy != null and misfirePolicy != ''">misfire_policy,</if>
        <if test="concurrent != null and concurrent != ''">concurrent,</if>
        <if test="status != null and status != ''">status,</if>
        <if test="remark != null and remark != ''">remark,</if>
        <if test="createBy != null and createBy != ''">create_by,</if>
        create_time
    )values(
        <if test="jobId != null and jobId != 0">#{jobId},</if>
        #{jobName},
        #{jobGroup},
        #{invokeTarget},
        #{cronExpression},
        <if test="misfirePolicy != null and misfirePolicy != ''">#{misfirePolicy},</if>
        <if test="concurrent != null and concurrent != ''">#{concurrent},</if>
        <if test="status != null and status != ''">#{status},</if>
        <if test="remark != null and remark != ''">#{remark},</if>
        <if test="createBy != null and createBy != ''">#{createBy},</if>
        sysdate()
    )
</insert>
```

**改动说明**：
- ✅ `job_name`：必填，去掉条件判断
- ✅ `job_group`：必填，去掉条件判断
- ✅ `invoke_target`：必填，去掉条件判断
- ✅ `cron_expression`：必填，去掉条件判断
- ⚠️ `misfire_policy`、`concurrent`、`status`：保留条件判断，有默认值
- ⚠️ `remark`、`create_by`：可选字段，保留条件判断

### 2. 完善服务层逻辑

**文件**：`app/service/monitor/job.js`

**修改内容**：
```javascript
async insertJob(job) {
  const { ctx } = this;

  try {
    const mapper = ctx.helper.getDB(ctx).sysJobMapper;

    // 校验必填字段
    if (!job.jobName || job.jobName.trim() === "") {
      throw new Error("任务名称不能为空");
    }
    if (!job.invokeTarget || job.invokeTarget.trim() === "") {
      throw new Error("调用目标字符串不能为空");
    }
    if (!job.cronExpression || job.cronExpression.trim() === "") {
      throw new Error("cron执行表达式不能为空");
    }

    // 设置默认值
    job.jobGroup = job.jobGroup || "DEFAULT";
    job.misfirePolicy = job.misfirePolicy || "3";
    job.concurrent = job.concurrent || "1";
    job.status = job.status || "1"; // 新任务默认暂停状态

    // 设置创建信息
    job.createBy = ctx.state.user ? ctx.state.user.userName : "system";
    job.createTime = ctx.helper.formatDate(new Date());

    // 插入数据库
    const result = await mapper.insertJob([], job);

    if (result.affectedRows > 0 && result.insertId) {
      job.jobId = result.insertId;

      // 创建定时任务调度（如果状态为正常）
      if (job.status === "0") {
        await this.createScheduleJob(job);
      }
    }

    return result.affectedRows;
  } catch (err) {
    ctx.logger.error("新增定时任务失败:", err);
    throw err;
  }
}
```

**改动说明**：
1. ✅ 添加必填字段校验（jobName、invokeTarget、cronExpression）
2. ✅ 设置合理的默认值
3. ✅ 修正 Mapper 调用参数：`mapper.insertJob([], job)`

### 3. 修正 updateJob 方法

**同时修复了 `updateJob` 方法的参数格式**：
```javascript
// 修改前
const result = await mapper.updateJob([job]);

// 修改后
const result = await mapper.updateJob([], job);
```

## 字段说明

### 必填字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `jobName` | 任务名称 | `系统默认（无参）` |
| `jobGroup` | 任务组 | `DEFAULT` |
| `invokeTarget` | 调用目标 | `ryTask.ryNoParams` |
| `cronExpression` | Cron 表达式 | `0 0/10 * * * ?` |

### 可选字段（有默认值）

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `misfirePolicy` | 计划执行错误策略 | `3` (默认策略) |
| `concurrent` | 是否并发执行 | `1` (禁止) |
| `status` | 状态 | `1` (暂停) |
| `remark` | 备注 | - |

### 系统自动设置

| 字段 | 说明 | 来源 |
|------|------|------|
| `createBy` | 创建者 | `ctx.state.user.userName` 或 `system` |
| `createTime` | 创建时间 | 当前时间 |

## 使用示例

### 新增定时任务请求

```bash
POST /api/monitor/job
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "jobName": "系统默认（无参）",
  "jobGroup": "DEFAULT",
  "invokeTarget": "ryTask.ryNoParams",
  "cronExpression": "0 0/10 * * * ?",
  "misfirePolicy": "3",
  "concurrent": "1",
  "status": "1",
  "remark": "测试任务"
}
```

### 最小化请求（只传必填字段）

```json
{
  "jobName": "测试任务",
  "invokeTarget": "ryTask.ryNoParams",
  "cronExpression": "0 0/10 * * * ?"
}
```

系统会自动补充：
- `jobGroup`: `"DEFAULT"`
- `misfirePolicy`: `"3"`
- `concurrent`: `"1"`
- `status`: `"1"`
- `createBy`: 当前用户或 `"system"`
- `createTime`: 当前时间

### 响应示例

**成功**：
```json
{
  "code": 200,
  "msg": "新增成功"
}
```

**失败（缺少必填字段）**：
```json
{
  "code": 500,
  "msg": "调用目标字符串不能为空"
}
```

## 相关文件

- **Mapper XML**：`mapper/mysql/ruoyi/SysJobMapper.xml`
- **服务层**：`app/service/monitor/job.js`
- **控制器**：`app/controller/monitor/job.js`

## 注意事项

1. **invokeTarget 格式**：必须符合 `className.methodName` 格式，例如：
   - ✅ `ryTask.ryNoParams`
   - ✅ `ryTask.ryParams('ry')`
   - ✅ `ryTask.ryMultipleParams('ry', true, 2000L, 316.50D, 100)`
   - ❌ `invalidFormat`

2. **Cron 表达式**：控制器会自动校验，不合法的表达式会被拒绝

3. **安全校验**：系统会自动检查 `invokeTarget` 是否存在安全风险（RMI、LDAP、HTTP 调用等）

4. **任务状态**：
   - `0`：正常（启动任务调度）
   - `1`：暂停（不启动任务调度）

## 测试验证

1. **测试新增任务**：
```bash
curl -X POST http://localhost:7001/api/monitor/job \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "jobName": "测试任务",
    "invokeTarget": "ryTask.ryNoParams",
    "cronExpression": "0 0/10 * * * ?"
  }'
```

2. **验证数据库**：
```sql
SELECT * FROM sys_job ORDER BY job_id DESC LIMIT 1;
```

3. **查看日志**：
```bash
# 查看是否有任务调度日志
SELECT * FROM sys_job_log ORDER BY job_log_id DESC LIMIT 10;
```

## 常见问题

### Q1: 仍然报 "Field 'xxx' doesn't have a default value" 错误？

**A**: 检查以下几点：
1. 确认 Mapper XML 已经正确修改并重启应用
2. 确认前端传递的字段名称正确（驼峰命名）
3. 检查数据库表结构，确认字段约束

### Q2: 任务新增成功但没有执行？

**A**: 
- 新增的任务默认状态是 `1`（暂停）
- 需要手动调用"修改状态"接口或在新增时设置 `status: "0"`

### Q3: invokeTarget 应该填什么？

**A**: 
- 查看 `app/service/ryTask.js` 中定义的任务方法
- 默认支持：
  - `ryTask.ryNoParams` - 无参任务
  - `ryTask.ryParams('xxx')` - 有参任务
  - `ryTask.ryMultipleParams(...)` - 多参数任务

## 总结

此次修复解决了以下问题：
1. ✅ 修复了 `invoke_target` 字段缺失导致的插入失败
2. ✅ 规范了必填字段和可选字段的处理
3. ✅ 添加了服务层的字段校验和默认值设置
4. ✅ 修正了 Mapper 方法的调用参数格式
5. ✅ 提升了代码的健壮性和用户体验
