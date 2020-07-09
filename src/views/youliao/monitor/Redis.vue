<template>
  <a-skeleton active :loading="loading" :paragraph="{rows: 17}">
    <a-card>
      <!-- Radis 信息实时监控 -->
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="RedisMemory" key="1">
        </a-tab-pane>
        <a-tab-pane tab="DbSize" key="2">
        </a-tab-pane>
        <a-tab-pane tab="RedisCPU" key="3">
        </a-tab-pane>
        <a-tab-pane tab="RedisServer" key="4">
        </a-tab-pane>
      </a-tabs>

      <div v-if="tab == '2'">
        <a-row>
          <h4 :style="{ marginBottom: '20px' }">DBSize柱状图</h4>
          <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
            <v-chart :forceFit="true" :height="height" :data="barData" :scale="scale" :width="width">
              <v-tooltip />
              <v-axis />
              <v-bar position="x*y" />
            </v-chart>
          </a-col>
        </a-row>
      </div>

      <h3>Redis 详细信息</h3>
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :dataSource="redisInfo"
        :pagination="false"/>

    </a-card>
  </a-skeleton>
</template>
<script>
  import { getAction } from '@/api/manage'

  const scale = [{
    dataKey: 'y',
    tickInterval: 20,
  }];

  export default {
    name: 'RedisInfo',
    components: {
    },
    data() {
      return {
        tab:"",
        loading: false,
        tableLoading: true,
        redisInfo: [],
        columns: [{
          title: '参数',
          align: 'center',
          dataIndex: 'key'
        }, {
          title: '描述',
          align: 'left',
          dataIndex: 'description'
        }, {
          title: '当前值',
          align: 'center',
          dataIndex: 'value'
        }],
        url: {
          redisInfo: '/actuator/monitor/redisInfo/',
          keySizeInfo: '/actuator/monitor/redisInfo/keySize'
        },
        barData:[],
        scale,
        height: 400,
        width: 1200

      }
    },
    mounted() {
      this.loadKeySize()
      this.loadRedisInfo()
    },
    methods: {

      loadRedisInfo() {
        this.tableLoading = true
        getAction(this.url.redisInfo+1).then((res) => {
          this.redisInfo = res.result
        }).finally(() => {
          this.tableLoading = false
        })
      },
      callback(key) {
        this.tab = key;
        getAction(this.url.redisInfo+key).then((res) => {
          this.redisInfo = res.result
        }).finally(() => {
          this.tableLoading = false
        })
      },
      loadKeySize(){
        getAction(this.url.keySizeInfo).then((res) => {
          this.barData = res.result;
        })
      },

    }
  }
</script>
<style></style>
