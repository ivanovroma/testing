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
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Тест
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") ФИО
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Логин
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Подразделение
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Дата сдачи
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Результат
              th(
                role="columnheader" scope="col" aria-label=" : Not sorted."
                aria-sort="none" class="column text-xs-left")
          
          tbody
            ResultItem(
              v-for="result in results"
              :key="result._id"
              :item="result")
</template>

<script>
  export default {
    props: ['loading'],
    computed: {
      results () {
        return this.$store.getters['Result/get']
      }
    }
  }
</script>