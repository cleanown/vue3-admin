<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import VersionCheck from './utils/vs';
const versionCheck = new VersionCheck()
onMounted(() => {
  versionCheck.startTask()
})
onBeforeMount(() => {
  versionCheck.stopTask()
})
</script>