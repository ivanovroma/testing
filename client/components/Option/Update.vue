<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500"
    )
      v-btn(
        fab
        flat
        small
        color="blue"
        slot="activator"
      )
        v-icon edit

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Обновить ответ

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          
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
          ) Обновить
</template>

<script>
  export default {
    props: ['option'],
    data () {
      return {
        dialog: false,
        label: '',
        buttonLoading: false,
        error: '',
        correct: false
      }
    },
    async mounted () {
      this.label = this.option.label
      this.correct = !!this.option.correct
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store
          .dispatch('Option/update', {
            label: this.label,
            correct: !!this.correct,
            optionId: this.option._id
          })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
        }

        this.buttonLoading = false
      }
    }
  }
</script>
