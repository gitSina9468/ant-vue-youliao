<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="文件名称">
              <a-input placeholder="请输入文件名称" v-model="queryParam.fileName"></a-input>
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
    <div class="table-operator">
      <a-upload
        name="file"
        :multiple="false"
        :action="uploadAction"
        :headers="tokenHeader"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="handleChange">
        <a-button>
          <a-icon type="upload"/>
          文件上传
        </a-button>
      </a-upload>

      <a-radio-group v-model="queryParam.type" @change="onChange"  v-for="type in types">
        <a-radio-button  :value="type.value">{{type.name}}</a-radio-button>
      </a-radio-group>
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

        <template slot="urlSlot" slot-scope="text, record, index">
          <div class="anty-img-wrap" style="height:55px;margin:0 auto">
            <img v-if="getImg(record)" :src="getImageView(record.fileUrl)" @click="fileShow(record.fileUrl)"/>
            <a-icon v-else type="file-text" style="fontSize:50px" @click="fileShow(record.fileUrl)"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
            <a @click="ossDelete(record.id)">删除</a>
            <a-divider type="vertical"/>
           <a-popconfirm title="确定下载吗?" @confirm="() => ossDownLoad(record.fileUrl)">
                  <a>下载</a>
           </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import {TableListMixin} from '@/mixins/TableListMixin'
  import {downFile} from '@/api/manage';
  import '@/assets/less/common.css';

  export default {
    name: "OSSFileList",
    mixins: [TableListMixin],
    data() {
      return {
        description: '资源文件',
        types:[
          {name:"所有",value:""},
          {name:"png",value:"png"},
          {name:"jpg",value:"jpg"},
          {name:"jpeg",value:"jpeg"},
          {name:"pdf",value:"pdf"},
          {name:"docx",value:"docx"},
          {name:"xls",value:"xls"},
          {name:"xlsx",value:"xlsx"},
          {name:"txt",value:"txt"},
          {name:"...",value:"other"},
        ],
        queryParam: {},
        // 表头
        columns: [
          {
            title: '文件名称',
            align: "center",
            dataIndex: 'fileName'
          },
          {
            title: '文件预览',
            align: "center",
            width: 120,
            scopedSlots: {customRender: "urlSlot"}
          },
          {
            title: '文件类型',
            align: "center",
            width: 100,
            dataIndex: 'type',
          },
          {
            title: '文件地址',
            align: "center",
            dataIndex: 'fileUrl',
            customRender: function (fileUrl) {
              if (fileUrl) {
                return window._CONFIG['OSS'] + "/" + fileUrl;
              }
            }
          },
          {
            title: '文件大小',
            align: "center",
            dataIndex: 'fileSize',
            customRender: function (text) {
              if (text) {
                if(text < 1024){
                  //单位kb
                  return text+"KB";
                }else{
                  //单位mb
                  return (text/1024).toFixed(2)+"MB";
                }
              }
            }
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime'
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          ossServer: window._CONFIG['OSS'],
          upload: "/sys/oss/upload",
          downLoad: "/sys/oss/downLoad",
          list: "/sys/oss/getPageList",
          delete: "/sys/oss/delete"
        }
      }
    },
    computed: {
      uploadAction() {
        return window._CONFIG['domianURL'] + this.url.upload;
      }
    },
    methods: {
      getImg:function(record){
        switch (record.type){
          case "png":
            return true;
          case "jpg":
            return true;
          case "jpeg":
            return true;
          default:
            return false;
        }
      },
      getImageView: function (img) {
        return this.url.ossServer + "/" + img;
      },
      fileShow:function(fileUrl){
        window.open("https://file.keking.cn/onlinePreview?url="+this.getImageView(fileUrl))
      },
      onChange(e) {
        console.log('radio checked', e.target.value);
        this.loadData()
      },
      beforeUpload(file) {
        if(!file){
          this.$message.warning('请上传文件或图片');
          return false;
        }
        var fileType = file.type;
        if (fileType.indexOf('image') >= 0) {
          //图片上传不超过5M
          const isLt5M = file.size / 1024 / 1024 < 5;
          if(!isLt5M) {
            this.$message.warning('上传图片大小不能超过 5MB!');
            return false;
          }
        } else {
          //文件上传不超过20M
          const isLt20M = file.size / 1024 / 1024 < 20;
          if(!isLt20M) {
            this.$message.warning('上传文件大小不能超过 20MB!');
            return false;
          }
        }
        return true
      },
      handleChange(info) {
        if (info.file.status === 'done') {
          if (info.file.response.code == 200) {
            this.loadData()
            this.$message.success(`${info.file.name} 上传成功!`);
          } else {
            this.$message.error(`${info.file.name} 上传失败.`);
          }
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`);
        }
      },
      ossDelete(id) {
        var that = this;
        that.$confirm({
          title: "确认删除",
          content: "是否删除选中文件?",
          onOk: function () {
            that.handleDelete(id)
          }
        });
      },
      ossDownLoad: function (fileUrl) {
        downFile(this.url.downLoad,{"objectName":fileUrl}).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return;
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), fileUrl)
          }else{
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileUrl)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        })
      },
    }
  }
</script>
