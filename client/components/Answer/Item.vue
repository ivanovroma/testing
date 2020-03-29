<template lang="pug">
  tr(:class="{ 'red lighten-4': answer._id !== trueAnswer._id, 'green lighten-4': answer._id === trueAnswer._id }")
    td {{ question.label }}
    td {{ question.category }}
    td {{ answer.label }}
    td {{ trueAnswer.label }}
    
</template>

<script>
export default {
  props: ['item'],
  computed: {
    question () {
      return this.$store.getters['Question/getByQuestionId'](this.item.questionId)
    },
    answer () {
      return this.$store.getters['Option/getByOptionId'](this.item.optionAnswerIds[0])
    },
    trueAnswer () {
      return this.$store.getters['Option/getByOptionId'](this.item.optionTrueIds[0])
    }
  }
}
</script>