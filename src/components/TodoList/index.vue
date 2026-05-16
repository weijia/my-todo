<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="添加待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('项') }}待完成
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="setVisibility(key)">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button v-show="todos.length > remaining" class="clear-completed" @click="clearCompleted">
        清除已完成
      </button>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Todo from './Todo.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n + w,
    capitalize: s => {
      const map = {
        'all': '全部',
        'active': '进行中',
        'completed': '已完成'
      }
      return map[s] || s
    }
  },
  data() {
    return {
      filters: {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.done),
        completed: todos => todos.filter(todo => todo.done)
      }
    }
  },
  computed: {
    ...mapGetters('todo', ['filteredTodos', 'remaining', 'allChecked', 'todosCount']),
    todos() {
      return this.$store.state.todo.todos
    },
    visibility: {
      get() {
        return this.$store.state.todo.visibility
      },
      set(value) {
        this.setVisibility(value)
      }
    }
  },
  methods: {
    ...mapActions('todo', ['addTodo', 'toggleTodo', 'deleteTodo', 'editTodo', 'clearCompleted', 'toggleAll', 'setVisibility'])
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
