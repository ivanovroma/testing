<template lang="pug">
  div
    // PRELOADER
    v-card(class="text-xs-center p15" v-if="loading")
      v-progress-linear(:indeterminate="true")
    // PRELOADER
    div(class="elevation-1" v-if="!loading")
      div(class="v-table__overflow")
        table(class="v-datatable v-table")
          thead
            tr
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Название
              th(
                role="columnheader" scope="col" aria-label=" : Not sorted."
                aria-sort="none" class="column text-xs-left")
          
          tbody
            TestingItem(
              v-for="test in tests"
              :key="test._id"
              :item="test")
</template>

<script>
  export default {
    props: ['loading'],
    computed: {
      tests () {
        return this.$store.getters['Testing/getTestList']
      }
    }
  }
</script>