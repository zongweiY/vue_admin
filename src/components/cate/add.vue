<template>
  <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>  

        <el-card class="box-card">
            <el-alert
                title="添加商品信息"
                type="info"
                center
                :closable="false"
                show-icon>
            </el-alert>
            
            <!-- 这里 activeNumber*1 或者（-0也行） 为的是吧字符串参数转换为数值  因为steps绑定的数值  而tabs是字符串-->
            <el-steps :active="activeNumber*1" align-center finish-status="success" style="margin:15px 0; 20px 0">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!-- 
                这里最终保存提交时候 肯定希望数据绑定在一个form对象 里面的输入框 编辑器等字段都是他的属性   
                这时候就要给tabs嵌套个form元素  但elementUi要求tabs-pane必须紧跟在tabs之后  所以
                把form放在最外层嵌套 
            -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top">
                <el-tabs tab-position="left" v-model="activeNumber"  @tab-click="handleClick" :before-leave="beforeTabLeave">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_num">
                            <el-input v-model="addForm.goods_num" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_type">
                          <el-cascader
                            v-model="addForm.goods_type"
                            :options="options"
                            :props="casProps"
                            clearable
                            ref="cascaderRef"
                            @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item :label="item.name" v-for="item in manyTabData" :key="item.id">
                            <el-checkbox-group v-model="item.type_vals">
                                <el-checkbox :label="cb" v-for="(cb,i) in item.type_vals" :key="i" border></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.name" v-for="item in onlyTabData" :key="item.id">
                            <el-input v-model="item.vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload
                            class="upload-demo"
                            action="/api/tuwen/TuwenFile.upload?tuwenId=143"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <quill-editor 
                            ref="myTextEditor" 
                            v-model="addForm.goods_des" 
                            :options="editorOption" 
                            style="height: 400px; margin-bottom: 10px">
                        </quill-editor>
                        <el-button type="primary"   @click="add"  style="margin-top: 60px">添加</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <el-dialog
            title="图片预览"
            :visible.sync="previewVisible"
            width="40%">
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>

  </div>
</template>

<script>
import _ from 'lodash'; // 引入lodash

export default {
    data() {
        return {
            activeNumber: '0',
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_num: 0,
                ////默认选择的类别  数组  空数组
                goods_type: [],
                ////上传的商品缩略图数组
                pics: [],
                ///商品介绍
                goods_des: ''
            },
            ///编辑器配置项
            editorOption: {},
            addFormRules: {
                goods_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                goods_price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                goods_weight: [
                    { required: true, message: '请输入商品重量', trigger: 'blur' }
                ],
                goods_num: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' }
                ],
                goods_type: [
                     { required: true, message: '请输入商品数量', trigger: 'blur' }
                ]
            },
            ////这里模拟级联选择器的数据  一般是要在created钩子函数中 通过接口请求
            options: [{
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
                    }
                ],
                casProps: {
                    expandTrigger: 'hover',
                    value: 'value',
                    label: 'label',
                    children: 'children',
                    ///是否严格的遵守父子节点不互相关联   就是为了可以随意选择任意一级  false的话只能选到最底层级
                    checkStrictly: true 
                },
                ////定义参数列表数组
                manyTabData: [],
                ////定义属性列表数组
                onlyTabData: [],
                ///预览图片
                previewVisible: false,
                previewPath: ''
        }
    },
    // 这两项 第一项是为了控制级联选择器点击label也可以代替点击前面的radio作用  第二个是为了监听当值发生变化时 自动关闭选择框  
    // 都是为了解决可以自由选择层级（checkStrictly: true ）所带来的的小问题
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
        addForm () {
　　　　　　if (this.$refs.cascaderRef) {
　　　　　　　　this.$refs.cascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
　　　　　　}
　　　　}
    },
    methods: {
        handleClick() {
            ///当点击到商品参数tab时候  获取参数列表 展示
            if(this.activeNumber === '1'){
                this.manyTabData = [
                    {
                        name: '版式',
                        id: 1,
                        type_vals: ['曲面','人工智能','5G','AI技术']
                    },
                    {
                        name: '颜色',
                        id: 2,
                        type_vals: ['红色','黑色']
                    }
                ]
            }else if(this.activeNumber === '2'){
                this.onlyTabData = [
                    {
                        name: '商品名称',
                        id: 3,
                        vals: 'TCL C5A1109'
                    },
                    {
                        name: '版式',
                        id: 1,
                        vals: '曲面'
                    },
                    {
                        name: '颜色',
                        id: 2,
                        vals: '红色'
                    }
                ]
            }
        },
        // 级联选择器值发送变化时触发
        handleChange(value) {
            console.log(value);
            this.$refs.cascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
        },
        ////监听tab页签 即将离开的函数 利用的是tabs的钩子函数
        ///这两个参数的位置固定
        beforeTabLeave(activeName, oldActiveName) {
           ///判断当从第一级步骤切换离开时 必须选择了分类
           if(oldActiveName === '0' && this.addForm.goods_type.length == 0){
               this.$message.error('请选择商品分类')
               ////return false的作用就是阻止跳转
               return false
           }
        },
        ///处理上传图片的预览 和删除
        handlePreview(file) {
            this.previewPath = file.response.data.url
            this.previewVisible = true
        },
        handleRemove(file) {
            ///找到对应下标 移除
            const i = this.addForm.pics.findIndex( item => {
                item.pic = file.response.data.storePath
            })

            this.addForm.pics.splice(i,1)
            console.log(this.addForm)
        },
        handleSuccess(response) {
            this.addForm.pics.push({
                pic:response.data.storePath
            })
            console.log(this.addForm)
        },
        ///添加
        add() {
            this.$refs.addFormRef.validate(valid => {
                if(!valid) return;

                ///通过loadsh 深拷贝方法 把addForm深拷贝一份出来 
                // 由于addForm中的数据是根据控件要求的格式定义的 但是最终保存接口要的字段可能和addForm中字段格式不一致 所以要单独拷贝一份出来 
                // 不能再原来基础上改的原因是改了之后 控件的绑定就会出错  比如这里的级联选择器 绑定选中项需要的是数组 但后台需要一个逗号分隔的字符串 
                // 你一旦修改了addForm中的数据 再重新复制的话 控件渲染就会出错  所以最好的方法就是深拷贝一份出来  而且还可以根据接口需要 为拷贝的这个对象自定义字段 不会影响addForm
                const cloneForm = _.cloneDeep(this.addForm)

                cloneForm.goods_type = cloneForm.goods_type.length == 0 ? '' : cloneForm.goods_type.join(',')


                //自定义后台需要的字段  添加到拷贝的对象上
                const attrs = [];
                this.manyTabData.forEach(item => {
                    const obj = {
                        id: item.id,
                        vals: item.type_vals.join(',')
                    }
                    attrs.push(obj)
                })

                this.onlyTabData.forEach(item => {
                    const obj = {
                        id: item.id,
                        vals: item.vals
                    }
                    attrs.push(obj)
                })
                cloneForm.attrs = attrs

                console.log(cloneForm)
                //////最终把这个格式数据 发送的后台接口 就即可保存成功 保存成功后  this.$router.push('/goods')跳转路由即可
           })
        }
    }

}
</script>
<style lang="less" scoped>
    .el-step__title {
        font-size: 14px  !important;
        line-height: 32px !important;
    }
    .el-radio {
        color: #606266;
        cursor: pointer;
        visibility: hidden  !important; // 加上这一行
        margin-right: 30px;
    }
    .previewImg{
        display: block;
        margin: 0 auto;
    }
</style>