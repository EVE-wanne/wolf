<template>
  <div>
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
          <el-button
            type="primary"
            :disabled="isclick"
            @click.native="showmany = true"
            >添加参数</el-button
          >
          <!-- 自定义模块 -->
          <card :tableData="state" @delfn="getState()"></card>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" :disabled="isclick">添加属性</el-button>
          <card></card>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的弹窗 -->
    <el-dialog title="添加动态参数" :visible.sync="showmany" width="50%">
      <el-form label-width="80px" :model="manyFrom" :rules="rules">
        <el-form-item label="动态参数" prop="manyinput">
          <el-input v-model="manyFrom.manyinput"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showmany = false">取 消</el-button>
        <el-button type="primary" @click="addmany">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { classify, parameter, addcategories } from '@/api/goods'
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
      state: [], //* 动态的参数
      showmany: false,
      manyFrom: { //* 动态参数添加
        manyinput: ''
      },
      rules: {
        manyinput: [
          { required: true, trigger: 'blur', message: '添加内容不能为空' },
          { min: 2, max: 7, trigger: 'blur', message: '2-7个字符' }
        ]
      }

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
    },
    async addmany () {
      await addcategories({ id: this.class[this.class.length - 1], attr_name: this.manyFrom.manyinput, attr_sel: 'many' })
      // console.log(res)
      //* 重新请求一次数据
      this.getState()
      this.manyFrom.manyinput = ''
      this.showmany = false
    }
  },
  computed: {
    myid () {
      return this.class[this.class.length - 1]
    }
  },
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
