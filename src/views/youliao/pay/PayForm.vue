<template>
  <a-modal :width="800" :visible="visible" title="支付测试" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="spinning" tip="Loading...">
    <a-form @submit="handleSubmit" :form="form" v-if="formVisible">
      <a-form-item
        label="支付案列"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select placeholder="请选择支付案列" v-decorator="['productName', {rules:[{required: true, message: '请选择支付案列'}]}]">
          <a-select-option value="地铁卡充值">地铁卡充值</a-select-option>
          <a-select-option value="Q币充值">Q币充值</a-select-option>
          <a-select-option value="水电气缴费">水电气缴费</a-select-option>
          <a-select-option value="disabled" disabled>更多敬请期待...</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="充值金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-checkbox-group>
          <a-radio-group :options="options" @change="onChange" v-decorator="['payFee', {rules:[{required: true,message: '选择充值金额'}]}]" />
        </a-checkbox-group>
      </a-form-item>
      <a-form-item
        label="支付类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select placeholder="支付方式" v-decorator="['payType', {rules:[{required: true, message: '选择支付方式'}]}]">
          <a-select-option value="1">微信</a-select-option>
          <a-select-option value="2">支付宝</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="商品描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea :rows="5" v-decorator="['description',{rules:[{required: true, message: '商品描述'}]}]"></a-textarea>
      </a-form-item>

    </a-form>
    </a-spin>

    <a-card  v-if="showQRCode" :bordered="false" style="margin: -24px -24px 0px;">
      <result type="success" :description="description" :title="title">
        <template slot="action">
          <a-button type="primary" @click="backList">返回列表</a-button>
          <a-button style="margin-left: 8px" @click="payOrder">前去支付</a-button>
        </template>

      </result>
    </a-card>
  </a-modal>
</template>

<script>
import {postAction,getAction } from '@/api/manage'
import { Result } from '@/components'
export default {
  name: 'PayForm',
  components: {
    Result,
  },
  data () {
    return {
       model:{},
       orderNo:"",
       spinning: false,
       formVisible:true,
       showQRCode:false,
       options :[
        { label: '0.01元', value: '0.01' },
        { label: '0.1元', value: '0.1' },
        { label: '1元', value: '1' },
        { label: '10元', value: '10' },
      ],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      url:{
         createOrder:"/fmsPayOrder/unifiedOrder", //订单下单
      },
      visible: false,
      form: this.$form.createForm(this),
      title: '下单成功',
      description: '订单下单成功!!! \r\n' +
      ' 请前去支付体验扫码付。\r\n'+
      ' 请注意这是真实交易。\r\n',
    }
  },
  created(){

  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      const { form: { setFieldsValue } } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({ taskName: 'test' })
      })
    },
    payOrder(){
      if(this.model.payType == "1"){
        //微信
        window.open(window._CONFIG['domianURL']+"/pay.html?type=wx&orderNo=" + this.orderNo)
      }else{
        //支付宝
        window.open(window._CONFIG['domianURL']+"/pay.html?type=ali&orderNo=" +  this.orderNo)
      }
    },
    backList(){
      this.close()
    },
    handleCancel () {
      this.close()
    },
    close(){
      this.visible = false,
      this.formVisible = true,
      this.showQRCode=false,
      this.$emit('ok');
    },
    handleSubmit () {
      // this.visible = true
      const that = this;
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.spinning = true;
          console.log('values', values)
          let formData = Object.assign(this.model, values);
          let obj;
          console.log(formData)
          if(!this.model.id){
            postAction(that.url.createOrder,formData).then((res)=>{
              that.spinning = false;
              if(res.code == 200){
                //隐藏表单
                that.formVisible = false;
                that.orderNo = res.result;
                //展示结果
                that.showQRCode = true;
              }else{
                that.$message.warning(res.remark);
              }
            }).finally(() => {
            })
          }
          // obj.then((res)=>{
          //   if(res.code == 200){
          //     that.$message.success(res.remark);
          //     that.$emit('ok');
          //     that.close();
          //   }else{
          //     that.$message.warning(res.remark);
          //   }
          // }).finally(() => {
          //   that.confirmLoading = false;
          //   // that.close();
          // })
        }

      })
    },
    onChange(e) {
      console.log('radio2 checked', e.target.value);
    },
  }
}
</script>
