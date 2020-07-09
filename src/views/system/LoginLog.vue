<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="登录账号">
              <a-input placeholder="请输入登录账号查询" v-model="queryParam.loginName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="登录ip">
              <a-input placeholder="请输入登录ip查询" v-model="queryParam.ip"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="登录地">
              <a-input placeholder="请输入登录地查询" v-model="queryParam.loginLocation"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div style="overflow-x: auto">

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {TableListMixin} from '@/mixins/TableListMixin'

  export default {
    name: "LogList",
    mixins: [TableListMixin],
    data() {
      return {
        description: '系统登录日志',
        queryParam: {},
        columns: [
          {
            title: '登录账号',
            align: "center",
            dataIndex: 'loginName',
            width: 120
          },
          {
            title: '登录ip',
            align: "center",
            width: 100,
            dataIndex: 'ip',
          },
          {
            title: '登录地',
            align: "center",
            width: 120,
            dataIndex: 'loginLocation'
          },
          {
            title: '登录时间',
            width:80,
            align:"center",
            dataIndex: 'loginTime'
          },
          {
            title: '操作系统',
            align: "center",
            width: 100,
            dataIndex: 'os'
          },
          {
            title: '浏览器',
            align: "center",
            width: 100,
            dataIndex: 'browser'
          },
          {
            title: '登录结果',
            align: "center",
            width: 80,
            dataIndex: 'status',
            customRender: function (text) {
              if (text == 0) {
                return '成功'
              } else {
                return '失败'
              }
            }
          }
        ],
        url: {
          list: "/login/log/getPageList",
        },
      }
    },

  }
</script>