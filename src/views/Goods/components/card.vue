<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="expand" class="addtabel">
        <template slot-scope="props">
          <span v-if="props.row.attr_vals.length">
            <el-tag
              :key="index"
              v-for="(tag, index) in props.row.attr_vals.split(' ')"
              closable
              :disable-transitions="false"
              @close="handleClose(tag, index, props.row)"
            >
              {{ tag }}
            </el-tag>
          </span>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(props.row)"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="#" prop="attr_id" width="80px"> </el-table-column>
      <el-table-column label="分类名称" prop="attr_name"> </el-table-column>
      <el-table-column label="操作" prop="attr_name">
        <template v-slot="props">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(props.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { putcategories, delcategories } from '@/api/goods'
export default {
  props: {
    tableData: {
      type: Array
    }

  },
  created () { },
  data () {
    return {
      inputVisible: false, //* 输入框是否显示
      inputValue: '' //* 输入框的值
    }
  },
  methods: {
    async handleClose (tag, index, row) {
      // console.log('关闭', tag)
      // console.log(row.attr_vals, '钱')
      console.log(row.attr_vals.split(' '))
      row.attr_vals = row.attr_vals.split(' ')
      row.attr_vals.splice(index, 1)
      row.attr_vals = row.attr_vals.join('')
      // console.log(row.attr_vals, '后')
      const res = await putcategories(row)
      console.log(res)
    },
    showInput () {
      console.log('显示')
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //* 点击回车的时候会触发，将输入框的值取到，添加进去
    async handleInputConfirm (row) {
      console.log(row)
      if (this.inputValue.length > 0) {
        row.attr_vals = row.attr_vals + this.inputValue
        //* 触发提交参数
        const res = await putcategories(row)
        console.log(res)
      }
      //* 如果有值就发送添加请求
      this.inputVisible = false
      this.inputValue = ''
    },
    //* 删除内容
    async del (row) {
      console.log(row, 888)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //* 下面删除操作
        await delcategories({ id: row.cat_id, attrid: row.attr_id })
        this.$emit('delfn')
      } catch (err) {
        console.log('取消')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.input-new-tag {
  width: 88px;
}
.el-tag {
  margin-left: 10px;
}
.el-button {
  margin-left: 10px;
}
</style>
