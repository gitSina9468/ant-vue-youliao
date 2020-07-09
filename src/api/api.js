import { getAction,deleteAction,putAction,postAction} from '@/api/manage'


//角色管理
const addRole = (params)=>postAction("/sys/role/insert",params);
const editRole = (params)=>putAction("/sys/role/update",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryRoleAll = (params)=>getAction("/sys/role/getAllList",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/insert",params);
const editUser = (params)=>putAction("/sys/user/update",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);
//验证用户账号是否唯一
const checkUsername = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changPassword = (params)=>putAction("/sys/user/changPassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/menu/insert",params);
const editPermission= (params)=>putAction("/sys/menu/update",params);
const getPermissionList = (params)=>getAction("/sys/menu/list",params);
const queryTreeList = (params)=>getAction("/sys/role/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryRolePermission = (params)=>getAction("/sys/menu/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/sys/role/saveRolePermission",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/sys/dept/queryTreeList",params);
const queryIdTree = (params)=>getAction("/sysdepart/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sysdepart/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sys/dept/searchByKeywords",params);
const deleteByDepartId   = (params)=>deleteAction("/sys/dept/delete",params);

//职位管理
const queryJobAll   = (params)=>getAction("/sys/job/getAllList",params);

//日志管理
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典 待接入
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);

//获取系统访问量
const getLoginInfo = (params)=>getAction("/sys/loginInfo",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);

export {
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryRoleAll,
  queryJobAll,
  frozenBatch,
  checkUsername,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryRolePermission,
  saveRolePermission,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  getLoginInfo,
  queryUserByDepId,
  duplicateCheck,
  queryTreeListForRole,
}



