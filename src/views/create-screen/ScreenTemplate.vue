<template>
  <div class="creator-wp">
    <div class="template-list">
      <div class="template-item --blank">
        <div class="template-image">
          <n-button
            type="primary"
            :focusable="false"
            :style="{
              '--n-icon-size': '12px',
            }"
            @click="confirmCreate()"
          >
            <template #icon>
              <n-icon :size="12">
                <IconPlus />
              </n-icon>
            </template>
            创建项目
          </n-button>
        </div>
        <div class="template-info"> 空白画板 </div>
      </div>
    </div>
  </div>
  <CreateModal
    :visibleCreateDialog="visibleCreateDialog"
    :set-visible-create-dialog="setVisibleCreateDialog"
  />
</template>

<script lang="ts" setup>
  import { IconPlus } from '@/icons';
  import { useBoolean } from 'vue3-hooks-plus';
  import CreateModal from './CreateModal.vue';

  const [visibleCreateDialog, { set: setVisibleCreateDialog }] = useBoolean(false);

  // @ts-ignore
  const confirmCreate = () => {
    setVisibleCreateDialog(true);
  };
</script>

<style scoped lang="scss">
  @mixin cover-img {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #131e2d;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    filter: grayscale(1);
    opacity: 0.36;
  }
  .creator-wp {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;

    .template-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      overflow-x: hidden;
      overflow-y: scroll;
      color: #fff;
      font-size: 12px;
      margin: 0 -16px;
      padding-bottom: 100px;
      padding-top: 60px;

      .template-item {
        width: 258px;
        height: 184px;
        box-shadow: var(--datav-shadow);
        border: var(--datav-border);
        margin: 16px;
        transition: 0.2s;
        outline: 1px solid transparent;
        cursor: default;

        .template-image {
          width: 100%;
          height: 146px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
          position: relative;
        }

        .template-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          height: 36px;
          background: var(--datav-bgcolor-2);
          transition: 0.2s;
        }

        &.--blank {
          position: relative;
          outline: var(--datav-border-primary);

          .template-image {
            box-shadow: inset 0 0 46px 0 rgb(136 215 255 / 29%);
          }

          .template-info {
            border-top: var(--datav-border-primary);
            justify-content: center;
            font-size: 14px;
          }
        }
      }

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;

        &::after {
          @include cover-img;
        }
      }

      .template-mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgb(0 0 0 / 50%);
        transition: 0.2s;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        font-weight: 400;

        .create-btn {
          width: 112px;
          padding: 0 5px;
        }

        .preview-btn {
          margin-top: 10px;
          width: 112px;
          padding: 0 5px;
          margin-left: 0;
        }
      }

      .template-item:hover {
        outline: var(--datav-border-primary);

        .template-mask {
          pointer-events: all;
          opacity: 1;
        }
      }

      .template-name {
        font-size: 12px;
      }

      .template-size {
        color: #999;
        text-align: right;
        font-family: Orbitron-Bold, PingFangSC-Medium, 'PingFang SC', 'Microsoft YaHei', Arial,
          Helvetica, sans-serif;
      }

      .template-item-placehoder {
        width: 258px;
        margin: 16px;
      }
    }
  }
</style>
