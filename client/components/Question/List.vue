<template lang="pug">
  div
    // PRELOADER
    v-card(class="text-xs-center p15" v-if="loading")
      v-progress-linear(:indeterminate="true")
    // PRELOADER
    
    div(v-if="!loading")
      QuestionItem(
        v-for="question in questions"
        :key="question._id"
        :question="question")
</template>

<script>
  export default {
    props: ['test'],
    data () {
      return {
        loading: true
      }
    },
    async mounted () {
      this.loading = true
      await this.$store.dispatch('Question/getByTestId', { testId: this.test._id })
      await this.$store.dispatch('Option/getByTestId', { testId: this.test._id })
      this.loading = false
    },
    computed: {
      questions () {
        return this.$store.getters['Question/get']
      }
    }
  }
</script>