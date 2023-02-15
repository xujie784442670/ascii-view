<template>
  <div>
    <AssciiView v-if="event?.code == 'AssciiView'"/>
    <CharacterEntities v-else-if="event?.code == 'CharacterEntities'"/>
  </div>
</template>
<script setup lang="ts">
import AssciiView from "@components/AssciiView.vue";
import CharacterEntities from "@components/CharacterEntities.vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";
const event = ref<{code: string, type: string, payload: any}>(sessionStorage.getItem('event') ? JSON.parse(sessionStorage.getItem('event') as string) : null);
if (window.utools){
  utools.onPluginEnter((e) => {
    event.value = e;
    sessionStorage.setItem('event', JSON.stringify(e))
  })
}
window.onerror = function(e){
  ElMessage.error('出错了，请联系作者: '+e);
}


</script>

<style scoped lang="scss">

</style>
