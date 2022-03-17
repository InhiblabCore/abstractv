<template>
  <n-empty description="我的数据-建设中" class="--empty-ptb-40">
    <template #icon>
      <n-icon :size="40" color="#909399">
        <IconMyData />
      </n-icon>
    </template>
  </n-empty>
</template>

<script lang="ts">
  export default {
    name: 'MyData',
  };
</script>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { IconMyData } from '@/icons';

  const nMessage = useMessage();

  onMounted(() => {
    nMessage.warning('建设中。。。');
  });
</script>
