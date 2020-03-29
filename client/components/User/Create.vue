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
        ) Новый пользователь 

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          
          v-text-field(
            label="ФИО"
            outline
            v-model="name"
          )

          v-text-field(
            label="Логин"
            outline
            v-model="login"
          )

          v-text-field(
            label="Пароль"
            outline
            v-model="password"
          )

          v-select(
            v-model="department"
            :items="departments"
            item-text="label"
            item-value="_id"
            label="Подразделение"
            persistent-hint
            return-object
            single-line
            outline
          )

          v-select(
            v-model="role"
            :items="roles"
            item-text="roleLabel"
            item-value="value"
            label="Роль"
            return-object
            single-line
            outline
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
        login: '',
        name: '',
        password: '',
        buttonLoading: false,
        error: '',
        department: {},
        role: {},
        roles: [
          { roleLabel: 'Администратор', value: 'admin' },
          { roleLabel: 'Пользователь', value: 'examinee' }
        ]
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const newUser = {
          login: this.login,
          password: this.password,
          role: this.role.value,
          departmentId: this.department._id,
          name: this.name
        }

        const result = await this.$store.dispatch('User/create', newUser)

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
          this.login = ''
          this.password = ''
          this.role = {}
          this.department = {}
          this.name = ''
        }

        this.buttonLoading = false
      }
    },
    computed: {
      departments () {
        return this.$store.getters['Department/get']
      }
    }
  }
</script>
