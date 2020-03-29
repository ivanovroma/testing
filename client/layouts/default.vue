<template lang="pug">
  v-app
    v-navigation-drawer(
      v-model="drawer"
      absolute
      temporary
    )
      v-list
        v-list-tile(
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        )
          v-list-tile-action
            v-icon(v-html="item.icon")
          v-list-tile-content
            v-list-tile-title(v-text="item.title")
    v-toolbar(fixed app v-if="userIsAuth")
      v-btn(
        flat
        icon
        color="indigo"
        @click="drawer = !drawer"
        v-if="userIsAuth.role == 'admin'"
      )
        v-icon menu
      
      v-toolbar-title(v-text="title")
      
      v-spacer
      
      div {{ userIsAuth.name }}
      
      Logout

    v-content
      .main-wrap
        nuxt
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          { icon: 'apps', title: 'Тестирование', to: '/' },
          { icon: 'supervised_user_circle', title: 'Подразделения', to: '/departments' },
          { icon: 'account_circle', title: 'Пользователи', to: '/users' },
          { icon: 'help_outline', title: 'Тесты', to: '/tests' },
          { icon: 'done_all', title: 'Результаты', to: '/results' }
        ],
        title: ''
      }
    },
    methods: {},
    async mounted () {
      this.$store.dispatch('User/signinByJwtFromLocaleStorage')
    },
    computed: {
      userIsAuth () {
        return this.$store.getters['User/getCurrentUser']
      }
    }
  }
</script>

<style>
.p0 {
  padding: 0px
}
.p15 {
  padding: 15px !important
}
.pt15 {
  padding-top: 15px;
}
.pt30 {
  padding-top: 30px;
}
.pb30 {
  padding-bottom: 30px;
}
.mb0 {
  margin-bottom: 0px;
}
.mt0 {
  margin-top: 0px;
}
.mb15 {
  margin-bottom: 15px;
}
.mb30 {
  margin-bottom: 30px;
}

.main-wrap {
  max-width: 1200px;
  margin: 50px auto
}
@media (max-width: 1200px) {
  .main-wrap {
    margin: 50px 15px
  }
}
/* large */
.l-12 {
  width: 100%
}
.l-4 {
  width: 33.3%
}
/* large */

/* small */
@media (max-width: 1000px) {
  .s-6 {
    width: 50%
  }
}
/* small */

/* extra-small */
@media (max-width: 500px) {
  .x-12 {
    width: 100%
  }
}
/* extra-small */
</style>
