<template>
  <g-loading type="square" :spinning="loading">
    <div class="create-screen">
      <div class="top-bar">
        <div class="right-bar"></div>
        <div class="left-bar"></div>
        <router-link to="/" class="return-btn">
          <span class="return-text">
            <n-icon class="return-icon">
              <IconBack />
            </n-icon>
            取消创建
          </span>
        </router-link>
      </div>
      <ScreenTemplate />
    </div>
  </g-loading>
</template>

<script lang="ts" setup>
  import { IconBack } from '@/icons';
  import ScreenTemplate from './ScreenTemplate.vue';
  const loading = ref(false);
</script>

<style scoped lang="scss">
  @import '@/styles/mixins/function.scss';

  @font-face {
    font-family: Orbitron-Bold;
    src: url('@/styles/fonts/orbitron-bold.ttf') format('truetype');
  }

  @mixin cover-img {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #131e2d;
    background-image: url(com-cdn('datav/datav-vue-logo.png'));
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    filter: grayscale(1);
    opacity: 0.36;
  }

  .create-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgb(0 51 125 / 7%);
    margin: 0;
    padding: 0;
    user-select: none;

    .top-bar {
      height: 50px;
      width: 100%;
      position: relative;

      &::before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
        width: 100%;
        background: #151b22;
      }

      .right-bar {
        position: absolute;
        left: 150px;
        top: 20px;
        height: 5px;
        width: 100%;
        border-top: var(--datav-border-primary);
        border-left: 2px solid var(--datav-main-color);
        background: rgb(55 126 255 / 4%);
        border-top-left-radius: 5px;
        transform: skewX(-45deg);
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }

      .left-bar {
        position: absolute;
        left: 0;
        top: 24px;
        height: 25px;
        width: 138px;
        border-right: 2px solid var(--datav-main-color);
        border-bottom: var(--datav-border-primary);
        transform: skewX(-45deg);
        border-bottom-right-radius: 5px;
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }

      .return-btn {
        position: absolute;
        left: -31px;
        top: 0;
        width: 180px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #151b22;
        cursor: pointer;
        transform: skewX(-45deg);
        border-bottom-right-radius: 5px;

        .return-text {
          display: inline-block;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          transform: skewX(45deg);
          transition: 0.2s;

          &:hover {
            color: var(--datav-main-color);
          }
        }

        .return-icon {
          margin-right: 5px;
        }
      }
    }
  }
</style>
