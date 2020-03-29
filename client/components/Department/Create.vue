<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500"
    )
      v-btn(
        fixed
        slot="activator"
        dark
        fab
        left
        bottom
        color="red"
      )
        v-icon add

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Новое подразделение

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          
          v-text-field(
            label="Название"
            outline
            v-model="label"
          )

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
    data () {
      return {
        dialog: false,
        label: '',
        buttonLoading: false,
        error: ''
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('Department/create', { label: this.label })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
          this.label = ''
        }

        this.buttonLoading = false
      }
    }
  }
</script>
