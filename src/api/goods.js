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
