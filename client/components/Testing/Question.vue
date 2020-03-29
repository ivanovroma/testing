<template lang="pug">
  div
    v-card-text
      div {{ question.label }}
      div(v-if="question.img")
        img(:src="question.img")
      div 
        v-radio-group(
          v-model="checkOption")
          v-radio(
            v-for="option in options"
            :key="option._id"
            :label="option.label"
            :value="option._id")
      
    v-divider
    v-card-actions
      | Осталось вопросов - {{ questions.length }}
      v-spacer
      v-btn(
        color="indigo"
        dark
        @click="createAnswer"
        :disabled="nextQuestion"
        :loading="buttonLoading"
      ) Отправить ответ
</template>

<script>
  export default {
    props: ['questions'],
    data () {
      return {
        buttonLoading: false,
        checkOption: '',
        loading: false
      }
    },
    methods: {
      async createAnswer () {
        this.buttonLoading = true
        let result = this.$store.getters['Testing/getResultByTestId'](this.question.testId)

        let optionTrueId = ''
        for (let i = 0; i < this.options.length; i++) {
          let option = this.options[i]
          if (option.correct) {
            optionTrueId = option._id
            break
          }
        }

        await this.$store.dispatch('Testing/createAnswer', {
          optionAnswerIds: [this.checkOption],
          optionTrueIds: [optionTrueId],
          questionId: this.question._id,
          resultId: result._id,
          testId: this.question.testId,
          category: this.question.category
        })

        this.checkOption = ''

        if (this.questions.length === 0) {
          await this.$store.dispatch('Testing/checkResult', {
            resultId: result._id
          })

          this.$router.push('/')
        }
        this.buttonLoading = false
      }
    },
    computed: {
      nextQuestion () {
        if (this.checkOption === '') return true
        else return false
      },
      question () {
        if (this.questions.length > 0) {
          let min = 0
          let max = this.questions.length - 2
          let rand = min - 0.5 + Math.random() * (max - min + 1)
          rand = Math.round(rand)

          return this.questions[rand]
        } else {
          return []
        }
      },
      options () {
        return this.$store.getters['Testing/getOptionListByQuestionId'](this.question._id)
      }
    }
  }
</script>