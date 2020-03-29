<template lang="pug">
  tr
    td {{ item.label }}
    td(class="text-xs-right")
      DepartmentUpdate(
        :id = "item._id"
        :label = "item.label")
      DepartmentRemove(
        :id = "item._id")
    
</template>

<script>
  export default {
    props: ['item']
  }
</script>