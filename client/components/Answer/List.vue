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
                aria-sort="none" class="column text-xs-left") Вопрос
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Категория
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Ответ
              th(
                role="columnheader" scope="col" aria-label="ФИО: Not sorted."
                aria-sort="none" class="column text-xs-left") Правильный ответ
          
          tbody
            AnswerItem(
              v-for="answer in answers"
              :key="answer._id"
              :item="answer")
</template>

<script>
  export default {
    props: ['loading'],
    computed: {
      answers () {
        return this.$store.getters['Answer/getByResultId'](this.$route.params.id)
      }
    }
  }
</script>