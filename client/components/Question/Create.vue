<template lang="pug">
  
    v-dialog(
      v-model="dialog"
      width="500"
    )
      v-btn(
        fixed
        slot="activator"
        dark
        fab
        left
        bottom
        color="red"
      )
        v-icon add

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
          light
        ) Новый вопрос

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
          ) Создать
</template>

<script>
  export default {
    props: ['testId'],
    data () {
      return {
        dialog: false,
        label: '',
        img: '',
        buttonLoading: false,
        error: '',
        type: {},
        types: [
          { typeLabel: 'Чек-боксы', value: 'check' },
          { typeLabel: 'Радио-кнопки', value: 'radio' }
        ],

        category: {},
        categories: [
          { label: 'Инфекция' },
          { label: 'ХОБЛ' },
          { label: 'Астма' },
          { label: 'Рентгенология' },
          { label: 'Дыхательная недостаточность' },
          { label: 'Редкие болезни' },
          { label: 'Функциональная диагностика' }
        ]
      }
    },
    methods: {
      async onSubmit () {
        this.buttonLoading = true

        const result = await this.$store
          .dispatch('Question/create', {
            label: this.label,
            type: 'radio',
            testId: this.testId,
            img: this.img,
            category: this.category.label
          })

        if (!result.success) {
          this.error = result.response.message
        } else {
          this.error = ''
          this.dialog = false
          this.label = ''
          this.img = ''
          this.type = {}
          this.category = null
        }

        this.buttonLoading = false
      }
    }
  }
</script>
