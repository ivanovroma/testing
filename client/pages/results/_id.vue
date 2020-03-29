<template lang="pug">
   v-layout(column justify-center align-center)
    v-flex(class="l-12")
      v-card(class="mb30")
        v-card-title(class="headline" color="indigo")
          v-breadcrumbs(
            class="p0"
            divider="/")
            v-breadcrumbs-item
              nuxt-link(
                to="/results") Результаты
            v-breadcrumbs-item(
              disabled) {{ test.label }} - {{ user.name }}

        v-divider
        
        v-card-text(class="p0")
          AnswerList
</template>

<script>
  export default {
    middleware: 'Anonimus',
    computed: {
      result () {
        return this.$store.getters['Result/getByResultId'](this.$route.params.id)
      },
      test () {
        return this.$store.getters['Test/getByTestId'](this.result.testId)
      },
      user () {
        return this.$store.getters['User/getByUserId'](this.result.userId)
      }
    }
  }
</script>