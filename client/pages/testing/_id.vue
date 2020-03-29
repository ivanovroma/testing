<template lang="pug">
  v-layout(column justify-center align-center)
    
    v-flex(class="l-12")
      v-card(class="mb30")
        v-card-title(class="headline")
          | {{ test.label }}
          v-spacer
          v-btn(
            fab
            flat
            small
            color="red"
            to="/")
            v-icon close

        v-divider
        TestingQuestion(:questions="questions")
</template>

<script>
import lodash from 'lodash'
export default {
  middleware: 'Anonimus',
  async created () {
    this.loading = true
    const result = await lodash.find(this.results, { testId: this.test._id })
    if (!result) {
      await this.$store.dispatch('Testing/createResultByTestId', { testId: this.test._id })
    }
    this.loading = false
  },
  computed: {
    test () {
      return this.$store.getters['Testing/getTestByTestId'](this.$route.params.id)
    },
    questions () {
      return this.$store.getters['Testing/getUncheckQuestionListByTestId'](this.$route.params.id)
    },
    results () {
      return this.$store.getters['Testing/getResultList']
    }
  }
}
</script>