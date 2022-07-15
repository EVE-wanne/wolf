<template>
  <div>
    <!-- 卡片表头 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <el-row>
          <!-- 输入框 -->
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input
          ></el-col>
          <!-- 搜索按钮 -->
          <el-button icon="el-icon-search" @click="searchfn"></el-button>
          <!-- 添加用户按钮 -->
          <el-button type="primary" @click="addgoods">添加商品</el-button>
        </el-row>
      </div>
      <!-- /头部 -->

      <!-- 列表 -->
      <el-table :data="goods.goods" style="width: 100%" :border="true">
        <el-table-column prop="goods_id" label="#" width="180">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="upd_time" label="创建时间">
          <template slot-scope="props">
            {{ props.row.upd_time | datefmt }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <!-- 编辑按钮 -->
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-table-column>
      </el-table>
      <!-- /列表 -->

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goods.total"
      >
      </el-pagination>
      <!-- /分页器 -->
    </el-card>
  </div>
</template>

<script>
import { goodslist } from '@/api/goods'
export default {
  created () {
    this.getgoods({ pagenum: this.pagenum, pagesize: this.pagesize })
  },
  data () {
    return {
      goods: [], //* 所有商品的列表
      input: '', //* 输入框的值
      pagenum: 1, //* 当前的页码，
      pagesize: 5 //* 每页默认显示条数
    }
  },
  methods: {
    //*  更改每页的数量就会执行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getgoods({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    //* 更改页码就会执行
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getgoods({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    //* 我们定义一个发送请求的函数，因为当进页面的时候，我们需要获得数据
    //* 点击页码，切换数据的时候也要进行请求
    async getgoods (params) {
      this.goods = await goodslist(params)
    },
    //* 点击搜索按钮触发
    searchfn () {
      if (this.input === '') {
        this.$message.error('请输入搜索内容')
      } else {
        //* 发送请求，将数据更新成搜索结果
        this.getgoods({ query: this.input, pagenum: this.pagenum, pagesize: this.pagesize })
      }
    },
    addgoods () {
      this.dialogVisible = true
      this.$router.push('addgoods')
      this.$store.commit('user/setbreadcrumb', {
        one: '首页',
        first: '商品管理',
        two: '添加商品'
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
