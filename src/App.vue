<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';

import useStore from '@/store';

const { app } = useStore();

const size: any = computed(() => app.size);

const locale = ref();

</script>
