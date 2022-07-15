<template>
  <el-card class="box-card">
    <p class="el-icon-warning header">注意：只允许为第三级分类设置相关参数</p>

    <!-- 下拉选则 -->
    <el-cascader
      v-model="value"
      :options="options"
      :props="{
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
      }"
      @change="handleChange"
    ></el-cascader>

    <!-- tags切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" :disabled="isclick">添加参数</el-button>
        <card :tableData="state"></card>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" :disabled="isclick">添加属性</el-button>
        <card></card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { classify, parameter } from '@/api/goods'
import card from '@/views/Goods/components/card.vue'
export default {
  created () {
    // 获取商品分类参数
    this.getGoodsClassify()
  },
  data () {
    return {
      options: [], //* 分类参数
      value: '',
      class: [],
      activeName: 'first',
      isclick: true,
      state: [] //* 动态的参数
    }
  },
  methods: {
    async getGoodsClassify () {
      const res = await classify({ type: '', pagenum: '', pagesize: '' })
      // console.log(res, '分类参数')
      this.options = res
    },
    handleChange (value) {
      // console.log(value)
      this.isclick = false
      this.class = value
      //* 当下拉选择后，发送请求 // 获取动态参数
      // 动态参数
      this.getState()
      // 获取静态属性

      // this.getStatic()
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    //* 获取动态参数
    async getState () {
      this.state = await parameter({ id: this.class[this.class.length - 1], sel: 'many' })
    },
    //* 获取静态属性
    async getStatic () {
      this.staticmore = await parameter({ id: this.class[this.class.length - 1], sel: 'only' })
      // console.log(res, '静态属性')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { card }
}
</script>

<style scoped lang='less'>
.header {
  padding: 10px 15px;
  width: 100%;
  color: #e6a23c;
  background-color: #fdf6ec;
}
</style>
