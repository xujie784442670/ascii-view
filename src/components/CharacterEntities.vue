<template>
  <el-container>
    <el-header>
      <el-form inline>
        <el-form-item>
          <el-input v-model="query.kw" :placeholder="`请输入需要查询的${query.type ? '符号' : '实体名'}`"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="query.type">
            {{ query.type ? '符号' : '实体名' }}
          </el-checkbox>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="data" v-loading="loading" align="center">
        <el-table-column label="符号" prop="characters">
          <template #default="{row}">
            <span v-html="`&${row.name};`"></span>
          </template>
        </el-table-column>
        <el-table-column label="实体名" prop="name"/>
        <el-table-column label="实体编号">
          <el-table-column label="十进制" prop="code">
            <template #default="{row}">
              <el-tag v-for="c in row.code" :key="c">{{ c }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="十六进制" prop="code">
            <template #default="{row}">
              <el-tag v-for="c in row.code" :key="c">{{ c.toString(16) }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="查询次数" prop="queryCount"/>
        <template #append>
          <el-pagination
              background
              layout="sizes, prev, pager, next,total"
              :page-sizes="[10, 20, 30, 50,100,200]"
              v-model:page-size="pageInfo.size"
              :total="pageInfo.total"
              v-model:current-page="pageInfo.page"/>
        </template>
      </el-table>

    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {dbStorage} from "utools-api-types";
import {ElMessage} from "element-plus";

interface CharacterEntity {
  name: string;
  code: number[];
  characters: string;
  queryCount: number;
}

const loading = ref<boolean>(false)
let entitiesList = reactive<CharacterEntity[]>([])
let pageInfo = ref<{
  page: number,
  size: number,
  total: number
}>({
  page: 1,
  size: 10,
  total: 0
})
const data = computed(() => {
  let pageData: CharacterEntity[] = entitiesList
  if (!!query.value.kw) {
    let kw = query.value.kw.trim();
    if(!query.value.type){
      let reg = new RegExp(`[&]?(\\w+)[;]?`)
      let result = reg.exec(kw);
      if (!result) {
        return pageData;
      }
      kw = result[1];
    }
    pageData = pageData.filter(item => {
      if (query.value.type) {
        if(item.characters.includes(kw)){
          if(item.characters === kw){
            if (item.queryCount >= 0) {
              item.queryCount++;
            }else{
              item.queryCount = 1;
            }
            entitiesList.forEach(e => {
              if(e.name === item.name){
                config.setItem('characterEntities', [...entitiesList])
              }
            })
          }
          return true
        }
      } else if(item.name.indexOf(kw) != -1){
        if(item.name === kw){
          if (item.queryCount >= 0) {
            item.queryCount++;
          }else{
            item.queryCount = 1;
          }
          entitiesList.forEach(e => {
            if(e.name === item.name){
              config.setItem('characterEntities', [...entitiesList])
            }
          })
        }
        return true
      }
      return false;
    })

  }
  // 排序
  pageData.sort((a, b) => {
    return b.queryCount - a.queryCount
  })
  pageInfo.value.total = pageData.length
  return pageData.slice((pageInfo.value.page - 1) * pageInfo.value.size, pageInfo.value.page * pageInfo.value.size)
});
const query = ref<{
  kw: string,
  type: boolean
}>({
  kw: '',
  type: true
})




function loadData() {
  let list = config.getItem("characterEntities")
  if (!list || list.length === 0) {
    loading.value = true
    import('@config/characterEntities.json').then(data => {
      list = data.default as Record<any, {
        codepoints: number[];
        characters: string;
      }>
      let map = new Map();
      for (let entitiesKey in list) {
        const entity = list[entitiesKey];
        let reg = new RegExp(`&(\\w+)[;]?`, 'g')
        let result = reg.exec(entitiesKey);
        if (!result) {
          continue;
        }
        let key = result[1];
        if (map.has(key)) {
          continue;
        }
        map.set(key, {
          name: key,
          code: entity.codepoints,
          characters: entity.characters,
          queryCount: 0
        })
      }
      entitiesList.push(...map.values())
      config.setItem("characterEntities", [...map.values()])
    }).finally(() => {
      loading.value = false
    })
  } else {
    entitiesList.push(...list)
  }
}

loadData()
</script>

<style scoped>
.el-pagination {
  margin: 5px;
}

</style>
