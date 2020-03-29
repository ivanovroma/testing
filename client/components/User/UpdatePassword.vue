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
        v-icon security

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Новый пароль

        v-card-text(v-if="final")
          div Пароль успешно изменен.
          div Новый пароль : {{ this.password }}

        v-card-text(v-if="!final")
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}

          v-text-field(
            label="Пароль"
            outline
            v-model="password"
          )
        
        v-divider

        v-card-actions()
          v-spacer
          v-btn(
            color="primary"
            flat
            @click="dialog = false"
            v-if="final"
          ) OK
          v-btn(
            color="primary"
            flat
            @click="dialog = false"
            v-if="!final"
          ) Отмена
          v-btn(
            color="indigo"
            @click="onSubmit"
            dark
            :loading="buttonLoading"
            v-if="!final"
          ) Обновить пароль
</template>

<script>
  export default {
    props: ['user'],
    data () {
      return {
        dialog: false,
        buttonLoading: false,
        error: '',
        password: '',
        final: false
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('User/updatePassword', {
          userId: this.user._id,
          password: this.password
        })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.final = true
        }

        this.buttonLoading = false
      }
    },
    async mounted () {
      this.userId = this.user._id
    }
  }
</script>

<style>
.v-card__text {
  padding-bottom: 0px !important;
}
</style>
