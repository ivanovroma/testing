<template lang="pug">
  v-layout(column justify-center align-center)
    
    DepartmentCreate
    
    v-flex(class="l-12")
      
      v-card(class="mb30")
        v-card-title(class="headline" color="indigo") Подразделения

        v-divider
        
        v-card-text(class="p0")
          DepartmentList(:loading="loading")
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
      await this.$store.dispatch('Department/get', {})
      this.loading = false
    }
  }
</script>