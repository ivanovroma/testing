<template lang="pug">
  tr
    td
      nuxt-link(
        :to="{ name: 'results-id', params: { id: item._id }}") {{ test.label }}
    td {{ user.name }}
    td {{ user.login }}
    td {{ department.label }}
    td {{ createdFormat }}
    td {{ item.points }} баллов
    td(class="text-xs-right")
      v-btn(
        fab
        flat
        small
        color="blue"
        :to="{ name: 'results-id', params: { id: item._id }}")
        v-icon list
      ResultRemove(:id="item._id")
    
</template>

<script>
import moment from 'moment'
export default {
  props: ['item'],
  computed: {
    user () {
      return this.$store.getters['User/getByUserId'](this.item.userId)
    },
    department () {
      return this.$store.getters['Department/getByDepartmentId'](this.user.departmentId)
    },
    createdFormat () {
      return moment(this.item.createdAt).format('DD.MM.YYYY')
    },
    test () {
      return this.$store.getters['Test/getByTestId'](this.item.testId)
    }
  }
}
</script>