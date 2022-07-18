<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary" @click="showaddlog = true"
            >添加角色</el-button
          >
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
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(props.row.id)"
              >删除</el-button
            >
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
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%">
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

    <!-- 添加角色的弹层 -->
    <el-dialog
      title="添加角色"
      :visible.sync="showaddlog"
      width="50%"
      v-if="showaddlog"
      @close="close"
    >
      <el-form
        :model="addFrom"
        :rules="rules"
        label-width="100px"
        ref="addform"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addfn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色的弹层 -->
  </div>
</template>

<script>
//* 导入角色请求接口
import { getroles } from '@/api/user'
import { adduse, getroleslist, changeroles, deluse } from '@/api/roles'
//* 导入角色权限模块
import RolePermission from '@/views/Roles/components/rolepermission.vue'

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
      userid: '',
      showaddlog: false, //* 添加角色的弹窗
      addFrom: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '2-7个字符', trigger: 'blur' }
        ]
      }
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
    },
    async addfn () {
      try {
        await this.$refs.addform.validate()
        const res = await adduse(this.addFrom)
        console.log(res)
        this.getroles()
        this.showaddlog = false
        this.addFrom = {
          roleName: '',
          roleDesc: ''
        }
      } catch (err) {
        console.log(err)
      }
    },
    async del (id) {
      await deluse(id)
      this.getroles()
    },
    close () {
      this.addFrom = {
        roleName: '',
        roleDesc: ''
      }
      this.showaddlog = false
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
