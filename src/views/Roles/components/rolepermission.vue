<template>
  <div>
    <el-table
      :data="tablelist"
      style="width: 100%"
      :show-header="false"
      sum-text
    >
      <el-table-column prop="authName" width="180">
        <template slot-scope="props">
          <el-tag>{{ props.row.authName }}</el-tag>
          <i class="el-icon-caret-right"></i>
        </template>
      </el-table-column>
      <el-table-column prop="children">
        <template slot-scope="props">
          <el-table
            :data="props.row.children"
            :show-header="false"
            style="width: 100%"
          >
            <el-table-column prop="authName">
              <template slot-scope="props">
                <el-tag type="success">{{ props.row.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </template>
            </el-table-column>
            <el-table-column prop="children">
              <template slot-scope="props">
                <el-tag
                  v-for="tag in props.row.children"
                  :key="tag.authName"
                  :closable="true"
                  @close="del(tag.id, props.row.id)"
                >
                  {{ tag.authName }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delroles } from '@/api/roles'
export default {
  props: {
    tablelist: {
      type: Array,
      required: true
    },
    userid: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {

    }
  },
  methods: {

    async del (id) {
      console.log(id)
      const res = await delroles({ roleId: this.userid, rightId: id })
      console.log(res, 222)
      //* 我们将返回的数据再传回去，覆盖原来的tableData
      // console.log(rolesid, 3333)
      this.$emit('removedata', res, this.userid)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.list {
  padding: 8px 0;
  margin: 0 50px;
  border-top: 1px solid rgba(204, 204, 204, 0.3);
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
}
.el-tag {
  margin-right: 10px;
  margin-top: 5px;
}
</style>
