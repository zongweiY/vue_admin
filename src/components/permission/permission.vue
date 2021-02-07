<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>  
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-table :data="preList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column 
          label="名称"
          prop="title">
      </el-table-column>
      <el-table-column 
          label="权限"
          prop="privileges">
      </el-table-column>
      <el-table-column 
          label="管理员">
        <template slot-scope="scope">
          <el-tag type="success" v-if=" scope.row.admin ">是</el-tag>
          <el-tag type="info" v-if=" !scope.row.admin ">否</el-tag>
        </template>
      </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preList: []
    }
  },
  created() {
    this.getPreList()
  },
  methods:{
    async getPreList() {
      const {data:res} =  await this.$axios.post('topic/sysop/RoleList.api',{id:'1'})
      if(res.error != 0){
          this.$message.error(res.reason);
          return
      }
      this.preList = res.data
    }
  }
}
</script>

<style>

</style>