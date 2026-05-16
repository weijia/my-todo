import { createArticle, updateArticle, getArticle } from '@/api/article'

const state = {
  article: {
    id: undefined,
    title: '',
    content: '',
    status: 'draft'
  },
  platforms: ['a-platform'],
  platformsOptions: [
    { key: 'a-platform', name: '平台A' },
    { key: 'b-platform', name: '平台B' },
    { key: 'c-platform', name: '平台C' }
  ],
  loading: false
}

const mutations = {
  SET_ARTICLE(state, article) {
    state.article = { ...state.article, ...article }
  },
  SET_TITLE(state, title) {
    state.article.title = title
  },
  SET_CONTENT(state, content) {
    state.article.content = content
  },
  SET_STATUS(state, status) {
    state.article.status = status
  },
  SET_PLATFORMS(state, platforms) {
    state.platforms = platforms
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  RESET_ARTICLE(state) {
    state.article = {
      id: undefined,
      title: '',
      content: '',
      status: 'draft'
    }
    state.platforms = ['a-platform']
  }
}

const actions = {
  setArticle({ commit }, article) {
    commit('SET_ARTICLE', article)
  },
  setTitle({ commit }, title) {
    commit('SET_TITLE', title)
  },
  setContent({ commit }, content) {
    commit('SET_CONTENT', content)
  },
  setStatus({ commit }, status) {
    commit('SET_STATUS', status)
  },
  setPlatforms({ commit }, platforms) {
    commit('SET_PLATFORMS', platforms)
  },
  resetArticle({ commit }) {
    commit('RESET_ARTICLE')
  },
  async createArticle({ commit, state }) {
    commit('SET_LOADING', true)
    try {
      const data = {
        title: state.article.title,
        content: state.article.content,
        status: state.article.status,
        platforms: state.platforms
      }
      const response = await createArticle(data)
      commit('SET_LOADING', false)
      return response
    } catch (error) {
      commit('SET_LOADING', false)
      throw error
    }
  },
  async updateArticle({ commit, state }) {
    commit('SET_LOADING', true)
    try {
      const data = {
        id: state.article.id,
        title: state.article.title,
        content: state.article.content,
        status: state.article.status,
        platforms: state.platforms
      }
      const response = await updateArticle(data)
      commit('SET_LOADING', false)
      return response
    } catch (error) {
      commit('SET_LOADING', false)
      throw error
    }
  },
  async fetchArticle({ commit }, id) {
    commit('SET_LOADING', true)
    try {
      const response = await getArticle(id)
      commit('SET_ARTICLE', response.data)
      commit('SET_LOADING', false)
      return response
    } catch (error) {
      commit('SET_LOADING', false)
      throw error
    }
  }
}

const getters = {
  isDraft: (state) => {
    return state.article.status === 'draft'
  },
  canPublish: (state) => {
    return state.article.title.trim() !== '' && state.article.content.trim() !== ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
