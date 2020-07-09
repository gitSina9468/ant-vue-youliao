<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="handleCancel"
    :visible="drawerVisible"
    :confirmLoading="confirmLoading"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="菜单类型" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-radio-group @change="onChangeMenuType" v-decorator="['type',{'initialValue':1}]">
            <a-radio :value="1">一级菜单</a-radio>
            <a-radio :value="2">子菜单</a-radio>
            <a-radio :value="3">按钮/权限</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="menuLabel"
          hasFeedback >
          <a-input placeholder="请输入菜单名称" v-decorator="[ 'menu', validatorRules.menu]" :readOnly="disableSubmit"/>
        </a-form-item>


        <a-form-item
          v-show="localMenuType!=1"
          label="上级菜单"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol" >
          <a-tree-select
            style="width:100%"
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="treeData"
            v-model="model.pid"
            placeholder="请选择父级菜单"
            :disabled="disableSubmit">
          </a-tree-select>
        </a-form-item>

        <a-form-item
          v-show="pathShow"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="菜单路径">
          <a-input placeholder="请输入菜单路径" v-decorator="[ 'path',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前端路由">
          <a-input placeholder="请输入前端路由" v-decorator="[ 'component',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="路由名称">
          <a-input placeholder="请输入路由名称" v-decorator="[ 'componentName',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="localMenuType==1"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="跳转地址">
          <a-input placeholder="请输入跳转地址" v-decorator="[ 'redirect',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="!show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授权标识">
          <a-input placeholder="多个用逗号分隔, 如: user:list,user:create" v-decorator="[ 'permission',{}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="菜单图标">
          <a-input placeholder="点击右侧按钮选择图标" v-model="model.icon" :readOnly="disableSubmit">
            <a-icon slot="addonAfter" type="setting" @click="selectIcons" />
          </a-input>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number placeholder="请输入菜单排序" style="width: 200px" v-decorator="[ 'sort', {'initialValue':1.0,'rule':validatorRules.sort}]" :readOnly="disableSubmit"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否外链菜单">
          <a-switch checkedChildren="是" unCheckedChildren="否" v-model="isFrame"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否可见菜单">
          <a-switch checkedChildren="是" unCheckedChildren="否" v-model="visible"/>
        </a-form-item>

        <a-form-item
          v-show="show"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否缓存路由">
          <a-switch checkedChildren="是" unCheckedChildren="否" v-model="cache"/>
        </a-form-item>


      </a-form>

      <!-- 选择图标 -->
      <icons @choose="handleIconChoose" @close="handleIconCancel" :iconChooseVisible="iconChooseVisible"></icons>
    </a-spin>
      <a-row :style="{textAlign:'right'}">
        <a-button :style="{marginRight: '8px'}" @click="handleCancel">
          关闭
        </a-button>
        <a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
  import ATreeSelect from 'ant-design-vue/es/tree-select'
  import {addPermission,editPermission,queryTreeList} from '@/api/api'
  import Icons from './icon/Icons'
  import pick from 'lodash.pick'

  export default {
    name: "PermissionModal",
    components: {ATreeSelect,Icons},
    data () {
      return {
        drawerWidth:700,
        treeData:[],
        treeValue: '0-0-4',
        title:"操作",
        disableSubmit:false,
        model: {},
        localMenuType:'1',
        cache:true,//是否路由缓存
        drawerVisible:false,
        visible:true,//表单元素-隐藏路由
        isFrame:false, //是否路由菜单
        show:true,//根据菜单类型，动态显示隐藏表单元素
        pathShow:true, //为按钮时 不显示菜单路径框
        menuLabel:'菜单名称',
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
        validatorRules:{
          menu:{rules: [{ required: true, message: '请输入菜单标题!' }]},
          // path:{rules: [{ required: true, message: '请输入菜单路径!' }]},
          // component:{rules: [{ required: true, message: '请输入前段路由!' }]},
          // componentName:{rules: [{ required: true, message: '请输入路由名称!' }]},
          // redirect:{rules: [{ required: true, message: '请输入跳转地址!' }]},
          // permission:{rules: [{ required: true, message: '请输入权限标识!' }]},
          sort:{rules: [{validator: this.validateNumber}]},
        },
        iconChooseVisible: false,
      }
    },
    created () {
    },
    methods: {
      loadTree(){
        var that = this;
        queryTreeList().then((res)=>{
          if(res.code == 200){
            console.log('----queryTreeList---')
            console.log(res)
            that.treeData = [];
            let treeList = res.result.treeList
            for(let a=0;a<treeList.length;a++){
              let temp = treeList[a];
              // temp.isLeaf = temp.leaf;
              that.treeData.push(temp);
            }
          }
        });
      },
      add () {
        // 默认值
        this.edit({permsType:'1',isFrame:false});
      },
      edit (record) {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.form.resetFields();
        this.model = Object.assign({}, record);
        //--------------------------------------------------------------------------------------------------
        //根据菜单类型，动态展示页面字段
        console.log(record)
        // this.cache = !record.cache?false:true;
        // this.visible = !record.visible?false:true;
        if(record.isFrame!=null){
          this.isFrame = record.isFrame?true:false;
        }

        //console.log('record.menuType', record.menuType);
        this.show = record.type==3?false:true;
        this.menuLabel = record.type==3?'按钮/权限':'菜单名称';
        this.pathShow = record.type==3?false:true;

        if(this.model.pid){
          //编辑
          this.localMenuType = 2;
        }else{
          //新增
          this.localMenuType = 1;
        }
        //----------------------------------------------------------------------------------------------

        this.drawerVisible = true;
        this.loadTree();
        let fieldsVal = pick(this.model,'menu','isFrame','component','componentName','path','redirect','type','visible','permission','icon','sort','cache');
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldsVal)
        });
      },
      close () {
        this.$emit('close');
        this.disableSubmit = false;
        this.drawerVisible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            this.model.cache = this.cache;
            this.model.visible = this.visible;
            this.model.isFrame = this.isFrame;
            let formData = Object.assign(this.model, values);
            console.log(formData);
            let obj;
            if(!this.model.id){
              obj=addPermission(formData);
            }else{
              obj=editPermission(formData);
            }
            obj.then((res)=>{
              if(res.code == 200){
                that.$message.success(res.remark);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.remark);
              }
            }).finally(() => {
              that.confirmLoading = false;
              // that.close();
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
      validateNumber(rule, value, callback){
        if(!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)){
          callback();
        }else{
          callback("请输入正整数!");
        }
      },
      onChangeMenuType(e) {
        //console.log('localMenuType checked', e.target.value)
        this.localMenuType=e.target.value
        if(e.target.value == 3){
          this.show = false;
          this.pathShow = false;
          this.menuLabel = '按钮/权限';
        }else{
          this.show = true;
          this.menuLabel = '菜单名称';
        }
      },
      selectIcons(){
        this.iconChooseVisible = true
      },
      handleIconCancel () {
        this.iconChooseVisible = false
      },
      handleIconChoose (value) {
        console.log(value)
        this.model.icon = value
        this.form.icon = value
        this.iconChooseVisible = false
      },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize(){
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 500){
          this.drawerWidth = screenWidth;
        }else{
          this.drawerWidth = 700;
        }
      },
    }
  }
</script>

<style scoped>

</style>