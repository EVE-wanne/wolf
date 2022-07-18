import request from '@/utils/request'

/**
 *  获取订单列表
 * @returns
 */
export const orderlist = (params) => {
  return request({
    method: 'GET',
    url: 'orders',
    params
  })
}
