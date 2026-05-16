const STORAGE_KEY = 'my-todo-list'

const defaultTodos = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]

const getTodosFromStorage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultTodos
  } catch (e) {
    return defaultTodos
  }
}

const saveTodosToStorage = (todos) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (e) {
    console.error('Failed to save todos to localStorage')
  }
}

const state = {
  todos: getTodosFromStorage(),
  visibility: 'all'
}

const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos
    saveTodosToStorage(todos)
  },
  ADD_TODO(state, text) {
    state.todos.push({
      text,
      done: false
    })
    saveTodosToStorage(state.todos)
  },
  TOGGLE_TODO(state, todo) {
    todo.done = !todo.done
    saveTodosToStorage(state.todos)
  },
  DELETE_TODO(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
    saveTodosToStorage(state.todos)
  },
  EDIT_TODO(state, { todo, value }) {
    todo.text = value
    saveTodosToStorage(state.todos)
  },
  CLEAR_COMPLETED(state) {
    state.todos = state.todos.filter(todo => !todo.done)
    saveTodosToStorage(state.todos)
  },
  TOGGLE_ALL(state, done) {
    state.todos.forEach(todo => {
      todo.done = done
    })
    saveTodosToStorage(state.todos)
  },
  SET_VISIBILITY(state, visibility) {
    state.visibility = visibility
  }
}

const actions = {
  addTodo({ commit }, text) {
    commit('ADD_TODO', text)
  },
  toggleTodo({ commit }, todo) {
    commit('TOGGLE_TODO', todo)
  },
  deleteTodo({ commit }, todo) {
    commit('DELETE_TODO', todo)
  },
  editTodo({ commit }, payload) {
    commit('EDIT_TODO', payload)
  },
  clearCompleted({ commit }) {
    commit('CLEAR_COMPLETED')
  },
  toggleAll({ commit }, done) {
    commit('TOGGLE_ALL', done)
  },
  setVisibility({ commit }, visibility) {
    commit('SET_VISIBILITY', visibility)
  }
}

const getters = {
  filteredTodos: (state) => {
    const filters = {
      all: todos => todos,
      active: todos => todos.filter(todo => !todo.done),
      completed: todos => todos.filter(todo => todo.done)
    }
    return filters[state.visibility](state.todos)
  },
  remaining: (state) => {
    return state.todos.filter(todo => !todo.done).length
  },
  allChecked: (state) => {
    return state.todos.every(todo => todo.done)
  },
  todosCount: (state) => {
    return state.todos.length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
