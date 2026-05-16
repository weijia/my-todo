<template>
  <div class="todo-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待办事项</span>
      </div>
      <todo-list />
    </el-card>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'

export default {
  name: 'Todo',
  components: {
    TodoList
  }
}
</script>

<style lang="scss" scoped>
.todo-container {
  padding: 20px;

  .box-card {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
