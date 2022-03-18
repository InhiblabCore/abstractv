<template>
  <div>
    <n-modal
      :show="visibleCreateDialog"
      preset="dialog"
      :show-icon="false"
      title="创建数据大屏"
      style="width: 400px"
    >
      <div class="create-dialog">
        <p class="name-title"> <span class="required">*</span>数据大屏名称 </p>
        <new-input
          v-model="projectName"
          placeholder="请输入大屏名称"
          spellcheck="false"
          class="name-input"
        />
        <p class="name-title">大屏分组</p>
        <n-select v-model:value="groupId" :options="groupOpts" size="small" />
      </div>
      <template #action>
        <n-button :focusable="false" @click="setVisibleCreateDialog(false)"> 取消 </n-button>

        <n-button type="primary" :focusable="false" :loading="saveLoading" @click="doCreate">
          创建
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui'
  const nMessage = useMessage()
  const router = useRouter()

  const props =
    defineProps<{ visibleCreateDialog?: boolean; setVisibleCreateDialog: (v: boolean) => void }>()

  const projectName = ref('')
  const groupId = ref(0)
  const saveLoading = ref(false)
  const groups = ref([{ name: '未分组', id: 1 }])
  const groupOpts = computed(() => {
    return groups.value.map((m) => ({ value: m.id, label: m.name }))
  })

  const doCreate = async () => {
    try {
      if (!projectName.value) {
        nMessage.error('请输入大屏名称')
        return
      }
      saveLoading.value = true
      props.setVisibleCreateDialog(false)
      router.push({
        name: 'ScreenEditor',
        params: {
          projectId: 123,
        },
        query: {
          tpl: 111,
        },
      })
    } catch (error: any) {
      nMessage.error(error.message)
    } finally {
      saveLoading.value = false
    }
  }
</script>

<style scoped lang="scss">
  .create-dialog {
    .required {
      display: inline-block;
      margin-right: 6px;
      color: var(--datav-red-color);
    }

    .template-desc {
      margin-bottom: 20px;
      opacity: 0.8;
      overflow: hidden;
      -webkit-line-clamp: 3;
      display: box;
      -webkit-box-orient: vertical;
    }

    .name-title {
      margin-bottom: 10px;
      line-height: 20px;
    }

    .name-input {
      margin-bottom: 15px;
      height: 28px;
      line-height: 26px;
    }
  }
</style>
