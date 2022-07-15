<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><i class="el-icon-info"></i> 添加商品信息</span>
    </div>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- 分页填写 -->
    <el-tabs tab-position="left" @tab-click="handleClick">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息">
        <!-- 表单 -->
        <el-form :model="goodFrom" :rules="rules" ref="goodFrom">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="goodFrom.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="goodFrom.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量(kg)" prop="goods_weight">
            <el-input v-model="goodFrom.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="goodFrom.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <!-- 下拉选择框 -->
            <el-cascader
              v-model="goodFrom.goods_cat"
              :options="options"
              :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
              }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- /基本信息 -->

      <!-- 商品参数 -->
      <el-tab-pane label="商品参数">
        <div v-for="item in state" :key="item.attr_id">
          <p>{{ item.attr_name }}</p>
          <!-- 绑定点击事件，直接在数据中将这个给删除 -->
          <el-checkbox
            v-model="checked"
            :label="items"
            border
            v-for="(items, index) in item.attr_vals.split(' ')"
            :key="index"
            @click.native.prevent="delstate(item.attr_id, index)"
          ></el-checkbox>
        </div>
      </el-tab-pane>
      <!-- /商品参数 -->

      <!-- 商品属性 -->
      <el-tab-pane label="商品属性">
        <div v-for="item in staticmore" :key="item.attr_id">
          <p>{{ item.attr_name }}</p>
          <el-input v-model="item.attr_vals"></el-input>
        </div>
      </el-tab-pane>
      <!-- /商品属性 -->

      <!-- 商品图片 -->
      <el-tab-pane label="商品图片">
        <el-upload
          class="upload-demo"
          action="http://liufusong.top:8899/api/private/v1/upload"
          :headers="{ Authorization: $store.getters.token }"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :on-success="addpic"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <!-- /商品图片 -->

      <!-- 商品内容 -->
      <el-tab-pane label="商品内容">
        <!-- 富文本 -->
        <vue-editor v-model="content"></vue-editor>
        <el-button type="primary" class="btn" @click.native="addgood"
          >添加商品</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
//* 导入商品分类的请求,动静态参数
import { classify, parameter, addgoods } from '@/api/goods'
// 富文本编辑器
import { VueEditor } from 'vue2-editor'
export default {
  created () {
    // 获取商品分类参数
    this.getGoodsClassify()
    // 获取动态参数
    this.getState()
    // 获取静态属性
    this.getStatic()
  },
  data () {
    return {
      content: '', //* 富文本的双向绑定,就是里面输入的值
      active: 0, //* 步骤条显示到了哪一个步骤
      goodFrom: {
        goods_name: '', //* 商品名称
        goods_cat: '', //* 分类列表
        goods_price: '0', //* 价格
        goods_number: '0', //* 数量
        goods_weight: '0' //* 重量
      },
      rules: {
        goods_name: [
          { required: true, trigger: 'blur', message: '商品名称不可以为空' }
        ],
        goods_price: [
          { required: true, trigger: 'blur', message: '商品价格不可以为空' }
        ],
        goods_weight: [
          { required: true, trigger: 'blur', message: '商品重量不可以为空' }
        ],
        goods_number: [
          { required: true, trigger: 'blur', message: '商品数量不可以为空' }
        ],
        goods_cat: [
          { required: true, trigger: 'blur', message: '商品分类不可以为空' }
        ]

      },
      options: [], //* 分类参数
      class: [6], //* 选中的分类的一二三级的id,最后一个用来请求下一项的参数，当前面不选择直接跳到二三步时，我们用6区请求
      state: [], //* 动态参数的数据
      staticmore: [], //* 静态属性的数据
      checked: true, //* 单选框的选中状态
      fileList: [] //* 上传的文件列表
    }
  },
  methods: {
    //* 获取商品分类
    async getGoodsClassify () {
      const res = await classify({ type: '', pagenum: '', pagesize: '' })
      // console.log(res, '分类参数')
      this.options = res
    },
    handleChange (value) {
      // console.log(value)
      this.class = value
      //* 静态参数，页面刷新的时候，先进行一次，下拉选择的时候再进行一次
      // 获取动态参数
      this.getState()
      // 获取静态属性
      this.getStatic()
    },
    //* 获取动态参数
    async getState () {
      this.state = await parameter({ id: this.class[this.class.length - 1], sel: 'many' })
      // console.log(res, '动态canshu')
      // res.forEach(item => {
      //   item.attr_vals.split('')
      // })
    },
    //* 获取静态属性
    async getStatic () {
      this.staticmore = await parameter({ id: this.class[this.class.length - 1], sel: 'only' })
      // console.log(res, '静态属性')
    },
    //* 点击删除动态参数
    delstate (id, index) {
      console.log(id, index)
      //* 我们找到对应的数据，将数据删除
      this.state.forEach(item => {
        if (item.attr_id === id) {
          console.log()
          console.log(item.attr_vals.split(' ').splice(index, 1))
          item.attr_vals = item.attr_vals.split(' ')
          item.attr_vals.splice(index, 1)
          item.attr_vals = item.attr_vals.join(' ')
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList, 333)
    },
    handlePreview (file) { //* 点击照片触发
      console.log(file, 222)
    },
    addpic (res, file, fileList) {
      console.log(res, '结果')
      console.log(file, 'file')
      console.log(fileList, 'fileList')
      this.fileList.push({ pic: res.data.tmp_path })
    },
    handleClick (tab, event) {
      this.active = parseFloat(tab.paneName)
    },
    async addgood () {
      try {
        await this.$refs.goodFrom.validate()
        const a = {
          goods_name: this.goodFrom.goods_name,
          goods_cat: this.goodFrom.goods_cat.join(','),
          goods_price: this.goodFrom.goods_price,
          goods_number: this.goodFrom.goods_number,
          goods_weight: this.goodFrom.goods_weight,
          goods_introduce: this.content,
          pics: this.fileList,
          attrs: [...this.state, ...this.staticmore]
        }
        await addgoods(a)
        //* 成功后跳转到
        this.$router.back()
        // console.log('验证成功')
      } catch (err) {
        // this.$message.error('请完整填写表单')
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { VueEditor }
}
</script>

<style scoped lang='less'>
/deep/.el-card__header {
  text-align: center;
  border-bottom: unset;
}
.clearfix {
  background-color: #f4f4f5;
  color: #909399;
}
/deep/.ql-editor {
  height: 500px;
}
.btn {
  margin-top: 15px;
}
</style>
