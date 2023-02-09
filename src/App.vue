<template>
<el-container>
  <el-header>
    <el-input v-model="query" placeholder="请输入需要搜索的关键字"></el-input>
  </el-header>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="dec" label="十进制"></el-table-column>
      <el-table-column prop="bin" label="二进制"></el-table-column>
      <el-table-column prop="oct" label="八进制"></el-table-column>
      <el-table-column prop="hex" label="十六进制" ></el-table-column>
      <el-table-column prop="characters" label="缩写/字符" :width="200"></el-table-column>
      <el-table-column prop="comment" label="解释"></el-table-column>
    </el-table>
  </el-main>
</el-container>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import data from './ascii.json'
const asciiList = ref<Ascii[]>([])
const query = ref<string>()
const tableData = computed(()=>{
  if (query.value) {
    let queryValue:string = query.value.toLowerCase()
    return asciiList.value.filter(item => {
      if(item.dec.toString().toLowerCase().includes(queryValue)) return true
      if(item.bin.toString().toLowerCase().includes(queryValue)) return true
      if(item.oct.toString().toLowerCase().includes(queryValue)) return true
      if(item.hex.toString().toLowerCase().includes(queryValue)) return true
      if(item.characters.toString().toLowerCase().includes(queryValue)) return true
      if(item.comment.toString().toLowerCase().includes(queryValue)) return true
      return false
    })
  } else {
    return asciiList.value
  }
})
onMounted(() => {
  asciiList.value = [];
  for (const datum of data) {
    asciiList.value.push({
      dec: datum.value,
      bin: datum.value.toString(2),
      oct: datum.value.toString(8),
      hex: datum.value.toString(16),
      characters: datum.characters,
      comment: datum.comment
    })
  }
})

</script>

<style scoped lang="scss">

</style>
