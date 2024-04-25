<script setup lang="ts">
import { h, ref } from 'vue';
import { NAvatar, SelectRenderLabel, useNotification } from 'naive-ui';

const emit = defineEmits(['confirm', 'cancel'])
const value = ref({
  name: '',
  icon: '',
  scale: 1,
});
const options = ref([]);
const loading = ref(false);
const notification = useNotification();
const handleSearchIcons = async (query: string) => {
  loading.value = true;

  try {
    if (!query.length) {
      options.value = []
      return
    }

    const data = (await import('@/assets/fluent-filled.json')).icons
    const filtred = data.filter(
        (item) => ~item.name.indexOf(query)
    )

    const naiveOptions = filtred.slice(0, 200).map((i) => {
      return {
        label: i.name,
        value: i.preview,
      }
    })

    options.value = naiveOptions
  } catch (e) {
    notification.error({
      title: 'Ошибка',
      content: 'Не удалось загрузить иконки'
    })
  }

  loading.value = false;
}

const renderLabel: SelectRenderLabel = (option) => {
  return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
      },
      [
        h(NAvatar, {
          src: option.value,
          round: true,
          size: 22,
          style: {
            marginRight: '4px'
          },
        }),
        h(
            'div',
            {
              style: {
                padding: '4px 0'
              }
            },
            [
              h('div', null, [option.label as string]),
            ]
        )
      ]
  )
}

const handleConfirm = () => {
  emit('confirm', value.value);
}
</script>

<template>
  <n-card style="width: 600px"
          title="Маркер"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
  >
    <n-form @submit.prevent="handleConfirm">
      <n-form-item label="Выберите иконку">
        <n-select v-model:value="value.icon"
                  filterable
                  :options="options"
                  :render-label="renderLabel"
                  @search="handleSearchIcons"
                  clearable
                  remote
        />
      </n-form-item>

      <n-form-item label="Название">
        <n-input v-model:value="value.name"/>
      </n-form-item>

      <n-form-item label="Размер">
        <n-slider v-model:value="value.scale"
                  :min="0"
                  :max="2"
                  :step="0.1"
                  :show-tooltip="true"
        />
      </n-form-item>

      <n-flex>
        <n-button type="primary"
                  attr-type="submit"
        >
          Сохранить
        </n-button>

        <n-button type="error"
                  @click="emit('cancel')"
        >
          Удалить
        </n-button>
      </n-flex>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">

</style>