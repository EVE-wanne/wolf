<template>
  <div>欢迎xxx</div>
</template>

<script>
export default {
  created () {
    //* 开始的时候我们就将面包屑清空
    this.$store.commit('user/setbreadcrumb', {
      one: '',
      first: '',
      two: ''
    })
  },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
</style>
