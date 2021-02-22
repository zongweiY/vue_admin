<template>
  <div>
      <pre>
          这里echarts的使用有两种方式
          1：main.js中全局注册 但需要主要 引入的时候应该这样写 import * as echarts from 'echarts'  而且在子vue文件中无法直接使用echarts变量 所以需要在vue原型上定义一个属性 Vue.prototype.$echarts = echarts  后续子文件中调用this.$echarts的init方法即可
          2：在子文件中单独引入 import * as echarts from 'echarts'  后续直接调用echarts的init方法即可
          不管哪种方法 引入都得写成  import * as echarts from 'echarts'

      </pre>
      <div id="main" style="width: 800px;height:400px;"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    ///在实例创建完成后被立即调用。
    // 在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。
    created() {

    },
    // 实例被挂载后调用，
    // 这时 el 被新创建的 vm.$el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。
    mounted(){
        ///echarts初始化在这调用  原因就是要等main div挂载完成
        this.drawLine();
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('main'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>

<style>

</style>