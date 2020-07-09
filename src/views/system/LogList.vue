<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="菜单模块">
              <a-input placeholder="请输入菜单模块查询" v-model="queryParam.menu"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="操作类型">
              <a-select v-model="queryParam.operationType" placeholder="请选择操作类型">
                <a-select-option value="">请选择操作类型</a-select-option>
                <a-select-option value="ADD">新增</a-select-option>
                <a-select-option value="UPDATE">编辑</a-select-option>
                <a-select-option value="DELETE">删除</a-select-option>
                <a-select-option value="PAY">支付</a-select-option>
                <a-select-option value="REFUND">退款</a-select-option>
                <a-select-option value="UPLOAD">上传</a-select-option>
                <a-select-option value="DOWNLOAD">下载</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="执行结果">
              <a-select v-model="queryParam.result" placeholder="请选择状态查询">
                <a-select-option value="">请选择状态</a-select-option>
                <a-select-option value="成功">成功</a-select-option>
                <a-select-option value="失败">失败</a-select-option>
              </a-select>
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

        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">请求参数:{{record.requestParams}}
          <br/>返回参数:{{record.responseParams}}
          <br/>异常信息:{{record.exception}}
        </p>

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
        description: '这是系统日志页面',
        queryParam: {},
        columns: [
          {
            title: '菜单模块',
            align: "center",
            dataIndex: 'menu',
            width: 120
          },
          {
            title: '操作按钮',
            align: "center",
            width: 100,
            dataIndex: 'button',
          },
          {
            title: '执行方法',
            align: "center",
            width: 120,
            dataIndex: 'methodName'
          },
          {
            title: 'ip',
            width:80,
            align:"center",
            dataIndex: 'host'
          },
          {
            title: 'targetName',
            align: "center",
            width: 100,
            dataIndex: 'targetName'
          },
          {
            title: '操作类型',
            align: "center",
            width: 120,
            dataIndex: 'operationType'
          },
          {
            title: '执行结果',
            align: "center",
            width: 80,
            dataIndex: 'result'
          },
          {
            title: '操作人',
            align: "center",
            width: 100,
            dataIndex: 'operationUser',
          },
          {
            title: '操作时间',
            align: "center",
            width: 150,
            dataIndex: 'createTime',
            sorter: true
          }
        ],
        url: {
          list: "/sys/log/getPageList",
        },
      }
    },
    methods: {

    }

  }
</script>