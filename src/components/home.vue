<template>
      <!--  
        这个home.vue 至关重要   就相当于 这是个最大的后台系统模板   
        因为一旦登录进系统了  默认都进去这个路由  
        而在路由index.js中也规定了 这个路由为主路由 左侧所有导航菜单的路由都是这个路由的children   而且都home这个路由重定向了   就是以后系统默认登录完进的首页
        这样就能达到把这个home作为后台系统最基础的大模板  在这里面 头部 侧边栏 底部都可以抽离为组件 然后main内容区 添加一个路由占位符 router-view  即可达到spa效果
       -->
      <el-container class="container">
        <el-header>
         <div>
           <img src="../assets/logo.png" alt="">
           电商后台管理系统
         </div>
          <el-button type="info" @click="logout">退出</el-button>
        </el-header>

        <el-container>
          <el-aside :width="isToggle ? '64px': '200px' ">
            <!-- 控制侧边栏展开折叠 -->
            <div class="toogle-menu" @click="toggleMenu">|||</div>
             <el-menu
              class="el-menu-vertical-demo"
              background-color="#393D49"
              text-color="#fff"
              active-text-color="#3582fb"
              unique-opened 
              :default-active="activeIndex"
              :collapse="isToggle"
              :collapse-transition = "false"
              router
              >

              <!-- 通过template遍历   这里暂时最多定义三级菜单  不然就是个无限递归了   一般两层菜单就够用了-->
              <template v-for="item in menuList">
                  <template v-if="item.subs">
                    <!-- 有二级菜单的  遍历创建el-submenu   然后再去判断里面有没有三级菜单 -->
                    <el-submenu :index="item.index" :key="item.index">
                      
                        <!-- 有二级菜单的   顶级菜单的名字图标 -->
                        <template slot="title">
                          <i :class="item.icon"></i>
                          <span>{{ item.title }}</span>
                        </template>
                        <!-- 遍历判断有没有三级 -->
                        <template v-for="subItem in item.subs">
                          <!-- 有三级菜单的 遍历结构就是el-submenu -->
                          <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index">

                            <template slot="title"><span>{{ subItem.title }}</span></template>
                            <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}
                            </el-menu-item>

                          </el-submenu>

                         <!-- 没有三级菜单的 直接展示 -->
                          <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index">
                            {{ subItem.title }}
                          </el-menu-item>
                        </template>
                    </el-submenu>
                    
                  </template>

                  <!-- 没有二级菜单的  直接展示菜单图标名称 -->
                  <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                  </template>

              </template>

            </el-menu>

          </el-aside>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
      data(){
        return{
          isToggle: false,
          ////模拟从后台拿到左侧菜单数据 然后渲染
          menuList:[
               {
                    icon: 'el-icon-menu',
                    index: '6',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'users',
                            title: '用户列表'
                        }
                    ]
                } ,
                {
                    icon: 'el-icon-menu',
                    index: '7',
                    title: '权限管理',
                    subs: [
                        {
                            index: 'roles',
                            title: '角色列表'
                        },
                        {
                            index: 'permission',
                            title: '权限列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '8',
                    title: '商品管理',
                    subs: [
                        {
                            index: 'goods',
                            title: '商品列表'
                        },
                        {
                            index: 'categories',
                            title: '商品分类'
                        },
                        {
                            index: 'params',
                            title: '分类参数'
                        }
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '9',
                    title: '角色管理',
                    subs: [
                        {
                            index: 'role',
                            title: '角色列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '5',
                    title: '数据统计',
                    subs: [
                        {
                            index: 'total',
                            title: '统计'
                        }
                    ]
                }        
                        
          ]
        }
      },
      // 计算属性  监听当前选择的菜单项
      computed: {
        activeIndex() {
            return this.$route.path.replace('/', '');
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
                // this.$message('取消退出')          
              });
          },
          ///菜单栏折叠展开
          toggleMenu() {
            this.isToggle = !this.isToggle
          }
      }
    }
</script>

<style lang="less" scoped>
    .container{
      height: 100%;

      .el-header{
        background-color: #393D49;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >div{
          display: flex;
          align-items: center;
          font-size: 20px;
          font-family: cursive;
          img{
            width: 60px;
            height: 60px;
            display: block;
            margin-right: 10px;
          }
        }
      }
    }
    .el-aside{
      background-color: #393D49;
      .toogle-menu{
        font-size: 18px;
        color: #eee;
        background: #636363;
        text-align: center;
        cursor: pointer;
        padding: 5px 0;
      }
      .el-menu{
        border-right: none;
      }
    }
    .el-main{
      background: #fff;
    }
    .el-footer{
      background-color: #eee;
    }

</style>