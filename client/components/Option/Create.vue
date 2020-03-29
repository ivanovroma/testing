<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500")
      v-btn(
        fab
        flat
        small
        color="blue"
        slot="activator")
        v-icon add

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light) Новый ответ

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15") {{ this.error }}
          
          v-text-field(
            label="Ответ"
            outline
            v-model="label")

          v-checkbox(
            label="Правильный ответ"
            v-model="correct")

        v-divider

        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            flat
            @click="dialog = false"
          ) Отмена
          v-btn(
            color="indigo"
            @click="onSubmit"
            dark
            :loading="buttonLoading"
          ) Создать
</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        dialog: false,
        label: '',
        correct: false,
        buttonLoading: false,
        error: ''
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('Option/create', {
          label: this.label,
          correct: this.correct,
          testId: this.question.testId,
          questionId: this.question._id
        })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
          this.label = ''
          this.correct = false
        }

        this.buttonLoading = false
      }
    }
  }
</script>
