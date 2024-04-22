<script setup lang="ts">
import { ref } from 'vue';
import { nanoid } from 'nanoid'

const id = nanoid(5);

const formEmpty = {
  id,
  name: `Элемент ${id}`,
  type: 'tent',
  isHidden: true,
  color: '#13396C',
  caption: '',
}

const typeOptions = [
  {
    label: 'Область',
    value: 'tent'
  },
  {
    label: 'Палатка',
    value: 'tent'
  }
]

const value = ref(formEmpty)

</script>

<template>
  <n-card
      style="width: 600px"
      title="Создать элемент карты"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
  >
    <n-form>
      <n-form-item label="Отображение" path="isHidden">
        <n-switch v-model:value="value.isHidden">
          <template #checked>
            Видно
          </template>
          <template #unchecked>
            <span style="color: #000">
                Скрыто
            </span>
          </template>
        </n-switch>
      </n-form-item>

      <n-form-item label="Тип">
        <n-select v-model:value="value.type" :options="typeOptions" />
      </n-form-item>

      <n-form-item label="Название" path="name">
        <n-input type="text" v-model:value="value.name" />
      </n-form-item>

      <n-form-item label="Цвет" path="isHidden">
        <n-color-picker v-model:value="value.color"
                        :show-alpha="false"
        />
      </n-form-item>

      <n-flex>
        <n-button type="primary">
          Создать
        </n-button>

        <n-button type="error">
          Удалить
        </n-button>
      </n-flex>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">

</style>