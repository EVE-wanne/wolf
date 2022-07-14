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
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form>
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量(kg)">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="value" placeholder="请选择">
              <!-- 下拉选择框 -->
              <el-option> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0 //* 步骤条显示到了哪一个步骤
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
</style>
