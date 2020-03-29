<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(class="l-4 s-6 x-12")

        v-alert(
          v-model="error.length > 0"
          type="error"
          class="mb15"
        ) {{ this.error }}
        
        v-card
          
          v-card-title(class="headline" color="indigo") Авторизация
            v-spacer
          
          v-divider
          
          v-form(ref="form")
            
            v-card-text
              v-text-field(
                outline
                name="login"
                label="Логин"
                v-model="login"
                @keyup.enter="onSubmit"
              )
              
              v-text-field(
                outline
                name="password"
                label="Пароль"
                @keyup.enter="onSubmit"
                v-model="password"
                :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                @click:append="() => (passwordVisible = !passwordVisible)"
                :type="passwordVisible ? 'password' : 'text'"
              )
          
          v-divider
          
          v-card-actions
            v-btn(
              color="indigo"
              dark
              block
              @click="onSubmit"
              :loading="buttonLoading"
            ) Войти
</template>

<script>
  export default {
    middleware: 'Auth',
    data () {
      return {
        login: '',
        password: '',
        passwordVisible: true,
        buttonLoading: false
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true
        let userData = {
          login: this.login,
          password: this.password
        }

        await this.$store.dispatch('User/signinFromData', userData)
        this.buttonLoading = false
      }
    },
    computed: {
      error () {
        return this.$store.getters['User/getError']
      }
    },
    mounted () {
      this.$store.dispatch('User/setError', '')
    }

  }
</script>
