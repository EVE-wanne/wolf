<template>
  <div>
    <el-card class="box-card">
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-button icon="el-icon-search"></el-button>
      </el-row>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column prop="order_id" label="#" width="50">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="220">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template v-slot="props">
            <el-button
              type="success"
              size="small"
              v-if="props.row.pay_status === '1'"
              >已付款</el-button
            >
            <el-button type="danger" size="small" v-else>未付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="update_time" label="下单时间">
          <template v-slot="props">
            {{ props.row.update_time | datefmt }}
          </template>
        </el-table-column>
        <el-table-column prop="consignee_addr" label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="dialogVisible = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
    </el-card>

    <!-- 修改地址的弹窗 -->
    <el-dialog title="修改收货地址" :visible.sync="dialogVisible" width="30%">
      <el-cascader :options="cityOptions" clearable :value="city"></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderlist } from '@/api/order'
import cityOptions from '@/js/city_data2017_element'
export default {
  created () {
    this.getorders()
  },
  data () {
    return {
      input: '',
      tableData: [],
      cityOptions: cityOptions, //* 这个是城市数据
      dialogVisible: false
    }
  },
  methods: {
    async getorders () {
      const res = await orderlist({ pagenum: 1, pagesize: 27 })
      this.tableData = res.goods
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
