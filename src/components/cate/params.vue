<template>
  <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </el-breadcrumb>  

      <!-- 卡片视图 -->
      <el-card class="box-card">

          <el-row>
              <el-col :span="24">
                  <span style="margin-right:10px;">请选择商品分类</span>
                  <el-cascader
                    v-model="casSelectKeys"
                    :options="options"
                    :props="casProps"
                    ref="cascaderRef"
                    clearable
                    @change="handleChange">
                  </el-cascader>
              </el-col>
          </el-row>


          <!-- tab页签 -->
          <el-tabs v-model="activeName"  @tab-click="handTableClick">
            <el-tab-pane label="动态参数" name="first">
              <el-button type="primary" :disabled="buttonIsDisable">添加参数</el-button>
              <el-table :data="manyTableData" border stripe>
                <!-- 展开列    通过作用域插槽 查看角色下权限关系-->
                <el-table-column type="expand">
                    
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                
                <el-table-column 
                  label="参数名称"
                  prop="authName">
                </el-table-column>

                <el-table-column 
                  label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button> 
                      <el-button type="danger"  size="mini" icon="el-icon-delete">删除</el-button>
                  </template>
                </el-table-column>           
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">
              <el-button type="primary" :disabled="buttonIsDisable">添加属性</el-button>

              <el-table :data="onlyTableData" border stripe>
                <!-- 展开列    通过作用域插槽 查看角色下权限关系-->
                <el-table-column type="expand">
                    
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                
                <el-table-column 
                  label="参数名称"
                  prop="authName">
                </el-table-column>

                <el-table-column 
                  label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button> 
                      <el-button type="danger"  size="mini" icon="el-icon-delete">删除</el-button>
                  </template>
                </el-table-column>           
            </el-table>

          </el-tab-pane>
        </el-tabs>
    </el-card>  
  </div>
</template>

<script>
export default {
  data(){
    return {
      ////这个options 商品分类参数其实应该是created时候 axios获取的  
      options:[{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        ///级联选择器选中的值
        casSelectKeys:[],
        //级联选择器配置参数
        casProps:{
            expandTrigger: 'hover',
            value: 'value',
            label: 'label',
            children: 'children',
            ///是否严格的遵守父子节点不互相关联   就是为了可以随意选择任意一级  false的话只能选到最底层级
            checkStrictly: true
        },
        ///tab页签选中项名字
        activeName: 'first',
        ///定义动态参数和静态属性 table数据  这里写死
        manyTableData: [],
        onlyTableData: []
    }
  },

  mounted() {
        // 级联选择器默认可以选择任意一级  带来的bug修复
　　　　setInterval(function() {
　　　　　　document.querySelectorAll(".el-cascader-node__label").forEach(el => {
　　　　　　　　el.onclick = function() {
　　　　　　　　　　if (this.previousElementSibling) this.previousElementSibling.click();
　　　　　　　　};
　　　　　　});
　　　　}, 1000);
　},
　watch: {
        casSelectKeys() {
　　　　　　if (this.$refs.cascaderRef) {
　　　　　　　　this.$refs.cascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
　　　　　　}
　　　　}
　},
  computed: {
    buttonIsDisable() {
       if(this.casSelectKeys.length != 3){
          return true
        }
        return false
    }
  },

  methods:{
        ///级联选择器改变事件
        handleChange() {
          console.log(this.casSelectKeys)
          ////当选择器发生改变时候  获取数据
          this.getParamsData();
        },
        handTableClick() {
          console.log(this.activeName)
          this.getParamsData();
        },
        getParamsData() {
          ///这里做个控制 只能选择三级的  
          if(this.casSelectKeys.length != 3){
            this.casSelectKeys = []
            this.manyTableData =  []
            this.onlyTableData =  []
            return
          }

          ///根据三级id  和tab页签的name 赋值
          if(this.activeName == 'first'){
            this.manyTableData = [
                        {
                            'authName': '动态参数1',
                        },
                        {
                            'authName': '动态参数2'
                        },
                        {
                            'authName': '动态参数3'
                        }
            ] 
          }else if(this.activeName == 'second'){
             this.onlyTableData = [
                        {
                            'authName': '静态参数1',
                        },
                        {
                            'authName': '静态参数2'
                        },
                        {
                            'authName': '静态参数3'
                        }
            ] 
          }
        }
  }
}
</script>

<style>

</style>                                                                                                                                                               