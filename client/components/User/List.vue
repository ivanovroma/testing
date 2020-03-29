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
                aria-sort="none" class="column text-xs-left") ФИО
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Логин
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Роль
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Дата регистрации
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Подразделение
              th(
                role="columnheader" scope="col" aria-label="Название: Not sorted."
                aria-sort="none" class="column text-xs-left") Заблокирован
              th(
                role="columnheader" scope="col" aria-label=" : Not sorted."
                aria-sort="none" class="column text-xs-left")
          
          tbody
            UserItem(
              v-for="user in users"
              :key="user._id"
              :item="user")
</template>

<script>
export default {
  props: ['loading'],
  computed: {
    users () {
      return this.$store.getters['User/get']
    }
  }
}
</script>