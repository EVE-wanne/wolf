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
      <el-tabs v-model="activeName" @tab-click="changetab">
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            :disabled="isclick"
            @click.native="clickmany"
            >添加参数</el-button
          >
          <!-- 自定义模块 -->
          <card :tableData="state" @delfn="getState()"></card>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" :disabled="isclick" @click="clickonly"
            >添加属性</el-button
          >

          <!-- 静态参数的组件 -->
          <card :tableData="staticmore" @delfn="getStatic()"></card>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的弹窗 -->
    <el-dialog
      :title="'添加' + title"
      :visible.sync="showmany"
      width="50%"
      @close="close"
    >
      <el-form label-width="80px" :model="From" :rules="rules" ref="addfrom">
        <el-form-item :label="title" prop="input">
          <el-input v-model="From.input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showmany = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
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
      staticmore: [], //* 静态属性的参数
      showmany: false,
      From: { //* 动态参数添加
        input: ''
      },
      rules: {
        input: [
          { required: true, trigger: 'blur', message: '添加内容不能为空' },
          { min: 2, max: 7, trigger: 'blur', message: '2-7个字符' }
        ]
      },
      ismany: true, //* 判断当前点击的是动态还是静态  true 是动态参数  ，false是静态参数only
      title: '动态参数'
    }
  },
  methods: {
    clickmany () { //* 点击添加动态参数
      this.showmany = true //* 显示弹窗
      this.ismany = true
      this.title = '动态参数'
    },
    clickonly () { //* 点击添加动态参数
      this.showmany = true //* 显示弹窗
      this.ismany = false
      this.title = '静态属性'
    },
    changetab (val) { //* 切换tab的时候会触发这个函数，能拿到点击的实例
      //* 先判断class中有没有值，如果有值，说明选中了，我们需要进行请求
      if (this.class.length > 0) {
        //* 发送请求
        //* 判断点击的是哪个tab
        if (val.label === '动态参数') {
          // 动态参数
          console.log('动态')
          this.getState()
        } else {
          //* 静态属性
          console.log('静态')
          this.getStatic()
        }
      }
      //* 否则啥也不做
    },
    async getGoodsClassify () {
      const res = await classify({ type: '', pagenum: '', pagesize: '' })
      // console.log(res, '分类参数')
      this.options = res
    },
    handleChange (value) { //* 下拉选择框选中内容时
      // console.log(value)
      this.isclick = false //* 这个是按钮的禁用状态
      this.class = value //* 选中的分类的id值
      // 动态参数
      //* 先直接触发一次
      this.getState()
    },
    async getState () { //* 获取动态参数，请求函数
      this.state = await parameter({ id: this.class[this.class.length - 1], sel: 'many' })
    },

    async getStatic () { //* 获取静态属性，请求函数
      this.staticmore = await parameter({ id: this.class[this.class.length - 1], sel: 'only' })
      // console.log(res, '静态属性')
    },
    async add () { //* 添加动态参数的方法
      //* 手动验证一下表单，当表单验证成功时我们再判断发送哪个请求
      try {
        await this.$refs.addfrom.validate()
        //* 验证通过
        if (this.ismany) {
          await addcategories({ id: this.class[this.class.length - 1], attr_name: this.From.input, attr_sel: 'many' })
          // console.log(res)
          //* 重新请求一次数据
          this.getState()
          this.From.input = ''
        } else { //* 否则就是发送静态属性
          await addcategories({ id: this.class[this.class.length - 1], attr_name: this.From.input, attr_sel: 'only' })
          // console.log(res)
          //* 重新请求一次数据
          this.getStatic()
          this.From.input = ''
        }
        this.showmany = false
      } catch (err) {
        console.log(err)
      }
    },
    close () {
      this.From = {
        input: ''
      }
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
