<template>
  <a-card :bordered="false">

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="refreshTable()" type="default" icon="reload" :loading="loading">刷新</a-button>
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button
        @click="batchDel"
        v-if="selectedRowKeys.length > 0"
        ghost
        type="primary"
        icon="delete">批量删除
      </a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        :columns="columns"
        size="middle"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

        <template slot="type" slot-scope="text, record">
          <a-tag color="blue" v-if="record.type == 1">目录</a-tag>
          <a-tag color="cyan" v-if="record.type == 2">菜单</a-tag>
          <a-tag color="purple" v-if="record.type == 3">按钮</a-tag>
        </template>

        <template slot="icon" slot-scope="text, record">
          <a-icon :type="record.icon" v-if="record.icon"/> {{ record.icon }}
        </template>
        <template slot="permission" slot-scope="text, record">
          <template v-if="!record.permission">- -</template>
          <template v-else>
            <a-tag color="purple">{{ record.permission }}</a-tag>
          </template>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>

    </div>
    <!-- table区域-end -->

    <permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>

  </a-card>
</template>

<script>
  import PermissionModal from './modules/PermissionModal'
  import {getPermissionList} from '@/api/api'
  import {TableListMixin} from '@/mixins/TableListMixin'
  import '@/assets/less/common.css';

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menu',
      key: 'menu'
    }, {
      title: '菜单类型',
      dataIndex: 'type',
      key: 'type',
      scopedSlots: {customRender: 'type'}
    },{
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
      scopedSlots: {customRender: 'icon'}
    },{
      title: '权限标识',
      dataIndex: 'permission',
      key: 'permission',
      scopedSlots: {customRender: 'permission'}
    },
    {
      title: '组件名称',
      dataIndex: 'componentName',
      key: 'componentName',
      scopedSlots: {customRender: 'componentName'}
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      scopedSlots: {customRender: 'path'}
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '启用',
      dataIndex: 'visible',
      key: 'visible',
      customRender: function (text) {
        if (text) {
          return '启用'
        } else {
          return '禁用'
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: {customRender: 'action'},
      align: 'center',
      width: 150
    }
  ]

  export default {
    name: 'PermissionList',
    mixins: [TableListMixin],
    components: {
      PermissionModal
    },
    data() {
      return {
        loading: false,
        description: '这是菜单管理页面',
        // 表头
        columns: columns,
        url: {
          list: '/sys/menu/list',
          delete: '/sys/menu/delete',
          deleteBatch: '/sys/menu/deleteBatch'
        }
      }
    },
    methods: {
      loadData() {
        this.dataSource = []
        getPermissionList().then((res) => {
          if (res.code == 200) {
            console.log(res.result)
            this.dataSource = res.result
          }
        })
      },
      refreshTable(){
        this.loading = true
        this.loadData();
        this.loading = false
      }
    }
  }
</script>
