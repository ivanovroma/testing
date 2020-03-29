<template lang="pug">
  v-layout(column justify-center align-center)
    
    TestCreate
    
    v-flex(class="l-12")
      
      //- Test list
      v-card(class="mb30")
        v-card-title(class="headline") Тесты
        v-divider
        v-card-text(class="p0")
          TestList(:loading="loading")
</template>

<script>
  export default {
    middleware: 'Anonimus',
    data () {
      return {
        headers: [
          {
            text: 'Название',
            align: 'left',
            sortable: false,
            value: 'label'
          },
          {
            text: ' ',
            sortable: false,
            value: 'actions'
          }
        ],
        loading: false
      }
    },
    async mounted () {
      this.loading = true
      await this.$store.dispatch('Test/get', {})
      this.loading = false
    },
    computed: {
      tests () {
        return this.$store.getters['Test/get']
      }
    }
  }
</script>