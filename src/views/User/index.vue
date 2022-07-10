<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片表头 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <!-- 输入框 -->
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input
          ></el-col>
          <el-button icon="el-icon-search"></el-button>
          <el-button type="primary">添加用户</el-button>
        </el-row>
      </div>
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="#" width="180"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      input: '',
      tableData: [{
        id: 25,
        username: 'tige117',
        mobile: '18616358651',
        type: 1,
        email: 'tige112@163.com',
        create_time: '2017-11-09T20:36:26.000Z',
        mg_state: true, // 当前用户的状态
        role_name: '炒鸡管理员'
      }]
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
.box-card {
  margin-top: 20px;
}
/deep/.el-card__header {
  border-bottom: unset;
}
</style>
