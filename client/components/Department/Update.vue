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
        ) Редактировать подразделение

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          
          v-text-field(
            label="Название"
            outline
            v-model="updateLabel"
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
          ) Обновить
</template>

<script>
  export default {
    props: ['id', 'label'],
    data () {
      return {
        dialog: false,
        updateLabel: '',
        buttonLoading: false,
        error: ''
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('Department/update', {
          label: this.updateLabel,
          departmentId: this.id
        })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
        }

        this.buttonLoading = false
      }
    },
    mounted () {
      this.updateLabel = this.label
    }
  }
</script>
