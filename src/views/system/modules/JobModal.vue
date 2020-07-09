<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务编码">
          <a-input placeholder="请输入职务编码" v-decorator="['code', validatorRules.code]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务名称">
          <a-input placeholder="请输入职务名称" v-decorator="['job', validatorRules.job]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-textarea :rows="5" placeholder="..." v-decorator="[ 'remark', {} ]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { httpAction } from '@/api/manage'
  import { duplicateCheck } from '@/api/api'

  let validatorCodeTimer = null

  export default {
    name: 'JobModal',
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          code: {
            rules: [
              { required: true, message: '请输入职务编码' },
              // {
              //   validator: (rule, value, callback) => {
              //     // 函数消抖的简单实现，防止一段时间内发送多次请求
              //     if (validatorCodeTimer) {
              //       // 停止上次开启的定时器
              //       clearTimeout(validatorCodeTimer)
              //     }
              //     validatorCodeTimer = setTimeout(() => {
              //       duplicateCheck({
              //         tableName: 'sys_position',
              //         fieldName: 'code',
              //         fieldVal: value,
              //         dataId: this.model.id
              //       }).then((res) => {
              //         if (res.success) {
              //           callback()
              //         } else {
              //           callback(res.message)
              //         }
              //       }).catch(console.error)
              //     }, 300)
              //   }
              // }
            ]
          },
          job: { rules: [{ required: true, message: '请输入职务名称' }] },
          postRank: { rules: [{ required: true, message: '请选择职级' }] },
        },
        url: {
          add: '/sys/job/insert',
          edit: '/sys/job/update',
        },
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,
            'code',
            'job',
            'remark',
          ))
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let httpurl = ''
            let method = 'post'
            if (!this.model.id) {
              httpurl += this.url.add
            } else {
              httpurl += this.url.edit
            }

            let formData = Object.assign(this.model, values)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.code == 200) {
                that.$message.success(res.remark)
                that.$emit('ok')
              } else {
                that.$message.warning(res.remark)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>