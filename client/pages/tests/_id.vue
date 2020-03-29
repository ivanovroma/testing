<template lang="pug">
  v-layout(column justify-center align-center)
    
    QuestionCreate(:testId="test._id")
    
    v-flex(class="l-12")
      v-card(class="mb30")
        v-card-title(class="headline" color="indigo") 
          v-breadcrumbs(
            class="p0"
            divider="/")
            v-breadcrumbs-item
              nuxt-link(
                to="/tests") Тесты
            v-breadcrumbs-item(
              disabled) {{ test.label }}

      QuestionList(:test="test")
</template>

<script>
  export default {
    middleware: 'Anonimus',
    computed: {
      test () {
        return this.$store.getters['Test/getByTestId'](this.$route.params.id)
      }
    }
  }
</script>