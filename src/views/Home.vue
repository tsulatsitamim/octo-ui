<template>
  <div class=".container">
    <form 
      id="myForm" 
      name="myForm">
      <input 
        id="files" 
        type="file" 
        name="myForm" 
        multiple>
    </form>
    <div id="target"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    window.onload = function() {
      window.Lily.ready({
        target: 'target',
        file: 'files',
        path: '/Madeleine.js/src',
      })
    }
  },
}
</script>
