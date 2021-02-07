<template>
  <div>
     <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>  
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row>
          <el-col>
              <el-button type="primary">添加角色</el-button>
          </el-col>
      </el-row>  

      <el-table :data="roleList" border stripe>
          <!-- 展开列    通过作用域插槽 查看角色下权限关系-->
          <el-table-column type="expand">
              <template slot-scope="scope">
                 <el-row :class="['bdBottom', i1===0 ? 'bdTop' : '' , 'vcenter']" v-for="(item1,i1) in scope.row.children" :key="i1">
                    <!-- 一级权限  第一个children里的数据 -->
                    <el-col :span="5">
                         <el-tag closable>{{item1.authName}}</el-tag>
                         <i class="el-icon-caret-right"></i>
                    </el-col>

                    <!-- 二三级权限  统一放在一个col里面 然后再细分 -->
                    <el-col :span="19">
                        <!-- 二级权限遍历 -->
                        <el-row :class="[ i2===item1.children.length-1 ? '': 'bdBottom' , 'vcenter']" v-for="(item2,i2) in item1.children" :key="i2">
                            <el-col :span="6">
                                <el-tag type="success" closable>{{item2.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>

                            <el-col :span="18">
                                 <!-- 三级权限遍历 -->
                                 <!-- close事件可以监听tag标签的关闭事件 -->
                                <el-tag closable  type="warning" v-for="(item3,i3) in item2.children" :key="i3">
                                   {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>

                 </el-row>
              </template>
              
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index" label="#"></el-table-column>
          
          <el-table-column 
            label="角色名"
            prop="roleName">
          </el-table-column>

          <el-table-column 
            label="角色描述"
            prop="roleDescr">
          </el-table-column>

          <el-table-column 
            label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button> 
                <el-button type="danger"  size="mini" icon="el-icon-delete">删除</el-button>
                <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetPreDialog(scope.row)">分配权限</el-button>   
            </template>
          </el-table-column>
          
          
      </el-table>

    </el-card>

    <el-dialog
        title="分配权限"
        :visible.sync="setPreDialogVisible"
        width="40%"
        @close="closePreDialog">

        <!-- 树形控件 -->
        <el-tree :data="preList" :props="treeProps" show-checkbox node-key="id" default-expand-all  :default-checked-keys="treeChecked"></el-tree>

        <span slot="footer" class="dialog-footer">
            <el-button @click="setPreDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setPreDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 这里不调用接口了  构造个假数据模拟角色数据
            roleList: [
                {
                    'id': 1,
                    'roleName': '主管',
                    'roleDescr': '技术负责人',
                    'children': [
                        {
                            'id': 101,
                            'authName': '商品管理',
                            'path': null,
                            'children': [
                                {
                                    'id': 105,
                                    'authName': '商品列表',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 106,
                                            'authName': '添加商品',
                                            'path': null,
                                        },
                                        {
                                            'id': 107,
                                            'authName': '删除商品',
                                            'path': null,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'id': 102,
                            'authName': '订单管理',
                            'path': null,
                            'children': [
                                {
                                    'id': 103,
                                    'authName': '订单列表',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 108,
                                            'authName': '查看列表',
                                            'path': null,
                                        },
                                        {
                                            'id': 109,
                                            'authName': '删除列表',
                                            'path': null,
                                        }
                                    ]
                                },
                                {
                                    'id': 333,
                                    'authName': '订单管理',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 338,
                                            'authName': '添加订单',
                                            'path': null,
                                        },
                                        {
                                            'id': 339,
                                            'authName': '删除订单',
                                            'path': null,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': 2,
                    'roleName': '测试',
                    'roleDescr': '测试角色描述',
                    'children': [
                        {
                            'id': 201,
                            'authName': '统计管理',
                            'path': null,
                            'children': [
                                {
                                    'id': 205,
                                    'authName': '统计列表',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 206,
                                            'authName': '统计列表排序',
                                            'path': null,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            // 所有权限数据 模拟为一个树状结构 方便分配权限时候  对话框中树形展示
            preList:[
                        {
                            'authName': '商品管理',
                            'children': [
                                {
                                    'authName': '商品列表',
                                    'path': null,
                                    'children': [       
                                        {
                                            'id': 106,
                                            'authName': '添加商品',
                                            'path': null,
                                        },
                                        {
                                            'id': 107,
                                            'authName': '删除商品',
                                            'path': null,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'authName': '订单管理',
                            'children': [
                                {
                                    'authName': '订单列表',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 108,
                                            'authName': '查看列表',
                                            'path': null,
                                        },
                                        {
                                            'id': 109,
                                            'authName': '删除列表',
                                            'path': null,
                                        }
                                    ]
                                },
                                {
                                    'authName': '订单管理',
                                    'path': null,
                                    children: [
                                        {
                                            'id': 338,
                                            'authName': '添加订单',
                                            'path': null,
                                        },
                                        {
                                            'id': 339,
                                            'authName': '删除订单',
                                            'path': null,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'authName': '统计管理',
                            'children': [
                                {
                                    'authName': '统计列表',
                                    'path': null,
                                    'children': [
                                            {
                                                'id': 206,
                                                'authName': '统计列表排序',
                                                'path': null,
                                            }
                                    ]
                                }
                            ]
                        }
            ],
            setPreDialogVisible: false,
            ///定义树形控件参数
            treeProps:{
                label: 'authName',
                children: 'children'
            },
            ////定义分配权限时候 打开对话框 勾选已有的权限数组      默认选中的项
            treeChecked: []
        }
    },
    methods: {
        ///打开分配权限对话框  要做的事有  1：调用所有权限列表接口 初始化给tree（这里默认在data里定义了 省去axios这一步 直接第二步开始）   2：递归三级权限id给默认选中数组 确保打开勾选效果   3：显示对话框
        showSetPreDialog(node) {
            this.getPreId(node,this.treeChecked)
            console.log(this.treeChecked)

            this.setPreDialogVisible = true
        },
        ///递归三级权限id函数
        getPreId(node,arr) {
            ///根据最终的数据节点中有没有children属性 为最终递归结束条件 因为三级权限没有children了 
            if(!node.children){
                return arr.push(node.id);
            }
            node.children.forEach(element => {
                this.getPreId(element,arr)
            });
        },
        ////关闭权限对话框  需要清空默认选中数组  不然点开其他的 会默认带上上次的值
        closePreDialog() {
            this.treeChecked = []
        }
    }
}
</script>

<style lang="less" scoped>
    .el-tag{
        margin:7px;
    }
    .el-row{
        margin-bottom:0px;
    }
    .bdTop{
        border-top: 1px solid #eee;
    }
    .bdBottom{
        border-bottom: 1px solid #eee;
    }
    .vcenter{
        display: flex;
        align-items: center;
    }
</style>