import request from '@/utils/request'

/**
 *  获取商品列表
 * @param {} param0
 * @returns
 */
export const goodslist = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 *  获取参数 ，
 * sel 的值为only 静态   many 动态参数
 * @param {*} param0
 * @returns
 */
export const parameter = ({ id, sel }) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

/**
 * 获得商品的分类参数
 * @param {type 1,2,3, 表示分类的层级，如果不传，默认所有级别的分类} param0
 * @param {pagenum, 表示当前的页码值，如果不传，默认所有级别的分类} param0
 * @param {pagesize, 表示当前每页显示多少数据，如果不传，默认所有级别的分类} param0
 * @returns
 */
export const classify = ({ type, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

/**
 * 添加商品
 * @param {object} data
 * @returns
 */
export const addgoods = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}

/**
 *  添加动态静态参数
 * @param {分类id} param0
 * @param {参数名称} param1
 * @param {only,many} param2
 * @param {many 需要填写值的选项} param3
 * @returns
 */
// eslint-disable-next-line camelcase
export const addcategories = ({ id, attr_name, attr_sel, attr_vals }) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

/**
 *  更新动态静态参数
 * @param {分类id} param0
 * @param {attrId,属性id} param1
 * @param {参数名称} param2
 * @param {only,many} param3
 * @param {many 需要填写值的选项} param4
 * @returns
 */

// eslint-disable-next-line camelcase
export const putcategories = (val) => {
  return request({
    method: 'PUT',
    url: `categories/${parseFloat(val.cat_id)}/attributes/${val.attr_id}`,
    data: {
      attr_name: val.attr_name,
      attr_sel: val.attr_sel,
      attr_vals: val.attr_vals
    }
  })
}

/**
 *  删除参数
 * @param {id 分类id} param0
 * @param {attrid 参数名称} param1
 * @returns
 */
export const delcategories = ({ id, attrid }) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`

  })
}

/**
 *
 * @param {分类父id,如果是一级分类，为0} param0
 * @param {分类名称} param1
 * @param {分类层级} param2
 * @returns
 */
// eslint-disable-next-line camelcase
export const addclass = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    method: 'POST',
    url: 'categories',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}
