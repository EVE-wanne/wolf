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
