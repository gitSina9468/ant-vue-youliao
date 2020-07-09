<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="收件邮箱">
              <a-input placeholder="请输入收件邮箱" v-model="queryParam.receiveEmail"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="邮件主题">
              <a-input placeholder="请输入邮件主题" v-model="queryParam.subject"></a-input>
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

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="$refs.mailForm.add()" type="primary" icon="plus">添加邮件发送</a-button>
    </div>
    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
           <a-popconfirm title="确定发送吗?" @confirm="() => sendMail(record.id)">
                  <a>发送</a>
           </a-popconfirm>
           <a-divider type="vertical"/>
           <a-popconfirm title="确定删除吗?" @confirm="() => mailDelete(record.id)">
                  <a>删除</a>
           </a-popconfirm>
        </span>

      </a-table>
      <!-- table区域-end -->
    </div>

    <mail-form ref="mailForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import {getAction } from '@/api/manage'
  import {TableListMixin} from '@/mixins/TableListMixin'
  import {downFile} from '@/api/manage';
  import '@/assets/less/common.css';
  import mailForm from './MailForm';

  export default {
    name: "OSSFileList",
    mixins: [TableListMixin],
    components: {
      mailForm
    },
    data() {
      return {
        description: '资源文件',
        queryParam: {},
        // 表头
        columns: [
          {
            title: '索引',
            align: "center",
            dataIndex: 'id',
            width: 60
          },
          {
            title: '收件邮箱',
            align: "center",
            dataIndex: 'receiveEmail',
            width: 200
          },
          {
            title: '主题',
            align: "center",
            width: 150,
            dataIndex: 'subject',
          },
          {
            title: ' 附件地址',
            align: "center",
            dataIndex: 'attachFiles',
            ellipsis: true,
          },
          {
            title: '发送时间',
            align: "center",
            dataIndex: 'sendTime',
            width: 150
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
            width: 150
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            width: 150
          }
        ],
        url: {
          list: "/sys/mail/getPageList",
          delete: "/sys/mail/delete",
          send:"/sys/mail/send"
        }
      }
    },
    methods: {
      onChange(e) {
        this.loadData();
      },
      mailDelete(id) {
        var that = this;
        that.handleDelete(id)
      },
      sendMail(id) {
        var that = this;
        getAction(this.url.send,{id:id}).then((res)=>{
          if(res.code == 200){
            that.$message.success("邮件发送成功");
            that.loadData()
          }else{
            that.$message.warning(res.remark);
          }
        })
      },
    }
  }
</script>
