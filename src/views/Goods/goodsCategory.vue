<template>
  <div>
    <el-card class="box-card">
      <!-- 添加按钮 -->
      <el-button type="primary" @click="dialogVisible = true" class="btn"
        >添加分类</el-button
      >
      <!-- /添加按钮 -->

      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
      >
        <el-table-column prop="cat_id" label="#" width="120"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="props">
            <i :class="props.row.cat_deleted ? '' : 'el-icon-success'"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="等级">
          <template v-slot="props">
            <el-button
              type="primary"
              plain
              v-if="props.row.cat_level === 0"
              size="small"
              >一级</el-button
            >
            <el-button
              type="success"
              plain
              v-else-if="props.row.cat_level === 1"
              size="small"
              >二级</el-button
            >
            <el-button type="warning" plain v-else size="small">三级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 4, 6, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- /分页器 -->
    </el-card>

    <!-- 添加分类弹出层 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%"
      v-if="dialogVisible"
      @close="addfrom.cat_name = ''"
    >
      <el-form label-width="80px" :model="addfrom" :rules="rules" ref="addfrom">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addfrom.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <!-- 级联选择框 -->
      <span>父级分类：</span>
      <el-cascader
        :options="alldata"
        :props="{ checkStrictly: true, label: 'cat_name', value: 'cat_id' }"
        clearable
        @change="fn"
        ref="cas"
      ></el-cascader>
      <!-- 级联选择框 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addfn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /添加分类弹出层 -->
  </div>
</template>

<script>
import { classify, addclass } from '@/api/goods'
export default {
  created () {
    //* 页面刷新，先请求一次数据
    this.getlist()
  },
  data () {
    return {
      total: null,
      alldata: {},
      tableData: [],
      pagesize: 4, //* 默认每页的数量
      pagenum: 1, //* 默认第一页
      dialogVisible: false, //* 弹出层的显示kongzhi
      addfrom: {
        cat_name: ''
      },
      rules: {
        cat_name: [
          { required: true, trigger: 'blur', message: '分类名称不能为空' },
          { min: 2, max: 8, trigger: 'blur', message: '请输入2到8个字符' }
        ]
      },
      class: [] //* 下拉框的值，是这一级的id值
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getlist()
    },
    async getlist () {
      const obj = {
        type: '',
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      const res = await classify(obj)

      this.total = res.total
      this.tableData = res.result
      this.alldata = await classify({
        type: '',
        pagenum: '',
        pagesize: ''
      })
    },
    fn (val) {
      console.log(val, '选中的val')
      this.class = val
    },
    async addfn () {
      //* 先验证表单
      try {
        await this.$refs.addfrom.validate()
        //* 判断是不是添加的一级分类
        if (this.class.length === 0) {
          await addclass({ cat_pid: 0, cat_name: this.addfrom.cat_name, cat_level: 0 })
          //* 重新加载
          this.getlist()
        } else {
          await addclass({ cat_pid: this.class[this.class.length - 1], cat_name: this.addfrom.cat_name, cat_level: this.class.length })
          //* 重新加载
          this.getlist()
        }
        this.addfrom = {
          cat_name: ''
        }
        this.dialogVisible = false
      } catch (err) {
        console.log(err)
      }
    }
    // closefn () {
    //   this.$refs.addfrom.resetFields()
    //   this.$refs.cas.clearCheckedNodes()
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-icon-success {
  color: green;
}
.btn {
  margin-bottom: 15px;
}
</style>
