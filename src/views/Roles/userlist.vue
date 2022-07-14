<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary">添加角色</el-button>
        </span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        :stripe="true"
      >
        <el-table-column type="expand" label="#" width="50px" prop="">
          <template slot-scope="props">
            <RolePermission
              :tablelist="props.row.children"
              :userid="props.row.id"
              @removedata="remove"
            ></RolePermission>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="50px"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-star-off"
              @click.native="showtree(props.row.id)"
              >分配权限</el-button
            >
          </template> </el-table-column
        >s
      </el-table>
    </el-card>
    <!-- 权限分配的弹层 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 树形 -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="clicklist"
        :props="defaultProps"
        :default-expand-all="true"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeroles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//* 导入角色请求接口
import { getroles } from '@/api/user'
//* 导入角色权限模块
import RolePermission from '@/views/Roles/components/rolepermission.vue'
import { getroleslist, changeroles } from '@/api/roles'
export default {
  created () {
    this.getroles()
  },
  data () {
    return {
      dialogVisible: false,
      tableData: [], //* 角色的权限
      data: [], //* 树形组件的数据
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      clicklist: [], //* 选中的数据的集合
      userid: ''
    }
  },
  methods: {
    async getroles () {
      this.tableData = await getroles()
    },
    async showtree (id) {
      const res = await getroleslist('tree')
      console.log(res)
      this.data = res
      this.dialogVisible = true
      console.log(id)
      this.userid = id
      this.tableData.forEach(item => {
        if (item.id === id) {
          item.children.forEach(item => {
            // this.clicklist.push(item.id)
            item.children.forEach(item => {
              // this.clicklist.push(item.id)
              item.children.forEach(item => {
                this.clicklist.push(item.id)
              })
            })
          })
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    async changeroles () {
      this.clicklist = this.$refs.tree.getCheckedNodes(false, true)
      const idlist = []
      this.clicklist.forEach(item => {
        idlist.push(item.id)
      })
      console.log(idlist.join(','))
      await changeroles({ roleId: this.userid, rids: idlist.join(',') })
      //* 关闭弹窗
      this.dialogVisible = false
    },
    remove (val, id) {
      console.log(id)
      // this.tableData = val
      const i = this.tableData.findIndex(item => {
        return item.id === id
      })
      this.tableData[i].children = val
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { RolePermission }
}
</script>

<style scoped lang='scss'>
</style>
