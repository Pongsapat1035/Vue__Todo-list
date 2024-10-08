import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

const BASE_URL = 'https://67021f79b52042b542d93f3c.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({ // กำหนดข้อมูล state ที่จะเก็บใน store นี้
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      try{
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error){
        console.log('error', error)
      }
    },
    async loadTodo (id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch(error){
        console.log('error',error)
      }
    },
    async addTodo (todoText) {
      // รวม todoText เป็น object แล้ว post ไป mockAPI
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        console.log(response.data)
      } catch (error){
        console.log('error',error)
      }
    },
    async editTodo (id, todoData) {
      try {
        const bodyData = {
          name: todoData.name,
          status: todoData.status
        }
        const response = await axios.put(`${BASE_URL}/todos/${id}`,bodyData)
        console.log(response.data)
      } catch (error){
        console.log('error', error)
      }
    },
    async removeTodo (id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log(response)
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})