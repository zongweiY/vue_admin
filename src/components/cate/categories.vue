<template>
    <div>
         <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>  
        
        <!-- 卡片视图 -->
        <el-card class="box-card">

            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="addCate">添加分类</el-button>
                </el-col>
            </el-row>

            <tree-table
                :data="data"
                :columns="columns"
                :tree-type="true"
                :show-index="true"
                :border="true"
                :show-row-hover="false"
                :selection-type="false"
                :expand-type="true"
                index-text="#">

                <!-- 第一个template  是当table有展开项时候写入的（根据expand-type属性来决定） 而且slot名字是固定的$expand   -->
                <template slot="$expand" slot-scope="scope">
                    {{ `My name is ${scope.row.name},
                    this rowIndex is ${scope.rowIndex}.`
                    }}
                </template>

                <template slot="likes" slot-scope="scope">
                    {{ scope.row.likes.join(',') }}
                </template>
            </tree-table>
        </el-card>

        <el-dialog
            title="添加分类"
            :visible.sync="addcateDialogVisible"
            width="40%"
            @closed="closeAddCateDialog">

           <el-form ref="addRef" :model="addForm" :rules="cateRules" label-width="90px">
         
                <el-form-item label="分类名称" prop="cate_name">
                    <el-input v-model="addForm.cate_name"></el-input>
                </el-form-item>
                <el-form-item label="分类父级">          
                    <el-cascader
                        v-model="selectKeys"
                        :options="options"
                        :props="cateProps"
                        clearable
                        @change="handleChange"
                        ref="cascaderRef"
                        style="width:100%;">
                    </el-cascader>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addcateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCateOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            data: [
                    {
                        name: 'Jack',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                            {
                                name: 'Ashley',
                                sex: 'female',
                                likes: ['football', 'basketball'],
                                score: 20,
                                children: [
                                {
                                    name: 'Ashley',
                                    sex: 'female',
                                    likes: ['football', 'basketball'],
                                    score: 20,
                                },
                                {
                                    name: 'Taki',
                                    sex: 'male',
                                    likes: ['football', 'basketball'],
                                    score: 10,
                                    children: [
                                        {
                                            name: 'Ashley',
                                            sex: 'female',
                                            likes: ['football', 'basketball'],
                                            score: 20,
                                        },
                                        {
                                            name: 'Taki',
                                            sex: 'male',
                                            likes: ['football', 'basketball'],
                                            score: 10,
                                            children: [
                                            {
                                                name: 'Ashley',
                                                sex: 'female',
                                                likes: ['football', 'basketball'],
                                                score: 20,
                                            },
                                            {
                                                name: 'Taki',
                                                sex: 'male',
                                                likes: ['football', 'basketball'],
                                                score: 10,
                                            },
                                            ],
                                        },
                                    ],
                                },
                                ],
                            },
                            {
                                name: 'Taki',
                                sex: 'male',
                                likes: ['football', 'basketball'],
                                score: 10,
                            }
                        ],
                    },
                    {
                        name: 'Tom',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 20,
                        children: [
                            {
                                name: 'Ashley',
                                sex: 'female',
                                likes: ['football', 'basketball'],
                                score: 20,
                                children: [
                                    {
                                        name: 'Ashley',
                                        sex: 'female',
                                        likes: ['football', 'basketball'],
                                        score: 20,
                                    },
                                    {
                                        name: 'Taki',
                                        sex: 'male',
                                        likes: ['football', 'basketball'],
                                        score: 10,
                                    },
                                ],
                            },
                            {
                                name: 'Taki',
                                sex: 'male',
                                likes: ['football', 'basketball'],
                                score: 10,
                                children: [
                                {
                                    name: 'Ashley',
                                    sex: 'female',
                                    likes: ['football', 'basketball'],
                                    score: 20,
                                },
                                {
                                    name: 'Taki',
                                    sex: 'male',
                                    likes: ['football', 'basketball'],
                                    score: 10,
                                },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'Tom',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 20,
                    },
                    {
                        name: 'Tom',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 20,
                        children: [
                            {
                                name: 'Ashley',
                                sex: 'female',
                                likes: ['football', 'basketball'],
                                score: 20,
                            },
                            {
                                name: 'Taki',
                                sex: 'male',
                                likes: ['football', 'basketball'],
                                score: 10,
                            },
                        ]
                    }
                ],
                columns: [
                    {
                        label: 'name',
                        prop: 'name',
                        width: '400px',
                    },
                    {
                        label: 'sex',
                        prop: 'sex',
                        minWidth: '50px',
                    },
                    {
                        label: 'score',
                        prop: 'score',
                    },
                    {
                        label: 'likes',
                        prop: 'likes',
                        minWidth: '200px',
                        type: 'template',
                        template: 'likes',
                    },
                ],
                addcateDialogVisible: false,
                cateRules: {
                    cate_name:[
                        {required:'true',message:'请输入分类名称',trigger:'blur'}
                    ]
                },
                addForm: {
                    cate_name: '',
                    cate_id: 0,
                    cate_level: 0
                },
                ///级联选择器数据 默认写死 一般是打开对话框时候axios获取
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [
                            {
                                value: 'shejiyuanze',
                                label: '设计原则'
                            }, 
                            {
                                value: 'daohang',
                                label: '导航'
                            }
                        ]
                    }, 
                    {
                        value: 'zujian',
                        label: '组件',
                        children: [
                            {
                                value: 'basic',
                                label: 'Basic'                    
                            }, 
                            {
                                value: 'form',
                                label: 'Form'
                            }, 
                            {
                                value: 'data',
                                label: 'Data'
                            },
                            {
                            value: 'notice',
                            label: 'Notice'
                            }, 
                            {
                            value: 'navigation',
                            label: 'Navigation'
                            }, 
                            {
                            value: 'others',
                            label: 'Others'
                            }
                        ]
                    }, 
                    {
                        value: 'ziyuan',
                        label: '资源',
                    }
                ],
                ///级联选择器 pros配置
                cateProps: {
                    expandTrigger: 'hover',
                    value: 'value',
                    label: 'label',
                    children: 'children',
                    checkStrictly: true
                },
                ////级联选择器 选中值  是个数组
                selectKeys: []
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
        selectKeys() {
　　　　　　if (this.$refs.cascaderRef) {
　　　　　　　　this.$refs.cascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
　　　　　　}
　　　　}
　　},
    methods: {
        addCate() {
            this.addcateDialogVisible = true
        },
        closeAddCateDialog() {
            ///重置表单项  这里只是给加了验证项的重置  级联选择器 需要手动重置
            this.$refs.addRef.resetFields()
            this.selectKeys = []
            this.addForm.cate_id = 0
            this.addForm.cate_level = 0
        },
        ///级联选择器改变事件
        handleChange() {
            console.log(this.selectKeys)
            if(this.selectKeys.length > 0){
                this.addForm.cate_id = this.selectKeys[this.selectKeys.length-1]
                this.addForm.cate_level = this.selectKeys.length
            }else{
                this.addForm.cate_id = 0
                this.addForm.cate_level = 0
            }
        },
        addCateOk() {
            this.$refs.addRef.validate(valid => {
                if(!valid) return
                // 表单数据 用了给添加接口传的值
                console.log(this.addForm)
                ///关闭对话框操作暂时隐藏  因为没有接口模拟的话 关闭的瞬间 也就把addForm数据重置了 放在接口成功回调里就ok了
               // this.addcateDialogVisible = false;
            })
        }
    }
}
</script>

<style lang="less" scoped>
    //默认吧级联选择器 改成任意一级可选后 每项前面多了个radio  把它隐藏掉（根据个人需求） 
    .el-radio{
        color: #606266;
        cursor: pointer;
        visibility: hidden !important; // 加上这一行
        margin-right: 30px;
    }
</style>