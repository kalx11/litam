<template>
  <div>
    <span>{{ item.name }}</span>
    <abbr>{{item.surname}}</abbr>
  </div>
</template>

<script>
  export default {
    props: { item: { required: true } }
  }
</script>