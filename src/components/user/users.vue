<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>  

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table
                border
                :data="userList"
                style="width: 100%">

                <el-table-column type="index"></el-table-column>

                <el-table-column
                prop="username"
                label="用户名">
                </el-table-column>

                <el-table-column
                prop="displayName"
                label="姓名">
                </el-table-column>

                <el-table-column
                prop="telephone"
                label="电话">
                </el-table-column>

                <el-table-column
                prop="timeCreated"
                label="日期">
                </el-table-column>

                <el-table-column
                label="状态">
                    <!-- 作用域插槽 自定义内容    scope.row 获取的就是本行所有数据-->
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.weixinFlag"  @change="userStateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="编辑" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="small" @click="showEditDialog(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top">
                             <el-button type="danger" icon="el-icon-delete" size="small" @click="removeUser(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="角色分配" placement="top">
                             <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>
<!-- 
            <el-pagination
            small
            layout="prev, pager, next"
            :total="50">
            </el-pagination> -->
        </el-card>

        <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            @close="closeAddDialog"
            width="40%">
           <el-form ref="addRef" :model="addForm"  :rules="addRules" label-width="70px">
         
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="中文名" prop="displayName">
                    <el-input v-model="addForm.displayName"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="addForm.telephone"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        
        <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            @close="closeEditDialog"
            width="40%">
           <el-form ref="editRef" :model="editForm"  :rules="editRules" label-width="70px">
         
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="中文名" prop="displayName">
                    <el-input v-model="editForm.displayName"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="editForm.telephone"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {

        ///////自定义校验规则的变量     
        var validatePass = (rule, value, callback) => {
            var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            if(!pPattern.test(value)){
                callback(new Error('输入的密码格式不正确'));
            }
            callback()
        };

         var validatePhone = (rule, value, callback) => {
            var pPattern = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
            if(!pPattern.test(value)){
                callback(new Error('输入的电话格式不正确'));
            }
            callback()
        };

        return {
            // 用户列表数据
            userList:[],
            addDialogVisible: false,
            ///添加用户表单数据
            addForm: {
                username: '',
                password: '',
                displayName: '',
                telephone: '',
                group1: "100"
            },
            ////校验规则
            addRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    // 自定义校验规则  一般都是配合正则表达式使用
                    { validator: validatePass, trigger: 'blur' }
                ],
                displayName: [
                    { required: true, message: '请输入中文名', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: validatePhone, trigger: 'blur'}
                ]
            },

            editDialogVisible: false,
            editForm: {},
            editRules: {
                displayName: [
                    { required: true, message: '请输入中文名', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: validatePhone, trigger: 'blur'}
                ]
            },
        }
    },
    created() {
        // 获取用户列表
        this.getUser();

    },
    methods: {
        ///用户列表  接口
        async getUser() {
            const {data:res} = await this.$axios.post('uauth//sysop/UserList.api',{"group1":"100"})
            if(res.error != 0){
                this.$message.error(res.reason);
                return
            }
            this.userList = res.data
        },
        ///更改状态接口
        userStateChange(user) {
            console.log(user.weixinFlag)
            this.$message.success("更改成功");
        },
        //////监听添加用户对话框关闭事件
        closeAddDialog() {
            this.$refs['addRef'].resetFields()
        },
        ////添加用户
        addUser() {
           this.$refs['addRef'].validate(async valid => {
                if(!valid) return;
                const {data:res} = await this.$axios.post('uauth/sysop/UserAdd.api',this.addForm)
                if(res.error != 0){
                    this.$message.error(res.reason);
                    return
                }
                this.addDialogVisible = false
                this.$message.success("添加成功");
                this.getUser()
           })
        },
        ///显示编辑对话框
        showEditDialog(row) {
            this.editForm = row;
            this.editDialogVisible = true;
        },
        editUser(){
            this.$refs['editRef'].validate(async valid => {
                if(!valid) return;
                const {data:res} = await this.$axios.post('uauth/sysop/UserChange.api',this.editForm)
                if(res.error != 0){
                    this.$message.error(res.reason);
                    return
                }
                this.editDialogVisible = false
                this.$message.success("修改用户信息成功");
                this.getUser()
           })
        },
        closeEditDialog() {
            this.$refs['editRef'].resetFields()
        },
        ///删除用户
        removeUser(row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                const {data:res} = await this.$axios.post('uauth/sysop/UserRemove.api',{
                    group1:row.group1,
                    id:row.id
                })
                if(res.error != 0){
                    this.$message.error(res.reason);
                    return
                }
                this.$message.success("删除成功");
                this.getUser()
            })
            .catch(() => {
                this.$message('已取消删除');          
            });
        }
    }
}
</script>

<style>

</style>