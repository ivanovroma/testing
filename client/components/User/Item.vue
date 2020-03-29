<template lang="pug">
  tr
    td {{ user.name }}
    td {{ user.login }}
    td {{ user.lang.role }}
    td {{ user.lang.createdAt }}
    td {{ user.lang.departmentLabel }}
    td {{ user.lang.blocked }}
    
    
    td(class="text-xs-right")
      UserUpdate(
        :user="user")
      UserUpdatePassword(
        :user = "item")
      UserRemove(
        :user = "item")
</template>

<script>
import moment from 'moment'

export default {
  props: ['item'],
  computed: {
    user () {
      const departments = this.$store.getters['Department/get']
      const user = {
        ...this.item,
        lang: {}
      }

      if (user.role === 'admin') user.lang.role = 'Администратор'
      else if (user.role === 'examinee') user.lang.role = 'Пользователь'

      user.lang.createdAt = moment(user.createdAt).format('DD.MM.YYYY')

      if (user.blocked === true) user.lang.blocked = 'Да'
      else user.lang.blocked = 'Нет'

      for (let ii = 0; ii < departments.length; ii++) {
        const department = departments[ii]

        if (user.departmentId === department._id) {
          user.lang.departmentLabel = department.label
        }
      }

      return user
    }
  }
}
</script>

