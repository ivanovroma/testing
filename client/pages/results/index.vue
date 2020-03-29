<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(class="l-12")
      v-card(class="mb30")
        v-card-title(class="headline" color="indigo") Результаты

        v-divider
        
        v-card-text(class="p0")
          ResultList(:loading="loading")
</template>

<script>
  export default {
    middleware: 'Anonimus',
    data () {
      return {
        loading: false
      }
    },
    async mounted () {
      this.loading = true
      await this.$store.dispatch('User/get', {})
      await this.$store.dispatch('Department/get', {})
      await this.$store.dispatch('Test/get', {})
      await this.$store.dispatch('Answer/get', {})
      await this.$store.dispatch('Question/get', {})
      await this.$store.dispatch('Option/get', {})
      await this.$store.dispatch('Result/get', {})
      this.loading = false
    }
  }
</script>