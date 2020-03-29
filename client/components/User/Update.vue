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
        ) Редактировать пользователя

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15") {{ this.error }}

          v-checkbox(
            label="Заблокировать пользователя"
            v-model="updateBlocked")

          v-text-field(
            label="ФИО"
            outline
            v-model="updateName")

          v-select(
            v-model="updateDepartment"
            :items="departments"
            item-text="label"
            item-value="_id"
            label="Подразделение"
            persistent-hint
            return-object
            single-line
            outline
            class="mb0")
        
        v-divider

        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            flat
            @click="dialog = false") Отмена
          v-btn(
            color="indigo"
            @click="onSubmit"
            dark
            :loading="buttonLoading") Обновить
</template>

<script>
  export default {
    props: ['user'],
    data () {
      return {
        dialog: false,
        buttonLoading: false,
        error: '',
        updateBlocked: false,
        updateName: '',
        updateDepartment: {}
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store.dispatch('User/update', {
          userId: this.user._id,
          blocked: this.updateBlocked,
          name: this.updateName,
          departmentId: this.updateDepartment._id
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
      this.updateDepartment = {
        _id: this.user.departmentId,
        label: this.user.lang.departmentLabel
      }
      this.updateName = this.user.name
      this.updateBlocked = this.user.blocked
    },
    computed: {
      departments () {
        return this.$store.getters['Department/get']
      }
    }
  }
</script>
