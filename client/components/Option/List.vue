<template lang="pug">
  div(class="elevation-1")
    div(class="v-table__overflow")
      table(class="v-datatable v-table")
        thead
          tr
            th(
              role="columnheader" scope="col" aria-label="Название: Not sorted."
              aria-sort="none" class="column text-xs-left") Ответ
            th(
              role="columnheader" scope="col" aria-label="Название: Not sorted."
              aria-sort="none" class="column text-xs-left") Правильный
            th(
              role="columnheader" scope="col" aria-label=" : Not sorted."
              aria-sort="none" class="column text-xs-left")
        
        tbody
          OptionItem(
            v-for="option in options"
            :key="option._id"
            :item="option"
          )
</template>

<script>
  export default {
    props: ['questionId'],
    computed: {
      options () {
        return this.$store.getters['Option/getByQuestionId'](this.questionId)
      }
    }
  }
</script>