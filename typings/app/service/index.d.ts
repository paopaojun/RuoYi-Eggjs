// This file is created by egg-ts-helper@1.35.2
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportRyTask = require('../../../app/service/ryTask');
import ExportUpload = require('../../../app/service/upload');
import ExportMonitorCache = require('../../../app/service/monitor/cache');
import ExportMonitorJob = require('../../../app/service/monitor/job');
import ExportMonitorJobLog = require('../../../app/service/monitor/jobLog');
import ExportMonitorLogininfor = require('../../../app/service/monitor/logininfor');
import ExportMonitorOnline = require('../../../app/service/monitor/online');
import ExportMonitorOperlog = require('../../../app/service/monitor/operlog');
import ExportMonitorServer = require('../../../app/service/monitor/server');
import ExportSystemConfig = require('../../../app/service/system/config');
import ExportSystemDept = require('../../../app/service/system/dept');
import ExportSystemDictData = require('../../../app/service/system/dictData');
import ExportSystemDictType = require('../../../app/service/system/dictType');
import ExportSystemLogin = require('../../../app/service/system/login');
import ExportSystemMenu = require('../../../app/service/system/menu');
import ExportSystemNotice = require('../../../app/service/system/notice');
import ExportSystemPost = require('../../../app/service/system/post');
import ExportSystemRole = require('../../../app/service/system/role');
import ExportSystemUser = require('../../../app/service/system/user');
import ExportToolGen = require('../../../app/service/tool/gen');
import ExportDbMysqlRuoyiGenTableColumnMapper = require('../../../app/service/db/mysql/ruoyi/GenTableColumnMapper');
import ExportDbMysqlRuoyiGenTableMapper = require('../../../app/service/db/mysql/ruoyi/GenTableMapper');
import ExportDbMysqlRuoyiSysConfigMapper = require('../../../app/service/db/mysql/ruoyi/SysConfigMapper');
import ExportDbMysqlRuoyiSysDeptMapper = require('../../../app/service/db/mysql/ruoyi/SysDeptMapper');
import ExportDbMysqlRuoyiSysDictDataMapper = require('../../../app/service/db/mysql/ruoyi/SysDictDataMapper');
import ExportDbMysqlRuoyiSysDictTypeMapper = require('../../../app/service/db/mysql/ruoyi/SysDictTypeMapper');
import ExportDbMysqlRuoyiSysJobLogMapper = require('../../../app/service/db/mysql/ruoyi/SysJobLogMapper');
import ExportDbMysqlRuoyiSysJobMapper = require('../../../app/service/db/mysql/ruoyi/SysJobMapper');
import ExportDbMysqlRuoyiSysLogininforMapper = require('../../../app/service/db/mysql/ruoyi/SysLogininforMapper');
import ExportDbMysqlRuoyiSysMenuMapper = require('../../../app/service/db/mysql/ruoyi/SysMenuMapper');
import ExportDbMysqlRuoyiSysNoticeMapper = require('../../../app/service/db/mysql/ruoyi/SysNoticeMapper');
import ExportDbMysqlRuoyiSysOperLogMapper = require('../../../app/service/db/mysql/ruoyi/SysOperLogMapper');
import ExportDbMysqlRuoyiSysPostMapper = require('../../../app/service/db/mysql/ruoyi/SysPostMapper');
import ExportDbMysqlRuoyiSysRoleDeptMapper = require('../../../app/service/db/mysql/ruoyi/SysRoleDeptMapper');
import ExportDbMysqlRuoyiSysRoleMapper = require('../../../app/service/db/mysql/ruoyi/SysRoleMapper');
import ExportDbMysqlRuoyiSysRoleMenuMapper = require('../../../app/service/db/mysql/ruoyi/SysRoleMenuMapper');
import ExportDbMysqlRuoyiSysUserMapper = require('../../../app/service/db/mysql/ruoyi/SysUserMapper');
import ExportDbMysqlRuoyiSysUserPostMapper = require('../../../app/service/db/mysql/ruoyi/SysUserPostMapper');
import ExportDbMysqlRuoyiSysUserRoleMapper = require('../../../app/service/db/mysql/ruoyi/SysUserRoleMapper');

declare module 'egg' {
  interface IService {
    ryTask: AutoInstanceType<typeof ExportRyTask>;
    upload: AutoInstanceType<typeof ExportUpload>;
    monitor: {
      cache: AutoInstanceType<typeof ExportMonitorCache>;
      job: AutoInstanceType<typeof ExportMonitorJob>;
      jobLog: AutoInstanceType<typeof ExportMonitorJobLog>;
      logininfor: AutoInstanceType<typeof ExportMonitorLogininfor>;
      online: AutoInstanceType<typeof ExportMonitorOnline>;
      operlog: AutoInstanceType<typeof ExportMonitorOperlog>;
      server: AutoInstanceType<typeof ExportMonitorServer>;
    }
    system: {
      config: AutoInstanceType<typeof ExportSystemConfig>;
      dept: AutoInstanceType<typeof ExportSystemDept>;
      dictData: AutoInstanceType<typeof ExportSystemDictData>;
      dictType: AutoInstanceType<typeof ExportSystemDictType>;
      login: AutoInstanceType<typeof ExportSystemLogin>;
      menu: AutoInstanceType<typeof ExportSystemMenu>;
      notice: AutoInstanceType<typeof ExportSystemNotice>;
      post: AutoInstanceType<typeof ExportSystemPost>;
      role: AutoInstanceType<typeof ExportSystemRole>;
      user: AutoInstanceType<typeof ExportSystemUser>;
    }
    tool: {
      gen: AutoInstanceType<typeof ExportToolGen>;
    }
    db: {
      mysql: {
        ruoyi: {
          genTableColumnMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiGenTableColumnMapper>;
          genTableMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiGenTableMapper>;
          sysConfigMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysConfigMapper>;
          sysDeptMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysDeptMapper>;
          sysDictDataMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysDictDataMapper>;
          sysDictTypeMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysDictTypeMapper>;
          sysJobLogMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysJobLogMapper>;
          sysJobMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysJobMapper>;
          sysLogininforMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysLogininforMapper>;
          sysMenuMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysMenuMapper>;
          sysNoticeMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysNoticeMapper>;
          sysOperLogMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysOperLogMapper>;
          sysPostMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysPostMapper>;
          sysRoleDeptMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysRoleDeptMapper>;
          sysRoleMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysRoleMapper>;
          sysRoleMenuMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysRoleMenuMapper>;
          sysUserMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysUserMapper>;
          sysUserPostMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysUserPostMapper>;
          sysUserRoleMapper: AutoInstanceType<typeof ExportDbMysqlRuoyiSysUserRoleMapper>;
        }
      }
    }
  }
}
