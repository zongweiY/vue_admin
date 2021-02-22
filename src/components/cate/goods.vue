<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>  

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select" clearable @clear="getUser">
                        <el-button slot="append" icon="el-icon-search" @click="getUser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addGoods">添加商品</el-button>
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
                label="日期">
                    <template slot-scope="scope">
                        {{scope.row.timeCreated | dataFormat}}
                    </template>
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



    </div>
</template>

<script>
export default {
    data() {
        return {
            input3: '',
            // 用户列表数据
            userList:[],
        }
    },
    filters: {
        ////日期格式过滤器  自定义日期格式
        dataFormat(val) {
            return val.substr(0,16)
        }
    },
    created() {
        // 获取用户列表
        this.getUser();
    },
    methods: {
        ///用户列表  接口
        async getUser() {
            const {data:res} = await this.$axios.post('uauth/sysop/UserList.api',{"group1":"100"})
            if(res.error != 0){
                this.$message.error(res.reason);
                return
            }
            this.userList = res.data
        },
        ///添加商品按钮 跳转到添加页面
        addGoods() {
            this.$router.push('/goods/add')
        }
        
    }
}
</script>

<style>

</style>