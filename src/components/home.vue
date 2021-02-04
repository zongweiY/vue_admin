<template>
  <div class="container">
      <h1><el-button type="info" @click="logout">退出</el-button></h1>
      Home组件
  </div>
</template>

<script>
    export default {
      data(){
        return{

        }
      },
      methods: {
          logout() {
              this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
              .then(() => {
                window.sessionStorage.clear();
                this.$router.push('/login')
                this.$message.success('退出成功')
              })
              .catch(() => {
                this.$message('取消退出')          
              });
          }
      }
    }
</script>

<style lang="less" scoped>
    .container{
      height: 100%;

      h1{
        margin: 0;
      }
    }
</style>