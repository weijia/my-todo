# My Todo

一个基于 Vue.js 的任务管理与文章发布系统，从 vue-element-admin 中提取并整合了 Todo 待办事项和文章发布功能。

## 功能特性

### Todo 待办事项
- ✅ 添加待办事项
- ✅ 标记完成/未完成
- ✅ 编辑待办事项（双击编辑）
- ✅ 删除待办事项
- ✅ 全部标记完成/未完成
- ✅ 筛选显示（全部/进行中/已完成）
- ✅ 清除已完成事项
- ✅ 本地存储持久化

### 文章发布
- 📝 文章标题和内容编辑
- 📝 发布平台选择
- 📝 定时发布设置
- 📝 保存草稿功能
- 📝 表单验证
- 📝 发布状态管理

## 技术栈

- Vue 2.6+
- Vue Router 3.x
- Vuex 3.x
- Element UI 2.15+
- Axios
- SCSS

## 项目结构

```
my-todo/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── article.js          # 文章相关 API
│   ├── components/
│   │   ├── TodoList/           # Todo 列表组件
│   │   │   ├── index.vue
│   │   │   ├── Todo.vue
│   │   │   └── index.scss
│   │   └── Sticky/             # 粘性布局组件
│   │       └── index.vue
│   ├── router/
│   │   └── index.js            # 路由配置
│   ├── store/
│   │   ├── index.js            # Vuex 入口
│   │   └── modules/
│   │       ├── todo.js         # Todo 状态管理
│   │       └── publish.js      # 发布状态管理
│   ├── styles/
│   │   └── index.scss          # 全局样式
│   ├── utils/
│   │   └── request.js          # Axios 封装
│   ├── views/
│   │   ├── layout/             # 布局组件
│   │   ├── todo/               # Todo 页面
│   │   └── publish/            # 发布页面
│   ├── App.vue
│   └── main.js
├── babel.config.js
├── package.json
├── vue.config.js
└── README.md
```

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产环境
npm run build:prod

# 构建预发布环境
npm run build:stage
```

## 使用说明

### Todo 功能
1. 在输入框中输入待办事项，按回车添加
2. 点击复选框标记完成/未完成
3. 双击待办事项进行编辑
4. 点击 × 按钮删除待办事项
5. 使用底部筛选按钮切换显示模式
6. 点击"清除已完成"删除所有已完成事项

### 发布功能
1. 填写文章标题和内容
2. 选择发布平台（可多选）
3. 可选：设置发布时间
4. 可选：添加外部链接
5. 点击"发布"按钮发布文章
6. 或点击"保存草稿"保存为草稿

## 浏览器支持

- Chrome / Edge 最新版
- Firefox 最新版
- Safari 最新版

## 参考

本项目基于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 中的 TodoList 组件和 Sticky 组件开发。

## License

MIT
