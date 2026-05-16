import request from '@/utils/request'

export function createArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article',
    method: 'put',
    data
  })
}

export function getArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete'
  })
}

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
