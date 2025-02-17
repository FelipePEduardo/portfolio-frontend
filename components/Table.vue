<template>
  <div class="table">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <template v-for="header in headers" :key="header">
              <th scope="col">
                <span :title="header.label">{{ header.label }}</span>
              </th>
            </template>
          </tr>
          <tr>
            <template v-for="header in headers" :key="header">
              <th>
                <Input
                  v-model="filters[header.field]"
                  v-if="header.searchable"
                  :name="header.field"
                  size="is-small"
                />
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="row in data" :key="row">
            <tr>
              <td
                v-for="column in headers"
                :key="column.field"
                :class="{ 'clickable-row': clickableRow }"
                @click="() => (clickableRow ? emit('click-row', row) : null)"
              >
                {{ getColumnData(row, column) }}
                <template v-if="$slots[column.field]">
                  <slot :name="column.field" />
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div>
        {{ countLabel }}
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Record<string, unknown>">
import type { PropType } from 'vue';

type HeaderType = {
  field: string;
  label?: string;
  searchable?: boolean;
};

const props = defineProps({
  headers: {
    type: Array as PropType<HeaderType[]>,
    default: [],
  },
  data: {
    type: Array as PropType<T[]>,
    default: [],
  },
  count: {
    type: Number,
    default: 0,
  },
  clickableRow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'click-row', data: any): void;
  (e: 'filter-change', data: Record<string, unknown>): void;
}>();

/* #region Data */

const filters = ref<Record<string, unknown>>({});

/* #endregion */

/* #region Computed */

const countLabel = computed(() => `${props.count} resultados`);

/* #endregion */

/* #region Methods */

function getColumnData(row: any, column: HeaderType) {
  if (!column.field) return null;

  const splittedColumn = column.field.split('.');

  let columnValue;

  if (splittedColumn.length > 1) {
    columnValue = splittedColumn.reduce((accumulator, prop) => {
      if (accumulator && typeof accumulator === 'object')
        return accumulator[prop];

      return accumulator;
    }, row);
  } else {
    columnValue = row[column.field];
  }

  return columnValue;
}

function handleFilterChange(value: Record<string, unknown>) {
  emit('filter-change', value);
}
/* #endregion */

/* #region Watchers */

watch(
  filters,
  (newValue) => {
    handleFilterChange(newValue);
  },
  { deep: true }
);
/* #endregion */
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 90%;

  .table-wrapper {
    width: 100%;
    height: 100%;
    background-color: $bg-secondary;
    border-radius: 8px;
    padding: 18px;

    table {
      width: 100%;
      border-collapse: collapse;

      tbody {
        tr {
          &:hover {
            background-color: $bg-tertiary;
          }
        }
      }

      th,
      td {
        padding: 8px 13px;
        text-align: left;
      }

      .clickable-row {
        cursor: pointer;
      }
    }
  }

  .pagination {
    margin-top: 2rem;
  }
}
</style>
