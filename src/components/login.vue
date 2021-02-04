<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="form-box">
                <el-form ref="loginRef" :model="form"  :rules="rules" label-width="0px">
                    <!-- 字体图标  属性方式：  -->
                    <el-form-item prop="username">
                        <el-input  v-model="form.username" prefix-icon="iconfont icon-user">
                        </el-input>
                    </el-form-item>

                    <!--  字体图标  slot 方式 -->
                    <el-form-item prop="password">
                        <el-input v-model="form.password"  type="password"  @keyup.enter.native="login">
                            <i slot="prefix" class="iconfont icon-password"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item class="btns">
                        <el-button type="primary"  @click="login">登录</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   data() {
      return {
        ///表单登录数据数据
        form: {
            username: 'zs',
            password: '123'
        },
        ///表单校验对象
        rules: {
            username: [
                 { required: true, message: '请输入用户名', trigger: 'blur' },
                 { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
            ],
            password: [
                 { required: true, message: '请输入密码', trigger: 'blur' },
                 { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
            ]
        }
      }
    },
    methods: {
        ///重置表单
        reset() {
            this.$refs.loginRef.resetFields();
        },
        ////表单校验   普通promise写法
        // login() {
        //     this.$refs.loginRef.validate(valida => {
        //         if(!valida) return;

        //         this.$axios.post('uauth/UserLogin.api',{
        //             username:this.form.username,
        //             password:this.form.password
        //         })
        //         .then(res =>{
        //             if(res.data.error != 0){
        //                 this.$message.error(res.data.reason);
        //                 return
        //             }
        //             this.$message({
        //                 message: '登陆成功',
        //                 type: 'success'
        //             })
        //         })
        //         .catch(err =>{
        //             console.log(err)
        //         })
        //     })
        // }
        ////登录 表单校验   async  await写法 
        login() {
            this.$refs.loginRef.validate(async valida => {
                if(!valida) return;
                const {data:res} = await this.$axios.post('uauth/UserLogin.api',this.form)
                console.log(res);
                if(res.error != 0){
                    this.$message.error(res.reason);
                    return
                }
                this.$message({
                    message: '登陆成功',
                    type: 'success'
                })
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
                
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        background: #2b4b6b;
        height: 100%;

        .login-box{
            width: 500px;
            height: 345px;
            background-color: #fff;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);

            .avatar{
                width: 130px;
                height: 130px;
                padding: 10px;
                background-color: #fff;
                border: 1px solid #eee;
                border-radius: 50%;
                box-shadow: 0 0 10px #666;
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);

                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }
        .form-box{
            width: 100%;
            box-sizing: border-box;
            padding: 0 20px 0 10px;
            position: absolute;
            bottom: 20px;

            .btns{
                text-align: right;
            }
        }
    }
</style>
