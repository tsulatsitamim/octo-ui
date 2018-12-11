<template>
  <div class="container">
    <div class="viewer">
      <div class="viewer__wrapper">
        <div 
          id="stlviewer"
          ref="viewer" 
          class="viewer__container"/>
      </div>
    </div>
    <div style="margin-top: 50px">
      <input 
        id="file"
        ref="file" 
        type="file"
        @change="loadFile">
      <button 
        class="button" 
        @click="upload">Print</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ModelViewer from 'webgl-3d-viewer'

export default {
  name: 'Home',
  data() {
    return {
      file: '',
      viewer: {},
    }
  },
  mounted() {
    this.viewer = new ModelViewer(this.$refs.viewer, {
      dragDrop: true,
      autoRotate: true,
      startupAnimation: true,
      zoom: true,
    })
    this.viewer.load('https://cdn.thingiverse.com/assets/b2/b0/7d/34/02/V29D_Fixed.stl')
  },
  methods: {
    loadFile() {
      window.URL = window.URL || window.webkitURL
      this.file = this.$refs.file.files[0]
      const objectURL = window.URL.createObjectURL(this.file)
      console.log(objectURL)
      this.viewer.load(objectURL)
    },
    upload() {
      const formData = new FormData()
      formData.append('file', this.file)
      axios
        .post('//localhost/api/files/local', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Api-Key': '1D8DF67AD9594E81A44830CF33936F55',
          },
        })
        .then(({ data }) => {
          console.log('SUCCESS!!')
          console.log(this)
          const path = data.files.local.path
          this.slice(path)
        })
        .catch(() => {
          console.log('FAILURE 1!!')
        })
    },
    slice(path) {
      axios
        .post(
          `//localhost/api/files/local/${path}`,
          {
            command: 'slice',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': '1D8DF67AD9594E81A44830CF33936F55',
            },
          }
        )
        .then(({ data }) => {
          console.log(data)
          this.print(data.path)
        })
        .catch(() => {
          console.log('FAILURE 2!!')
        })
    },
    print(path) {
      axios
        .post(
          `//localhost/api/files/local/${path}`,
          {
            command: 'select',
            print: true,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': '1D8DF67AD9594E81A44830CF33936F55',
            },
          }
        )
        .then(function({ data }) {
          console.log(data)
        })
        .catch(function() {
          console.log('FAILURE 2!!')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
