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
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-row>
      </div>
      <!-- /头部 -->

      <!-- 列表 -->
      <el-table :data="userlist.users" style="width: 100%">
        <el-table-column prop="id" label="#" width="180"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="props">
            <el-switch
              v-model="props.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click.native="changestate(props.row.id, props.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="props">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click.native="changeinfo(props.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click.native="delfn(props.row.id)"
            ></el-button>
            <!-- 设置按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click.native="
                setroles(props.row.id, props.row.username, props.row.role_name)
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /列表 -->

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userlist.total"
      >
      </el-pagination>
      <!-- /分页器 -->
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户对话框"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="ruleFrom" :rules="rules" ref="adduserForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-row>
            <el-col :span="22">
              <el-input
                type="text"
                autocomplete="off"
                v-model="ruleFrom.username"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-row>
            <el-col :span="22">
              <el-input
                type="password"
                autocomplete="off"
                v-model="ruleFrom.password"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-row>
            <el-col :span="22">
              <el-input
                type="email"
                autocomplete="off"
                v-model="ruleFrom.email"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!--  手机号  -->
        <el-form-item label="手机号" prop="mobile">
          <el-row>
            <el-col :span="22">
              <el-input
                autocomplete="off"
                v-model.number="ruleFrom.mobile"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /添加用户对话框 -->

    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户对话框"
      :visible.sync="change"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="ruleFromone" :rules="rulesone" ref="changeuserForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-row>
            <el-col :span="22">
              <el-input
                type="text"
                autocomplete="off"
                v-model="ruleFromone.username"
                :disabled="true"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-row>
            <el-col :span="22">
              <el-input
                type="email"
                autocomplete="off"
                v-model="ruleFromone.email"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!--  手机号  -->
        <el-form-item label="手机号" prop="mobile">
          <el-row>
            <el-col :span="22">
              <el-input
                autocomplete="off"
                v-model.number="ruleFromone.mobile"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeuser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /编辑用户对话框 -->

    <!-- 删除的询问框 -->
    <el-dialog
      title="提示"
      :visible.sync="del"
      width="30%"
      :before-close="handleClose"
    >
      <span class="el-icon-warning">此操作将永久删除该用户，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="del = false">取 消</el-button>
        <el-button type="primary" @click="deluser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /删除的询问框 -->

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="roles"
      width="30%"
      :before-close="handleClose"
    >
      <p>当前的用户：{{ setinfo.username }}</p>
      <p>当前的角色：{{ setinfo.rolename }}</p>
      <p>
        分配新角色：<el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.roleName"
          >
          </el-option>
        </el-select>
      </p>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roles = false">取 消</el-button>
        <el-button type="primary" @click="changeroles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
//* 导入添加用户的接口
import { addusers, chengestate, changeuser, deluser, getroles, changeroles } from '@/api/user.js'
export default {
  created () {
    this.getuserlist({ query: '', pagenum: this.pagenum, pagesize: this.pagesize })
  },
  data () {
    return {
      input: '', //* 输入框的值
      pagenum: 1, //* 当前的页码，
      pagesize: 5, //* 每页默认显示条数
      dialogVisible: false, //* 控制添加用户对话框是否显示
      roles: false, //* 控制修改角色对话框是否显示
      change: false, //* 控制编辑用户对话框
      del: false, //* 删除的框
      ruleFrom: { //* 添加用户表单的内容
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      ruleFromone: {}, //* 编辑用户的表单数据
      rules: { //* 添加表单的规则
        username: [
          { required: true, trigger: 'blur', message: '用户名称不能为空' },
          { min: 2, max: 7, trigger: 'blur', message: '长度在2到7个字符' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 2, max: 7, trigger: 'blur', message: '长度在2到7个字符' }
        ],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, trigger: 'blur', message: '邮箱格式不正确' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, trigger: 'blur', message: '手机号格式不正确' }
        ]
      },
      rulesone: { //* 编辑用户的规则
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, trigger: 'blur', message: '邮箱格式不正确' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, trigger: 'blur', message: '手机号格式不正确' }
        ]
      },
      delid: '',
      options: [], //* 下拉选择框的内容
      value: '', //* 当前选中的角色信息
      setinfo: {
        id: '',
        username: '',
        rolename: '' //* 原来的数据
      },
      uid: ''
    }
  },
  methods: {
    //* 解构异步函数  请求数据
    ...mapActions(['user/getuserlist']),
    ...mapMutations(['user/addnewuser']),
    //*  更改每页的数量就会执行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getuserlist({ query: '', pagenum: this.pagenum, pagesize: this.pagesize })
    },
    //* 更改页码就会执行
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getuserlist({ query: '', pagenum: this.pagenum, pagesize: this.pagesize })
    },
    //* 我们定义一个发送请求的函数，因为当进页面的时候，我们需要获得数据
    //* 点击页码，切换数据的时候也要进行请求
    async getuserlist (params) {
      try {
        await this['user/getuserlist'](params)
        console.log(555)
      } catch (err) {
        console.log(err)
      }
    },
    //* 输入内容，搜素结果
    searchfn () {
      this.getuserlist({ query: this.input, pagenum: this.pagenum, pagesize: this.pagesize })
    },
    //* 点击右上角关闭按钮会触发的事件
    handleClose () {
      this.dialogVisible = false
      this.change = false
      this.del = false
      this.roles = false
    },
    //* 添加用户的函数
    async adduser () {
      try {
        await this.$refs.adduserForm.validate()
        // this.$message.success('登录表单校验成功')
        //* 表单手动验证成功 我们发送请求
        try {
          // * 添加成功后将对话框关闭
          const res = await addusers(this.ruleFrom)
          console.log(res)
          this.$message.success('添加成功')
          this.dialogVisible = false
        } catch (err) {
          this.$message.error('添加失败')
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
      }
    },
    //* 修改用户的状态
    async changestate (uId, type) {
      console.log(uId, type)
      try {
        await chengestate({ uId, type })
      } catch (err) {
        console.log(err)
      }
    },
    //* 编辑用户对话框
    changeinfo (id) {
      console.log(id)
      console.log(this.userlist.users)
      const res = this.userlist.users.filter(item => {
        console.log(item.id)
        return item.id === id
      })
      console.log(res)
      this.ruleFromone = res[0]
      this.change = true
    },
    //* 修改用户信息的确定按钮
    async changeuser () {
      try {
        await this.$refs.changeuserForm.validate()
        // this.$message.success('登录表单校验成功')
        //* 表单手动验证成功 我们发送请求
        try {
          //* 发送请求
          const res = await changeuser({ id: this.ruleFromone.id, email: this.ruleFromone.email, mobile: this.ruleFromone.mobile })
          console.log(res)
          // * 添加成功后将对话框关闭
          this.$message.success('添加成功')
          this.change = false
        } catch (err) {
          this.$message.error('修改失败')
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
      }
    },
    //* 删除用户询问
    delfn (id) {
      console.log(id)
      this.del = true
      this.delid = id
    },
    //* 删除用户的函数
    async deluser () {
      await deluser(this.delid)
      //* 隐藏弹框
      this.del = false
      //* 请求数据
      this.getuserlist({ query: '', pagenum: this.pagenum, pagesize: this.pagesize })
      // this.pagenum = 1
    },
    //* 设置用户角色
    async setroles (id, username, rolename) {
      this.roles = true
      const res = await getroles()
      this.options = res
      console.log(id, username, rolename)
      this.setinfo.id = id
      this.setinfo.username = username
      this.setinfo.rolename = rolename
      this.value = rolename
    },
    async changeroles () {
      // let uid = ''
      this.options.forEach(item => {
        if (item.roleName === this.value) {
          this.uid = item.id
        }
      })
      const res = await changeroles({ id: this.setinfo.id, rid: this.uid })
      console.log(res)
    }
  },
  computed: {
    ...mapGetters(['userlist'])
  },
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
