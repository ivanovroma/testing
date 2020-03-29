<template lang="pug">
  tr
    td
      nuxt-link(
        :to="{ name: 'tests-id', params: { id: item._id }}") {{ item.label }}
    td(class="text-xs-right")
      v-btn(
        fab
        flat
        small
        color="blue"
        :to="{ name: 'tests-id', params: { id: item._id }}")
        v-icon list
      TestUpdate(:test = "item")
      TestRemove(:test = "item")
    
</template>

<script>
  export default {
    props: ['item']
  }
</script>