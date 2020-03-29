<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(class="l-12")
      v-card(class="mb30")
        v-card-title(class="headline" color="indigo") Тестирование

        v-divider
        
        v-card-text(class="p0")
          TestingList(:loading="loading")
</template>

<script>
  export default {
    middleware: 'Anonimus',
    data () {
      return {
        loading: false
      }
    },
    async mounted () {
      this.loading = true
      await this.$store.dispatch('Testing/getTestList', {})
      await this.$store.dispatch('Testing/getQuestionList', {})
      await this.$store.dispatch('Testing/getOptionList', {})
      await this.$store.dispatch('Testing/getResultListByUserId', {})
      await this.$store.dispatch('Testing/getAnswerListByUserId', {})
      this.loading = false
    }
  }
</script>