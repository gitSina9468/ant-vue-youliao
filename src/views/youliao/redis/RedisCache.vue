<template>
  <a-skeleton active :loading="loading" :paragraph="{rows: 17}">
    <a-card>
      <span>redis五大类数据类型管理实例<><><><>新添缓存数据在开发中......</span>
      <!-- Radis 缓存信息 -->
      <a-tabs defaultActiveKey="user*" @change="callback">
        <a-tab-pane tab="Object" key="object*">
        </a-tab-pane>
        <a-tab-pane tab="Map" key="map*">
        </a-tab-pane>
        <a-tab-pane tab="List" key="list*">
        </a-tab-pane>
        <a-tab-pane tab="Set" key="set*">
        </a-tab-pane>
        <a-tab-pane tab="ZSet" key="zSet*">
        </a-tab-pane>
      </a-tabs>

      <a-table
        :loading="tableLoading"
        :columns="columns"
        :dataSource="redisInfo"
        :pagination="true">

        <span slot="action" slot-scope="text, record">
             <a-popconfirm title="确定删除吗?" @confirm="() => Delete(record.key)">
                  <a>删除</a>
             </a-popconfirm>
        </span>
      </a-table>

    </a-card>
  </a-skeleton>
</template>
<script>
  import { getAction,deleteAction } from '@/api/manage'

  export default {
    name: 'RedisCache',
    data() {
      return {
        tab:"object*",
        queryParam: {},
        loading: false,
        tableLoading: true,
        redisInfo: [],
        columns: [{
          title: '参数key',
          align: 'center',
          dataIndex: 'key'
        },{
          title: '数据类型',
          align: 'left',
          dataIndex: 'type'
        },{
          title: '序列化value',
          align: 'left',
          dataIndex: 'value'
        },
          {
          title: '过期时间',
          align: 'center',
          dataIndex: 'expire'
        },{
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          redisInfo: '/redisson/keys',
          delete: '/redisson/deleteByKey',
        },

      }
    },
    mounted() {
      this.loadRedisCache("object*")
    },
    methods: {

      loadRedisCache(pattern) {

        this.tableLoading = true
        getAction(this.url.redisInfo,{"pattern":pattern}).then((res) => {
          this.redisInfo = res.result
        }).finally(() => {
          this.tableLoading = false
        })
      },
      callback(key) {
        this.tab = key;
        this.loadRedisCache(key)
      },
      Delete: function (key) {
        var that = this;
        deleteAction(that.url.delete, {key: key}).then((res) => {
          if (res.code == 200) {
            that.$message.success(res.remark);
            that.loadRedisCache(this.tab)
          } else {
            that.$message.warning(res.remark);
          }
        });
      },
    }
  }
</script>