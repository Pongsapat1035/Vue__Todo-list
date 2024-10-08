<script setup>
import { ref, onMounted, reactive} from 'vue'
import { useTodoStore } from '../stores/store'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Loading  from '../components/Loading.vue'
import Alert from '../components/Alert.vue'


const todoStore = useTodoStore()
const isLoaded = ref(false)
const isAlert = ref(false)
const todoId = ref(-1)
const route = useRoute()
const router = useRouter()
const todoData = reactive({
  name: '',
  status: ''
})

onMounted(async ()=>{
  await todoStore.loadTodo(route.params.id)
  todoId.value = parseInt(route.params.id)
  console.log(todoStore.selectedTodo)
  todoData.status = todoStore.selectedTodo.status
  todoData.name = todoStore.selectedTodo.name
  isLoaded.value = true
  console.log(todoData)
})

const editTodo = async (todoData) => {
  // console.log(todoData)
  try{
    // console.log(todoData)
    await todoStore.editTodo(todoId.value, todoData)
    // alert("Edit complete!!")
    isAlert.value = true
    setTimeout(()=>{
      isAlert.value = false
      router.push({ name: 'home'})
    }, 3000)
    
  } catch (error) {
    console.log('error', error)
  }
}

</script>
<template>
  <Loading v-if="!isLoaded"></Loading>
  <div class="w-1/2 mx-auto my-10 border rounded-lg border-cyan-900 p-10">
    <div class="flex items-center">
      <RouterLink :to="{name: 'home' }" class="mr-5">
        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --><path fill="#ffffff" d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z"/></svg>    
      </RouterLink>
      <div>
        Edit id : {{ todoId }}
      </div>
    </div>
    <div>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Name</span> 
        </div>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="todoData.name"/>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Status</span>
        </div>
        <select class="select select-bordered" v-model="todoData.status">
          <option> Please select</option>
          <option v-for="status in todoStore.statuses" :value="status">
            {{ status }}
          </option>
        </select>
      </label>
      <div>
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-full my-5 bg-purple-600 text-white" @click="editTodo(todoData)">Update</button>
      </div>
    </div>
  </div>
  <!-- Alert component -->
  <Alert v-if="isAlert" :message="'Update data successful !!'"></Alert>
</template>