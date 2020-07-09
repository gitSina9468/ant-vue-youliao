<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="font-size: 24px;font-weight: 800">手机销量单</p>
      </div>
      <!--签字-->
      <a-col :md="24" :sm="24">
        <div class="sign" style="text-align: left;height: inherit">
          <a-col :span="24">
          <span>
            销售片区:
          </span>
            <a-input style="width: 30%" v-model="printer"/>
            <span style="margin-left: 12.5%">销售日期:</span>
            <a-input style="width: 30%" v-model="printTime"/>
          </a-col>
          <a-col :span="24">
          </a-col>
          <a-col :span="24" style="margin-top: 20px">
            <span>报告内容:</span>
            <a-input style="width: 80%" v-model="printContent"/>
          </a-col>
          <a-col :span="24" style="margin-top: 20px">
            <span>报告目的:</span>
            <a-input style="width: 80%" v-model="printReason"/>
          </a-col>
          <a-col style="margin-top: 20px" :span="24">
            <span>附件图片:</span>
            <br/>
            <a-upload
              action="/jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange">
              <div v-if="fileList.length < 3">
                <a-icon type="plus"/>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage"/>
            </a-modal>
          </a-col>
        </div>
      </a-col>
      <a-col :span="24">
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :loading="memberLoading"
        >
          <template v-for="(col, i) in ['name', 'workId', 'department','description']" :slot="col" slot-scope="text, record">
            <a-input
              :key="col"
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              :placeholder="columns[i].title"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="operation" slot-scope="text, record">
            <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
              <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
            </template>
            <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          </template>
        </a-table>
        <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">销量录入</a-button>
      </a-col>
    </section>
  </a-card>
  <!--</page-layout>-->
</template>
<script>
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";
  import ATextarea from 'ant-design-vue/es/input/TextArea'


  export default {
    components: {
      ATextarea,
      ARow,
      ACol,
    },
    name: 'Printgzsld',
    props: {
      reBizCode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        memberLoading: false,
        // table
        columns: [
          {
            title: '手机名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '销售量',
            dataIndex: 'workId',
            key: 'workId',
            width: '20%',
            scopedSlots: { customRender: 'workId' }
          },
          {
            title: '所属种类',
            dataIndex: 'department',
            key: 'department',
            width: '20%',
            scopedSlots: { customRender: 'department' }
          },
          {
            title: '说明',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            scopedSlots: { customRender: 'description' }
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        data: [
          {
            key: '1',
            name: '华为手机',
            workId: '15676',
            editable: false,
            department: 'mate30pro',
            description:'促销优惠'
          },
          {
            key: '2',
            name: '苹果iphonex',
            workId: '7643',
            editable: false,
            department: 'iphonex',
            description:'抢手货'
          },
          {
            key: '3',
            name: '小米10',
            workId: '34521',
            editable: false,
            department: 'xiaomi',
            description:'国产优惠机'
          }
        ],
        labelCol: {
          xs: {span: 24},
          sm: {span: 2},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        printer: '西南片区',
        printTime: '2020年第一季度',
        printContent: '片区各类手机销量统计',
        printReason: '本年度第一季度汇总统计分析对比',
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://youliao-seahorse.oss-cn-beijing.aliyuncs.com/jpg/20200409/57c457cff84daf28.jpg',
        },
          {
            uid: '-2',
            name: 'pic1.png',
            status: 'done',
            url: 'http://youliao-seahorse.oss-cn-beijing.aliyuncs.com/jpg/20200409/11ee53eaff891a84.jpg',
          },
          {
            uid: '-3',
            name: 'pic1.png',
            status: 'done',
            url: 'http://youliao-seahorse.oss-cn-beijing.aliyuncs.com/jpg/20200409/d3273e91acc45417.jpg',
          }
        ],
        url: {
          loadApplicant: "/sps/register/loadApplicants",
          loadRegisterFiles: "/sps/register/getRegisterFilesConfig",
        }
      }
    },
    created() {
      this.getDate();
    },
    methods: {
      loadData() {

      },
      getDate() {
        // 当前时间
      },
      handleCancel() {
        this.previewVisible = false
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange({fileList}) {
        this.fileList = fileList
      },
      newMember () {
        const length = this.data.length
        this.data.push({
          key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
          name: '',
          workId: '',
          department: '',
          editable: true,
          isNew: true
        })
      },
      remove (key) {
        const newData = this.data.filter(item => item.key !== key)
        this.data = newData
      },
      saveRow (record) {
        this.memberLoading = true
        const { key, name, workId, department } = record
        if (!name || !workId || !department) {
          this.memberLoading = false
          this.$message.error('请填写完整成员信息。')
          return
        }
        // 模拟网络请求、卡顿 800ms
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ loop: false })
          }, 800)
        }).then(() => {
          const target = this.data.find(item => item.key === key)
          target.editable = false
          target.isNew = false
          this.memberLoading = false
        })
      },
      toggle (key) {
        const target = this.data.find(item => item.key === key)
        target._originalData = { ...target }
        target.editable = !target.editable
      },
      getRowByKey (key, newData) {
        const data = this.data
        return (newData || data).find(item => item.key === key)
      },
      cancel (key) {
        const target = this.data.find(item => item.key === key)
        Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
        target._originalData = undefined
      },
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
    }
  }
</script>
<style scoped>
  .abcdefg .ant-card-body {
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 1%;
    border: 0px solid black;
    min-width: 800px;
  }

  .explain {
    text-align: left;
    margin-left: 50px;
  }

  .explain .ant-input, .sign .ant-input {
    font-weight: bolder;
    text-align: center;
    border-left-width: 0px !important;
    border-top-width: 0px !important;;
    border-right-width: 0px !important;;
  }

  .explain div {
    margin-bottom: 10px;
  }

  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>