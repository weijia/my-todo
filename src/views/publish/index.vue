<template>
  <div class="publish-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <el-dropdown trigger="click">
        <el-button plain>
          发布平台<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border">
          <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
            <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button plain>
          链接<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:300px">
          <el-input v-model="url" placeholder="请输入链接地址">
            <template slot="prepend">
              URL
            </template>
          </el-input>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="发布时间" />
      </div>

      <el-button style="margin-left: 10px;" type="success" :loading="loading" @click="handlePublish">
        发布
      </el-button>
      <el-button type="warning" :loading="loading" @click="handleSaveDraft">
        保存草稿
      </el-button>
    </sticky>

    <div class="components-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章发布</span>
        </div>

        <el-form ref="articleForm" :model="article" :rules="rules" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title" placeholder="请输入文章标题" />
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <el-input
              v-model="article.content"
              type="textarea"
              :rows="15"
              placeholder="请输入文章内容"
            />
          </el-form-item>

          <el-form-item label="状态">
            <el-tag :type="article.status === 'published' ? 'success' : 'info'">
              {{ article.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Publish',
  components: { Sticky },
  data() {
    return {
      url: '',
      time: '',
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('publish', ['article', 'platformsOptions', 'loading']),
    ...mapGetters('publish', ['canPublish']),
    platforms: {
      get() {
        return this.$store.state.publish.platforms
      },
      set(value) {
        this.setPlatforms(value)
      }
    }
  },
  methods: {
    ...mapActions('publish', ['createArticle', 'updateArticle', 'setPlatforms', 'setStatus', 'resetArticle']),
    handlePublish() {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          this.setStatus('published')
          this.createArticle().then(response => {
            this.$message.success('文章发布成功！')
            this.resetArticle()
          }).catch(error => {
            this.$message.error('发布失败：' + error.message)
          })
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    },
    handleSaveDraft() {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          this.setStatus('draft')
          this.createArticle().then(response => {
            this.$message.success('草稿保存成功！')
          }).catch(error => {
            this.$message.error('保存失败：' + error.message)
          })
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-container {
  .sub-navbar {
    background: #f0f2f5;
    padding: 10px 20px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .time-container {
    display: inline-block;
    margin-left: 10px;
  }

  .components-container {
    .box-card {
      max-width: 1000px;
      margin: 0 auto;
    }
  }
}
</style>
