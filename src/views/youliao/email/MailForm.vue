<template>
  <a-modal :width="1200" :visible="visible" title="邮件发送" @ok="handleSubmit" @cancel="handleCancel">
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-row justify="center">
        <a-col :span="24">
          <a-form-item
            label="邮件主题"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              v-decorator="[
            'subject',
            {rules: [{ required: true, message: '请输入邮件主题' }]}
          ]"
              name="name"
              placeholder="请输入邮件主题"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row justify="center">
        <a-col :span="24">
          <a-form-item
            label="收件邮箱"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              placeholder="请输入收件邮箱"
              v-decorator="[
            'receiveEmail',
            {rules: [{required: true,type: 'email', message: '请输入正确格式的收件邮箱!',}]}
          ]"/>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row justify="center">
        <a-col :span="24">
          <a-form-item
            label="邮件附件"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-upload
              :action="uploadAction"
              :multiple="true"
              :file-list="fileList"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <a-button> <a-icon type="upload" /> Upload </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row justify="center">
        <a-col :span="16" :offset="6">
          <quill-editor style="height: 450px" ref="editor" :value="content" @change="editorContent"></quill-editor>
        </a-col>
      </a-row>

      <a-row justify="center">
        <a-col :span="24">
          <a-form-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center"
          >
            <a-button htmlType="submit" type="primary">添加邮件</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

  </a-card>
  </a-modal>
</template>

<script>
  import {postAction } from '@/api/manage'
  import QuillEditor from '@/components/Editor/QuillEditor';
  import ARow from "ant-design-vue/es/grid/Row";

  export default {
    name: 'MailForm',
    components: {ARow, QuillEditor},
    data() {
      return {
        model:{},
        visible: false,
        form: this.$form.createForm(this),
        content:null,
        // fileUpload: window._CONFIG['domianURL']+"/sys/common/uploadAttach",
        fileUpload:"http://localhost:8080/api/sys/common/uploadAttach",
        list:[],
        fileList: [],
        url:"/sys/mail/insert"
      }
    },
    computed:{
      uploadAction:function () {
        return this.fileUpload;
      }
    },
    methods: {
      add () {
        this.form.resetFields();
        this.fileList = [],
        this.visible = true,
        this.content = null
      },
      handleCancel () {
        this.close()
      },
      close(){
        this.visible = false,
        this.$emit('ok');
      },
      handleSubmit(e) {
        const that = this;
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(this.$refs.editor.content)
            console.log('Received values of form: ', values)
            if (!this.content) {
              that.$message.error("请编辑邮件内容");
              return false;
            }
            let formData = Object.assign(this.model, values);
            formData.content = this.content;
            this.fileList.filter(item =>
              this.list.push(item.response.result.url)
            )
            formData.list = this.list;
            postAction(that.url, formData).then((res) => {
              if (res.code == 200) {
                that.$message.success(res.remark);
                that.$emit('ok');
                that.close();
              } else {
                that.$message.warning(res.remark);
              }
            }).finally(() => {
            })
          }
        })
      },
      //附件上传暂时不超过5M 附件太大影响邮件发送
      beforeUpload(file) {
        if(!file){
          this.$message.warning('请上传附件');
          return false;
        }
        //文件上传不超过5M判断
        const isLt5M = file.size / 1024 / 1024 < 5;
        if(!isLt5M) {
          this.$message.warning('上传附件大小不能超过 5MB!');
          return false;
        }
        return true
      },
      handleChange(info) {

        let fileList = [...info.fileList];

        // 附件取最近上传的3个
        fileList = fileList.slice(-3);
        fileList.forEach((file,index,array)=>{
          //上传附件大小不超过5M
          if (file.size / 1024 / 1024 > 5) {
            fileList.splice(index, 1);
          }
        })
        this.fileList = fileList;
      },
      editorContent(data) {
          this.content = data;
      }
    }
  }
</script>
