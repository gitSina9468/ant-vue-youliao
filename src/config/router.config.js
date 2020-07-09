// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView,IframeFReportView,IframePageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // 外部链接
          {
            path: 'baidu',
            name: 'Monitor',
            component:IframePageView,
            meta: { title: '百度一下', url:"https://www.baidu.com/",id:"baidu" }
          },
          {
            path: '/dashboard/guide',
            name: 'Guide',
            component: () => import('@/views/dashboard/Guide'),
            meta: { title: '系统大纲', keepAlive: true }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '测试功能', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      // system
      {
        path: '/sys',
        name: 'system',
        component: RouteView,
        redirect: '/sys/menu',
        meta: { title: '系统管理', icon: "setting" },
        children: [
          {
            path: '/sys/user',
            name: 'user',
            component: () => import('@/views/system/UserList'),
            meta: { title: '用户管理', keepAlive: true }
          },
          {
            path: '/sys/role',
            name: 'role',
            component: () => import('@/views/system/RoleList'),
            meta: { title: '角色管理', keepAlive: true }
          },
          {
            path: '/sys/menu',
            name: 'menu',
            component: () => import('@/views/system/PermissionList'),
            meta: { title: '菜单管理', keepAlive: true }
          },
          {
            path: '/sys/dept',
            name: 'dept',
            component: () => import('@/views/system/DepartList'),
            meta: { title: '部门管理', keepAlive: true }
          },
          {
            path: '/sys/userDept',
            name: 'userDept',
            component: () => import('@/views/system/DepartUserList'),
            meta: { title: '部门用户', keepAlive: true }
          },
          {
            path: '/sys/job',
            name: 'job',
            component: () => import('@/views/system/JobList'),
            meta: { title: '岗位管理', keepAlive: true }
          }
        ]
      },
      // iframe
      {
        path: '/iframe',
        name: 'iframe',
        component: RouteView,
        meta: { title: '网页链接', icon: "branches" },
        children: [
          {
            path: '/swagger-ui.html',
            name: 'swagger',
            component:IframePageView,
            meta: { title: 'swagger文档',url:"http://localhost:8080/api/swagger-ui.html",id:"swagger" }
          },
          {
            path: '/druid/login.html',
            name: 'druid',
            component:IframePageView,
            meta: { title: '数据库监控',url:"http://localhost:8080/api/druid/login.html",id:"druid" }
          },
          {
            path: '/swagger-bootstrap-ui/index.html',
            name: 'swagger-bootstrap-ui',
            component:IframePageView,
            meta: { title: 'bootstrap-ui文档',url:"http://localhost:8080/api/doc.html",id:"xdoc" }
          },
          {
            path: '/screen/LED',
            name: 'LED',
            component:IframePageView,
            meta: { title: '叫号大厅',url:"http://localhost:8080/api/screen/LED",id:"LED" }
          },
          {
            path: '/log/view',
            name: 'log',
            component:IframePageView,
            meta: { title: '进程日志',url:"http://localhost:8080/api/log/view",id:"log" }
          }
        ]
      },
      // 系统监控
      {
        path: '/monitor',
        name: 'monitor',
        redirect: '/monitor/disk',
        component: RouteView,
        meta: { title: '系统监控', icon: "dashboard" },
        children: [
          {
            path: '/monitor/disk',
            name: 'disk',
            component: () => import('@/views/youliao/monitor/Disk'),
            meta: { title: '磁盘信息' }
          },
          {
            path: '/monitor/httpTrace',
            name: 'httpTrace',
            component: () => import('@/views/youliao/monitor/HttpTrace'),
            meta: { title: '请求日志' }
          },
          {
            path: '/monitor/jvmInfo',
            name: 'jvmInfo',
            component: () => import('@/views/youliao/monitor/JvmInfo'),
            meta: { title: 'JVM信息' }
          },
          {
            path: '/monitor/server',
            name: 'server',
            component: () => import('@/views/youliao/monitor/Server'),
            meta: { title: '服务器信息' }
          },
          {
            path: '/monitor/tomcatInfo',
            name: 'tomcat',
            component: () => import('@/views/youliao/monitor/TomcatInfo'),
            meta: { title: 'Tomcat信息' }
          },
          {
            path: '/monitor/redis',
            name: 'redis',
            component: () => import('@/views/youliao/monitor/Redis'),
            meta: { title: 'Redis信息' }
          }
        ]
      },
      // 常见案列
      {
        path: '/youliao',
        name: 'youliao',
        redirect: '/youliao/printDemo',
        component: PageView,
        meta: { title: '常见案列', icon: "qrcode" },
        children: [
          {
            path: '/youliao/printDemo',
            name: 'printDemo',
            component: () => import('@/views/youliao/PrintDemo'),
            meta: { title: '打印测试' }
          },
          {
            path: '/youliao/oss',
            name: 'OSSFileList',
            component: () => import('@/views/youliao/oss/OSSFileList'),
            meta: { title: 'OSS存储' }
          },
          {
            path: '/youliao/bill',
            name: 'pdf小票预览',
            component: () => import('@/views/youliao/PdfBill'),
            meta: { title: 'pdf小票预览' },
          }
        ]
      },
      // 图表案列
      {
        path: '/viser',
        name: 'viser',
        redirect: '/viser/radar',
        component: PageView,
        meta: { title: '图表案列', icon: "radar-chart" },
        children: [
          {
            path: '/viser/radar',
            name: 'radar',
            component: () => import('@/views/viser/radar'),
            meta: { title: '雷达图' }
          },
          {
            path: '/viser/pie',
            name: 'pie',
            component: () => import('@/views/viser/pie'),
            meta: { title: '饼状图' }
          },
          {
            path: '/viser/analysis',
            name: 'analysis',
            component: () => import('@/views/viser/analysis'),
            meta: { title: '走向图' }
          },
          {
            path: '/viser/elements',
            name: 'elements',
            component: () => import('@/views/viser/elements'),
            meta: { title: '元素周期表' }
          },
          {
            path: '/viser/cpu',
            name: 'cpu',
            component: () => import('@/views/viser/cpu'),
            meta: { title: 'cpu监控' }
          },
          {
            path: '/viser/rose',
            name: 'rose',
            component: () => import('@/views/viser/rose'),
            meta: { title: '玫瑰图' }
          },
          {
            path: '/viser/ring',
            name: 'ring',
            component: () => import('@/views/viser/ring'),
            meta: { title: '环形图' }
          },
          {
            path: '/viser/word-cloud',
            name: 'word-cloud',
            component: () => import('@/views/viser/wordCloud'),
            meta: { title: '词云' }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
