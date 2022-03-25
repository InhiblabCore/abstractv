<template>
  <div class="my-workstation">
    <div class="workstation-main">
      <div class="workstation-manage">
        <div class="manage-title">
          <div class="my-project project-group">
            <span class="ml-1">我的分组</span>
            <n-icon class="btn-add-icon" @click="adding = true">
              <IconPlus />
            </n-icon>
          </div>
          <!-- 分组 -->
          <div
            class="my-project project-all"
            :class="{ 'project-checked-color': true }"
            @click="toggleProject(0)"
          >
            <span>{{ '未分组' }}</span>
            <span class="project-num">{{ 7 }}</span>
          </div>
          <!-- 新增分组 -->
          <div v-if="adding" class="new-group">
            <input v-focus class="edit-input" @blur="onAddInputBlur" @keyup.enter="addGroup" />
          </div>
        </div>
      </div>

      <div class="project-screen-list">
        <g-loading :spinning="loading">
          <project-list :group="[]" />
        </g-loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui'
  import { IconPlus } from '@/icons'
  import ProjectList from './ProjectList.vue'

  const selectedGroupId = ref(-1)
  const loading = ref(false)
  const adding = ref(false)
  const nMessage = useMessage()
  // const draging = ref(false);

  const toggleProject = (id: number) => {
    selectedGroupId.value = id
  }

  const onAddInputBlur = (e: any) => {
    if (!adding.value) {
      return
    }

    const name = (e.target.value || '').trim()
    if (!name) {
      adding.value = false
    }
  }

  const addGroup = async (e: any) => {
    if (!adding.value) {
      return
    }

    const name = (e.target.value || '').trim()
    if (name) {
      try {
        adding.value = false
        // await createProjectGroup(name);
      } catch (error: any) {
        nMessage.error(error.message)
      }
    } else {
      adding.value = false
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/mixins/util';
  @import '@/styles/mixins/function';

  .my-workstation {
    position: relative;
    user-select: none;

    .workstation-main {
      display: flex;
      flex: 1;
    }

    .workstation-manage {
      min-width: 240px;
      max-width: 240px;
      color: #fff;
      position: sticky;
      top: 70px;
      font-size: 14px;
      overflow-y: auto;
      height: calc(100vh - 150px);

      .manage-main {
        display: flex;
        flex-direction: column;
        font-size: 12px;

        &.draging {
          background: rgb(36 127 255 / 30%);
        }
      }

      .my-project {
        line-height: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 30px;
      }

      .manage-title {
        .project-group {
          padding-left: 24px;
          height: 56px;
          border-bottom: 1px solid #27343e;
        }

        .btn-add-icon {
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: var(--datav-main-color);
          }
        }
      }

      .project-ungrouped {
        color: var(--abstractv-font-color);
      }

      .project-all {
        padding-left: 50px;
        transition: color 0.2s;
        cursor: pointer;

        &:hover {
          color: var(--datav-main-color);
        }
      }

      .project-checked-color {
        background-image: url(com-cdn('datav/nav-menu-img.png'));
        background-repeat: round;

        &:hover {
          color: #fff !important;
        }

        .project-name {
          color: #fff !important;
        }
      }

      .project-num {
        user-select: none;
        color: var(--abstractv-font-color);
      }

      .group-btns {
        display: none;
        color: var(--datav-main-color);

        i + i {
          margin-left: 10px;
        }
      }

      .main-project {
        position: relative;
        height: 36px;
        padding: 0 30px 0 50px;
        display: flex;
        font-size: 12px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: color 0.2s;

        .project-name {
          width: 100px;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
        }

        &:hover {
          .project-name {
            color: var(--datav-main-color);
          }
        }

        &.drag-enter {
          background: var(--datav-body-bg);
        }
      }

      .group-project {
        &:hover {
          .project-num {
            display: none;
          }

          .group-btns {
            display: inline-block;
          }
        }
      }
    }

    .new-group {
      padding: 5px 30px 5px 50px;
    }

    .edit-input {
      @include utils-ellipsis;

      background: var(--datav-bgcolor-2);
      color: #fff;
      padding: 0 10px;
      line-height: 30px;
      width: 100%;
      height: 30px;
      border: var(--datav-border-primary);
      transition: 0.2s;
      box-shadow: var(--datav-shadow);
    }

    .project-screen-list {
      padding-left: 20px;
      padding-right: 50px;
      width: 100%;
    }
  }
</style>
