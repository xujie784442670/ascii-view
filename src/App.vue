<template>
<el-container>
  <el-header>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="query.keyworkd" placeholder="请输入查询内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.type" placeholder="请选择查询类型">
          <el-option label="默认" value="default"></el-option>
          <el-option label="十进制" value="dec"></el-option>
          <el-option label="二进制" value="bin"></el-option>
          <el-option label="八进制" value="oct"></el-option>
          <el-option label="十六进制" value="hex"></el-option>
          <el-option label="缩写/字符" value="characters"></el-option>
          <el-option label="解释" value="comment"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="query.accurate">精确查询</el-checkbox>
      </el-form-item>
    </el-form>
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
import {computed, onMounted, ref, watch} from "vue";
import data from './ascii.json'
const asciiList = ref<Ascii[]>([])
const query = ref<{
  keyworkd: string,
  type: string,
  accurate: boolean
}>({
  keyworkd: '',
  type: 'default',
  accurate: false
})

watch(query, (newVal, oldVal) => {
  if(!newVal.keyworkd){
    query.value.accurate = false
    query.value.type = 'default'
  }
},{deep: true});

const tableData = computed(()=>{
  if (query.value) {
    let queryValue:string = query.value.keyworkd
    return asciiList.value.filter(item => {
      let data = item as Record<string, any>
      if (query.value.accurate) {
        if (data[query.value.type] == queryValue) {
          return true
        }
      } else {
        queryValue = queryValue.toLowerCase()
        if(query.value.type === 'default'){
          return Object.values(data).some(value => {
            return value.toString().toLowerCase().includes(queryValue)
          })
        }else{
          return data[query.value.type].toString().toLowerCase().includes(queryValue)
        }
      }
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
