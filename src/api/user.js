import request from '@/utils/request'

/**
 *  登录的接口
 * @param {username,password} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {

      username,
      password
    }
  })
}
//*  这个先留着，最后看是怎么去实现页面
/**
 * 获取权限列表
 * @returns
 */
export const getmenus = () => {
  return request({
    method: 'GET',
    url: 'menus'
  })
}

/**
 * 请求用户数据列表
 * pagenum 当前页码
 * pagesize 每页的数据条数
 * @param {} param0
 * @returns
 */
export const userlist = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 *  添加用户
 *  username 用户名
 * password 密码
 * email 邮箱
 * mobile 电话号码
 * @param {*} params
 * @returns
 */
export const addusers = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

/**
 *  修改用户状态
 * @param {用户id,用户状态} param0
 * @returns
 */
export const chengestate = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

/**
 * 编辑用户提交
 * @param {} param0
 * @returns
 */
export const changeuser = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}

/**
 * 删除用户接口
 * @param {*} id
 * @returns
 */

export const deluser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`

  })
}

/**
 * 获取角色列表
 * @returns
 */
export const getroles = () => {
  return request({
    method: 'GET',
    url: 'roles'

  })
}

/**
 * 分配角色
 * @param {*} param0
 * @returns
 */
export const changeroles = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
