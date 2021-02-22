<template>
  
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>  

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <el-table
                border
                stripe
                :data="orderList"
                style="width: 100%">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="修改地址" placement="top" :enterable="false">
                           <el-button size="mini" type="primary" icon="el-icon-edit" @click="showDialog"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="物流信息" placement="top" :enterable="false">
                           <el-button size="mini" type="success" icon="el-icon-location" @click="showProgressDialog"></el-button>
                        </el-tooltip>                                            
                    </template>   
                </el-table-column>
            </el-table>

        </el-card>


        <el-dialog
            title="修改地址"
            :visible.sync="dialogVisible"
            @close="closeDialog"
            width="40%">

            <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
                <el-form-item label="省市区/县" prop="address1">
                    <el-cascader
                        v-model="addressForm.address1"
                        :options="areaData"
                        :props="casProps"
                        @change="handleChange"
                        style="width:100%;">
                    </el-cascader>
                </el-form-item>
                 <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="物流信息"
            :visible.sync="progressDialogVisible"
            width="40%">
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
  </div>
</template>

<script>
import areaData from './cityData.json'
export default {
    data() {
        return {
            ////标题过滤 数据绑定
            query:'',
            // table表格数据  一般是接口获取的 这里写成固定的
            orderList: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dialogVisible:false,
            ///修改地址对话框表单相关
            addressForm: {
                address1: [],
                address2: ''
            },
            addressFormRules: {
                address1: [
                    {required: true, message: '请选择省市区/县', trigger: 'blur'}
                ],
                address2: [
                    {required: true, message: '请输入详细地址', trigger: 'blur'}
                ]
            },
            //级联选择器相关
            areaData: areaData,
            casProps: {
                expandTrigger: 'hover',
                label: 'text',
                value: 'value',
                children: 'children'
            },
            progressDialogVisible: false,
            ///物流信息数据  应该为axios获取
             activities: [
                {
                content: '快递已签收，签收人:XXX,感谢使用顺丰快递',
                timestamp: '2018-04-15'
                },
                {
                content: '快递到达北京市中转站',
                timestamp: '2018-04-15'
                },
                {
                content: '顺丰快递揽件',
                timestamp: '2018-04-15'
                }, 
                {
                content: '卖家发货',
                timestamp: '2018-04-13'
                }, 
                {
                content: '买家付款',
                timestamp: '2018-04-11'
                }
            ]
        }
    },
    created() {
       
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        closeDialog() {
            this.$refs.addressFormRef.resetFields()
        },
        ///级联选择器值发生变化时触发
        handleChange(val) {
            console.log(this.addressForm.address1)
        },
        ///物流信息
        showProgressDialog() {
            this.progressDialogVisible = true
        }
    }
}
</script>

<style>

</style>