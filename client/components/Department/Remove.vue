<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500"
    )
      v-btn(
        fab
        flat
        small
        color="red"
        slot="activator"
      )
        v-icon delete

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Удалить подразделение

        v-card-text 
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          div Вы уверены?

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
          ) Удалить
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        dialog: false,
        buttonLoading: false,
        error: ''
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('Department/remove', { departmentId: this.id })

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
