<template lang="pug">
  tr
    td
      nuxt-link(
        v-if="!result.complete"
        :to="{ name: 'testing-id', params: { id: item._id } }") {{ item.label }}
      div(v-if="result.complete") {{ item.label }}
    td(class="text-xs-right")
      v-btn(
        v-if="!result"
        small dark
        color="indigo"
        :to="{ name: 'testing-id', params: { id: item._id } }") Пройти тест
      v-btn(
        v-if="result && !result.complete"
        small dark
        color="indigo"
        :to="{ name: 'testing-id', params: { id: item._id } }") Продолжить тест
      div(
        v-if="result && result.complete") {{ result.points }} баллов
    
</template>

<script>
  export default {
    props: ['item'],
    computed: {
      starting () {
        return this.$store.getters['Testing/getTestStartingByTestId'](this.item._id)
      },
      result () {
        return this.$store.getters['Testing/getResultByTestId'](this.item._id)
      }
    }
  }
</script>