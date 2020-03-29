<template lang="pug">
  div
    v-btn(
      fab
      flat
      small
      color="blue"
      v-if="!checkLogout"
      @click="logout")
      v-icon exit_to_app
    v-btn(
      fab
      flat
      small
      color="green"
      v-if="checkLogout"
      @click="confirmLogout")
      v-icon check
    v-btn(
      fab
      flat
      small
      color="red"
      v-if="checkLogout"
      @click="unconfirmLogout")
      v-icon close
</template>

<script>
export default {
  data () {
    return {
      checkLogout: false
    }
  },
  methods: {
    logout () {
      this.checkLogout = true
    },
    async confirmLogout () {
      await this.$store.dispatch('User/logout')
      this.checkLogout = false
    },
    unconfirmLogout () {
      this.checkLogout = false
    }
  }
}
</script>
