import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/todo',
    children: [
      {
        path: 'todo',
        name: 'Todo',
        component: () => import('@/views/todo/index'),
        meta: { title: '待办事项', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/publish',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Publish',
        component: () => import('@/views/publish/index'),
        meta: { title: '发布文章', icon: 'el-icon-edit' }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
