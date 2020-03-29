<template lang="pug">
  v-card(class="mb30")
    v-card-title(class="headline" color="indigo") {{ question.label }} - {{ question.category }}
      v-icon(
        color="blue"
        v-if="question.img"
        style="margin-left: 15px") photo

      v-spacer
    
      OptionCreate(:question="question")
      QuestionUpdate(:question="question")
      QuestionRemove(:questionId="question._id")

    v-divider
    
    v-card-text(class="p0")
      OptionList(:questionId="question._id")
</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        loading: false
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        this.buttonLoading = false
      }
    },
    computed: {
      departments () {
        return this.$store.getters['Department/get']
      }
    }
  }
</script>
