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
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table
                border
                :data="userList"
                style="width: 100%">

                <el-table-column type="index" label="#"></el-table-column>

                <el-table-column
                prop="mediaCity"
                label="城市">
                </el-table-column>

                <el-table-column
                prop="newsTitle"
                label="标题"
                width="400px">
                </el-table-column>

                <el-table-column
                prop="platformName"
                label="来源">
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
                        v-model="scope.row.weixinFlag">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                             <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="角色分配" placement="top" :enterable="false">
                             <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页 -->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="queryInfo.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ///分页相关数据
            queryInfo: {
                ///当前的页数
                page: 1,
                ///每页多少条
                limit: 10,
            },
            total: 0,
            // 用户列表数据
            userList: []
        }
    },
    created() {
        // 获取用户列表
        this.getUser();

    },
    methods: {
        async getUser() {
            const {data:res} = await this.$axios.post('/crawl/ExQbParamsData.api',this.queryInfo)
            if(res.error != 0){
                this.$message.error(res.reason);
                return
            }
           console.log(res)
           this.total = res.data.numFound
           this.userList = res.data.newsList
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.queryInfo.limit = val
            this.getUser()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.queryInfo.page = val
            this.getUser()
        }
    }
}
</script>

<style>

</style>