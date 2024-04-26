<script setup lang="ts">
import { ref, h } from 'vue';
import { NAvatar } from 'naive-ui';
import { nanoid } from 'nanoid';
import {
  FormRules,
  SelectRenderLabel,
  useNotification,
} from 'naive-ui';
import { Tent12Filled } from '@vicons/fluent'
const emit = defineEmits(['confirm', 'cancel'])

const id = nanoid(8);
const options = [
  {
    label: 'Область',
    value: 'area'
  },
  {
    label: 'Палатка',
    value: 'tent'
  }
]

const iconOptions = ref([])

const formEmptyElement = {
  id,
  name: `ELEMENT-${id}`,
  type: 'tent',
  isHidden: true,
  color: '#13396C',
  caption: '',
}

const formEmptyTent = {
  tentNo: '',
  personCount: 0,
  doorPositions: []
}

// const formEmptyArea = {
//   icon: '',
// }

const rules = {
  name: {
    required: true,
    message: 'Необходимо заполнить поле',
    trigger: ['input', 'blur']
  },
} satisfies FormRules

const value = ref({...formEmptyElement, ...formEmptyTent });
const formRef = ref()
const notification = useNotification()

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
          // @ts-expect-error
          src: option.value,
          round: true,
          size: 22,
          style: {
            marginRight: '4px'
          }
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
const handleSearchIcons = async (query: string) => {
  loading.value = true;

  try {
    if (!query.length) {
      iconOptions.value = []
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

    iconOptions.value = naiveOptions
  } catch (e) {
    notification.error({
      title: 'Ошибка',
      content: 'Не удалось загрузить иконки'
    })
  }

  loading.value = false;
}
const loading = ref(false);
const handleConfirm = (event) => {
  event.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('confirm', value.value)
    } else {
      notification.error({
        title: 'Ошибка',
        content: 'Ошибка при сохранении элемента',
        duration: 3000
      })
    }
  })
}

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
    <n-form ref="formRef"
            :rules="rules"
            :model="value"
            @submit="handleConfirm"
    >
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

      <n-form-item label="Название" path="name">
        <n-input type="text" v-model:value="value.name" />
      </n-form-item>

      <n-form-item label="Цвет" path="color">
        <n-color-picker v-model:value="value.color"
                        :show-alpha="false"
        />
      </n-form-item>

      <n-form-item label="Тип" path="type">
        <n-select v-model:value="value.type"
                  :options="options"
                  placeholder="Выберите тип"
        />
      </n-form-item>

      <n-form-item v-if="value.type === 'tent'" label="Номер палатки" path="tentNo">
        <n-input type="text" v-model:value="value.tentNo" />
      </n-form-item>

      <n-form-item v-if="value.type === 'tent'" label="Кол-во персон" path="personCount">
        <n-input type="text" v-model:value="value.personCount" />
      </n-form-item>

      <n-form-item v-if="value.type === 'tent'" label="Позиция дверей" path="personCount">
        <n-card style="margin-right: 20px">
          Данная настройка корректно <br> работает только с 4 гранями
        </n-card>
        <n-checkbox-group v-model:value="value.doorPositions"
                          class="door-combobox"
        >
          <n-checkbox value="left" class="left" />
          <n-checkbox value="top" class="top" />
          <n-checkbox value="right" class="right" />
          <n-checkbox value="bottom" class="bottom" />
          <div class="box">
            <Tent12Filled />
          </div>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item v-if="value.type === 'area'" label="Иконка" path="icon">
        <n-select v-model:value="value!.icon"
                  filterable
                  :options="iconOptions"
                  :render-label="renderLabel"
                  @search="handleSearchIcons"
                  clearable
                  remote
        />
      </n-form-item>

      <n-form-item label="Примечание" path="caption">
        <n-input type="textarea" v-model:value="value.caption" />
      </n-form-item>

      <n-flex>
        <n-button type="primary"
                  attr-type="submit"
        >
          Создать
        </n-button>

        <n-button type="error" @click="emit('cancel')">
          Удалить
        </n-button>
      </n-flex>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">
.icon {
  margin-right: 20px;
  width: 32px;
  border: 1px solid rgb(224, 224, 230);
  border-radius: 3px;
}
.box {
  margin: 20px;
  display: flex;
  width: 40px;
  height: 40px;
  border: 1px solid black;
}

.door-combobox {
  position: relative;

  .n-checkbox {
    position: absolute;
    &.left {
      top: calc(50% - 8px);
      left: 0;
    }

    &.top {
      top: 0;
      left: calc(50% - 8px);
    }

    &.right {
      right: 0;
      top: calc(50% - 8px);
    }

    &.bottom {
      bottom: 0;
      left: calc(50% - 8px);
    }
  }
}
</style>