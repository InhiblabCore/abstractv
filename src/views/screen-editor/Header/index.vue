<template>
  <div class="header-container">我是头部</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
  .header-container {
    position: relative;
    height: 41px;
    padding-right: 8px;
    display: flex;
    z-index: 100;
    align-items: center;
    user-select: none;
    color: var(--datav-gui-font-color-base);
    border-bottom: var(--datav-border-dark);
    background: #1d1e1f;
  }
</style>
