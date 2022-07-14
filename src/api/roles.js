import request from '@/utils/request'

/**
 *  获取权限列表
 *  list 为列表
 *  tree 为树状
 * @param {} param0
 * @returns
 */
export const getroleslist = (type) => {
  return request({
    method: 'GET',
    url: `rights/${type}`

  })
}

/**
 * 修改角色权限
 * @param {*} param0
 * @returns
 */
export const changeroles = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }

  })
}

/**
 * 删除角色权限
 * @param {*} param0
 * @returns
 */
export const delroles = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
