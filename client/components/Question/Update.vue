<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500"
    )
      v-btn(
        fab
        flat
        small
        color="blue"
        slot="activator"
      )
        v-icon edit

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Обновить вопрос

        v-card-text
          v-alert(
            v-model="error.length > 0"
            type="error"
            class="mb15"
          ) {{ this.error }}
          
          v-text-field(
            label="Вопрос"
            outline
            v-model="label"
          )

          v-text-field(
            label="Изображение"
            outline
            v-model="img"
          )

          v-select(
            v-model="category"
            :items="categories"
            item-text="label"
            item-value="label"
            label="Категория"
            persistent-hint
            return-object
            single-line
            outline)

          //- v-select(
            v-model="type"
            :items="types"
            item-text="typeLabel"
            item-value="value"
            label="Тип"
            persistent-hint
            return-object
            single-line
            outline)

        v-divider

        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            flat
            @click="dialog = false"
          ) Отмена
          v-btn(
            color="indigo"
            @click="onSubmit"
            dark
            :loading="buttonLoading"
          ) Обновить
</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        dialog: false,
        label: '',
        buttonLoading: false,
        error: '',
        img: '',
        type: {
          value: '',
          typeLabel: ''
        },
        types: [
          { typeLabel: 'Чек-боксы', value: 'check' },
          { typeLabel: 'Радио-кнопки', value: 'radio' }
        ],

        category: null,
        categories: [
          { label: 'Инфекция' },
          { label: 'ХОБЛ' },
          { label: 'Астма' },
          { label: 'Рентгенология' },
          { label: 'Дыхательная недостаточность' },
          { label: 'Редкие болезни' },
          { label: 'Функциональная диагностика' },
          { label: 'Рентген' }
        ]
      }
    },
    async mounted () {
      this.label = this.question.label
      this.img = this.question.img
      this.category = { label: this.question.category }

      // this.type.value = this.question.type
      // if (this.type.value === 'check') this.type.typeLabel = 'Чек-боксы'
      // else if (this.type.value === 'radio') this.type.typeLabel = 'Радио-кнопки'
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store
          .dispatch('Question/update', {
            label: this.label,
            type: 'radio',
            img: this.img,
            questionId: this.question._id,
            category: this.category.label
          })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
        }

        this.buttonLoading = false
      }
    }
  }
</script>
