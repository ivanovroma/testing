<template lang="pug">
  v-layout(column justify-center align-center)
    
    UserCreate
    
    v-flex(class="l-12")
      
      //- User list
      v-card(class="mb30")
        v-card-title(class="headline") Пользователи
        v-divider
        v-card-text(class="p0")
          UserList(:loading="loading")
</template>

<script>
export default {
  middleware: ['Anonimus', 'Admin'],
  data () {
    return {
      loading: false
    }
  },
  async mounted () {
    this.loading = true
    await this.$store.dispatch('User/get', {})
    await this.$store.dispatch('Department/get', {})
    this.loading = false
  }
}
</script>