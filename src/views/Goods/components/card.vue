<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-tag
            :key="tag"
            v-for="tag in props.row.attr_vals.split(' ')"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
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
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    handleClose (tag) {
      console.log('关闭')
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      console.log('显示')
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      console.log('输入事件 ')
      // const inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      this.inputVisible = false
      this.inputValue = ''
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
