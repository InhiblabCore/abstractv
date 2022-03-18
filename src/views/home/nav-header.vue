<template>
  <div>
    <div class="abstractv-hearder" :style="{ background: isFixed ? '#171b22' : '' }">
      <div class="logo">
        <div class="top-tip">
          <strong class="tip-strong">公告</strong>
          <div class="abstractv-marquee">
            <span class="content">
              <template v-for="n in 2" :key="n">
                1、AbstractV开发中 项目地址：<a href="#" target="_blank" class="project-href"
                  >。。。#</a
                >
                <span class="content-space"></span>
              </template>
            </span>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="header-item">
          <n-dropdown
            :options="profileOpts"
            placement="bottom-end"
            :show-arrow="true"
            @select="() => {}"
          >
            <span class="user-link-wrap">
              <n-avatar
                round
                :size="20"
                :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPviwlc7E2bKWh9TvvdYCk_CNtZI-0jkJcGFJDvZQ7qFkcMslFUuGZU8jcyvo-PsYeTMw&usqp=CAU'"
              />
              <span class="user-link">
                {{ 'YongGit' }}
              </span>
              <n-icon :size="14">
                <IconArrowDown />
              </n-icon>
            </span>
          </n-dropdown>
        </div>
      </div>
    </div>
    <div class="abstractv-nav">
      <div class="header-img">
        <div class="nav-img-text">Welcome To AbstractV</div>
        <div class="nav-img"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NavHeader',
  }
</script>

<script lang="ts" setup>
  import { h } from 'vue'
  import { NIcon } from 'naive-ui'
  import { IconLogout, IconArrowDown, IconDocument } from '@/icons'

  defineProps({
    isFixed: {
      type: Boolean,
      default: false,
    },
  })

  const profileOpts = [
    {
      label: '帮助文档',
      key: 'doc',
      icon: () => h(NIcon, null, { default: () => h(IconDocument) }),
    },
    {
      label: '退出',
      key: 'logout',
      icon: () => h(NIcon, null, { default: () => h(IconLogout) }),
    },
  ]
</script>

<style lang="scss">
  @import '@/styles/mixins/function';

  .abstractv-hearder {
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    z-index: 999;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background-image: linear-gradient(0deg, rgb(0 0 0 / 0%) 19%, #171717 100%);

    .logo {
      display: flex;
      flex: 1;
      align-items: center;
      padding-left: 18px;
    }

    .user {
      display: flex;
      justify-content: flex-end;
      padding-right: 15px;
      align-items: center;
      font-size: 14px;
      z-index: 9;
      min-width: 540px;

      .header-item {
        margin: 0 5px;
        padding: 0 10px;
        cursor: pointer;
        user-select: none;
        color: var(--abstractv-font-color);
        line-height: 20px;
        height: 20px;
      }

      .user-link-wrap {
        display: flex;
        align-items: center;
      }

      .user-link {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        line-height: 20px;
        height: 20px;
        color: var(--abstractv-font-color);
      }
    }
  }

  .top-tip {
    padding: 6px 0;
    font-size: 12px;
    color: var(--abstractv-font-color);
    display: flex;
    right: 0;
    height: 30px;
    margin-right: 24px;
    width: 600px;

    .tip-strong {
      white-space: nowrap;
      padding-right: 8px;
    }
  }

  .abstractv-marquee {
    display: block;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    position: relative;

    .content {
      display: inline-block;
      position: relative;
      padding-right: 0;
      white-space: nowrap;
      animation: marque-animation 20s infinite linear;
      z-index: 0;

      &:hover {
        animation-play-state: paused;
      }
    }

    .content-space {
      display: inline-block;
      width: 5em;
    }

    .project-href {
      color: var(--abstractv-font-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @keyframes marque-animation {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }

  .abstractv-nav {
    display: flex;
    position: absolute;
    top: 0;
    flex-direction: column;
    background: var(--abstractv-body-bg);
    width: 100%;
    height: 290px;

    .header-img {
      opacity: 1;
      z-index: 1;
    }

    .nav-img-text {
      @apply absolute;

      z-index: 1;
      transform-origin: 0 0;
      // transform: scale(0.5);
      top: 80px;
      left: 40px;
      user-select: none;
      cursor: pointer;

      color: #e6f7ff;
      font-weight: 900;
      font-size: 48px;
      opacity: 0.8;
      font-family: PingFangSC, PingFangSC-Semibold;
      text-align: left;
      text-shadow: 0 0 10px 0 #0270ff;
      background-image: linear-gradient(180deg, #e6f7ff, #25a8f6);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: skewX(-25deg);
    }

    .nav-img {
      position: absolute;
      width: 100%;
      height: 290px;
      background-size: cover;
      background-position: center;
      background-image: url('@/assets/home/images/nav-img.png');
    }
  }
</style>
