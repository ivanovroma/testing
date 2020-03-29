<template lang="pug">
  tr
    td {{ item.label }}
    td {{ correct }}
    td(class="text-xs-right")
      OptionUpdate(
        :option = "item")
      OptionRemove(
        :id = "item._id")
    
</template>

<script>
  export default {
    props: ['item'],
    computed: {
      correct () {
        if (this.item.correct === true) return 'Да'
        else return 'Нет'
      }
    }
  }
</script>