<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <!--<head-info style="color: #13c2c2" title="支付金额" :content={{// orderCount.payTotalFee}} :bordered="true"/>-->
          <div class="head-info" :class="center && 'center'">
            <span>支付金额</span>
            <p>{{ orderCount.payTotalFee }}</p>
            <!--<em/>-->
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <!--<head-info title="退款金额" :content={{orderCount.refundTotalFee}} :bordered="true"/>-->
          <div class="head-info" :class="center && 'center'">
            <span>退款金额</span>
            <p>{{ orderCount.refundTotalFee }}</p>
            <!--<em/>-->
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <!--<head-info title="支付笔数" :content="{{orderCount.size}}"/>-->
          <div class="head-info" :class="center && 'center'">
            <span>支付笔数</span>
            <p>{{ orderCount.size }}</p>
            <em/>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false">

      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :md="6" :sm="8">
              <a-form-item label="商品">
                <a-select v-model="queryParam.productName" placeholder="请选择支付商品">
                  <a-select-option value="地铁卡充值">地铁卡充值</a-select-option>
                  <a-select-option value="Q币充值">Q币充值</a-select-option>
                  <a-select-option value="水电气缴费">水电气缴费</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="支付方式">
                <a-select v-model="queryParam.payType" placeholder="请选择支付方式">
                  <a-select-option value="1">微信</a-select-option>
                  <a-select-option value="2">支付宝</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="支付状态">
                <a-select v-model="queryParam.payStatus" placeholder="请选择支付状态">
                  <a-select-option value="0">下单</a-select-option>
                  <a-select-option value="1">支付中</a-select-option>
                  <a-select-option value="2">支付失败</a-select-option>
                  <a-select-option value="3">支付成功</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="toggleSearchStatus">
              <a-col :md="6" :sm="8">
                <a-form-item label="商户订单号">
                  <a-input placeholder="请输入商户订单号" v-model="queryParam.outTradeNo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="8">
                <a-form-item label="订单号">
                  <a-input placeholder="请输入订单号" v-model="queryParam.orderNo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="8">
                <a-form-item label="是否退款">
                  <a-select v-model="queryParam.orderRefundStatus" placeholder="请选择退款状态">
                    <a-select-option value="true">是</a-select-option>
                    <a-select-option value="false">否</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="8">
                <a-form-item label="支付金额">
                  <a-input-number
                    v-model="queryParam.min"
                    :defaultValue="0.01"
                    :step="0.01"
                    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    @change="onChange"
                  /> -
                  <a-input-number
                    v-model="queryParam.max"
                    :defaultValue="10"
                    :step="0.1"
                    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    @change="onChange"
                  />
                </a-form-item>
              </a-col>

            </template>

            <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%;margin-bottom: 20px" icon="plus" @click="$refs.payForm.add()">支付一笔</a-button>
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

        <template slot="statusSlot" slot-scope="text, record, index">
          <a-tag color="orange" v-if="record.payStatus == 0">下单</a-tag>
          <a-tag color="blue" v-if="record.payStatus == 1">支付中</a-tag>
          <a-tag color="gray" v-if="record.payStatus == 2">支付失败</a-tag>
          <a-tag color="green" v-if="record.payStatus == 3">支付成功</a-tag>
        </template>

        <span slot="action" slot-scope="text, record">
           <a href="javascript:;" v-if="record.payStatus == 0" @click="toPay(record)">支付</a>
          <a-divider type="vertical"/>

          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" v-if="record.orderRefundStatus" @click="refundDetail(record.userName)">退款明细</a>
              </a-menu-item>

               <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">第三方查询</a>
              </a-menu-item>

               <a-menu-item>
                <a v-if="record.payStatus == 0" @click="orderDelete(record.id)">删除</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm v-if="record.payStatus == 3" title="确定退款吗?" @confirm="() => handleReFund(record)">
                  <a>退款</a>
                </a-popconfirm>
              </a-menu-item>

            </a-menu>
          </a-dropdown>
        </span>

      </a-table>

      <pay-form ref="payForm" @ok="modalFormOk"/>
    </a-card>
  </div>
</template>

<script>
  import {TableListMixin} from '@/mixins/TableListMixin'
  import {getAction } from '@/api/manage'
  import HeadInfo from '@/components/tools/HeadInfo'
  import PayForm from './PayForm'

  export default {
    name: 'PayList',
    mixins: [TableListMixin],
    components: {
      HeadInfo,
      PayForm
    },
    data () {
      return {
        status: 'all',
        loading:false,
        orderCount:{},
        columns: [
          {
            title: '订单号',
            align: "center",
            dataIndex: 'orderNo'
          },
          {
            title: '商品名',
            align: "center",
            dataIndex: 'productName'
          },
          {
            title: '商户订单号',
            align: "center",
            dataIndex: 'outTradeNo'
          },
          {
            title: '支付流水号',
            align: "center",
            dataIndex: 'transactionId'
          },
          {
            title: '支付类型',
            align: "center",
            width: 120,
            dataIndex: 'payType',
            customRender: function (text) {
              if (text == 1) {
                return "微信";
              }
              if (text == 2) {
                return "支付宝";
              }
            }
          },
          {
            title: '支付金额',
            align: "center",
            dataIndex: 'payFee'
          },
          {
            title: '退款金额',
            align: "center",
            dataIndex: 'refundFee'
          },
          {
            title: '支付状态',
            align: "center",
            dataIndex: 'payStatus',
            scopedSlots: {customRender: "statusSlot"}
          },
          {
            title: '支付时间',
            align: "center",
            dataIndex: 'updateTime'
          },
          {
            title: '下单时间',
            align: "center",
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          orderCountUrl: "/fmsPayOrder/getPayOrderCount",
          list: "/fmsPayOrder/getPageList",
          delete: "/fmsPayOrder/delete"
        }
      }
    },
    created(){
      this.orderRecordCount()
    },
    methods: {
      orderDelete(id) {
        var that = this;
        that.$confirm({
          title: "确认删除",
          content: "是否删除选中订单?",
          onOk: function () {
            that.handleDelete(id)
          }
        });
      },
      toPay(record){
        if(record.payType == "1"){
          //微信
          window.open(window._CONFIG['domianURL']+"/pay.html?type=wx&orderNo=" + record.orderNo)
        }else{
          //支付宝
          window.open(window._CONFIG['domianURL']+"/pay.html?type=ali&orderNo=" + record.orderNo)
        }
      },
      refundDetail(){

      },
      handleReFund(){

      },
      orderRecordCount() {
        getAction(this.url.orderCountUrl,null).then((res)=>{
          if(res.code == 200){
            this.orderCount = res.result;
          }else{
            this.$message.warning(res.remark);
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }

  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    p {
      color: rgba(0, 0, 0, .85);
      font-size: 24px;
      line-height: 32px;
      margin: 0;
    }
    em {
      background-color: #e8e8e8;
      position: absolute;
      height: 56px;
      width: 1px;
      top: 0;
      right: 0;
    }
  }
</style>