<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column prop="id" label="#" width="180"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="props">
            <el-tag
              :type="
                props.row.level === '0'
                  ? ''
                  : props.row.level === '1'
                  ? 'success'
                  : 'warning'
              "
              >等级{{
                props.row.level === "0"
                  ? "一"
                  : props.row.level === "1"
                  ? "二"
                  : "三"
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getroleslist } from '@/api/roles'
export default {
  created () {
    this.getlist()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getlist () {
      this.tableData = await getroleslist('list')
      // console.log(res)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
