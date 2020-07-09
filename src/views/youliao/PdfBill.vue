<template>
  <div style="background-color: #c5e3ec; padding: 50px;text-align: center">
    <p style="color: red;font-size: 25px">演示案列,点击可预览,动态数据采用freemarker渲染更新中...</p>
    <a-row :gutter="10" style="margin-bottom: 20px">
      <a-col :span="6" v-for="(bill,billindex) in list" :key="billindex.toString()">
        <a-card hoverable style="width: 300px" @click="billClick(bill.view)">
          <img
            alt="example"
            :src="bill.billUrl"
            slot="cover"
          />
          <a-card-meta :title="bill.title" :description="bill.description">
            <a-avatar
              slot="avatar"
              :src="bill.billUrl"/>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>
<script>

  export default {
    components: {
    },
    name: 'bill',
    props: {
      reBizCode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 2},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        list:[
          {
            billUrl:"http://tiyi.oss-cn-beijing.aliyuncs.com/test/20200102/9dac327eabf34f95897303d3b2951e05.png",
            title:"采血回执单",
            description:"医院采血小票",
            view:"/receipt2"
          },
          {
            billUrl:"http://tiyi.oss-cn-beijing.aliyuncs.com/test/20191229/20d5d782f7c6404f8720c6c1d9d38e68.png",
            title:"销售票据",
            description:"销售明细小票",
            view:"/bill"
          },
          {
            billUrl:"http://tiyi.oss-cn-beijing.aliyuncs.com/test/20191229/8792d0916531478ca3514eaa74a89380.png",
            title:"销售小票",
            description:"购物明细清单",
            view:"/receipt"
          },
          {
            billUrl:"https://test-hong-890219.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720191230195449.png",
            title:"办单凭证",
            description:"办单货物单据",
            view:"/bill2"
          }
        ]
      }
    },
    created() {
    },
    methods: {

      billClick(url){
        window.open(window._CONFIG['domianURL'] + "/qrCode" + url)
      }
    }
  }
</script>
<style scoped>

</style>