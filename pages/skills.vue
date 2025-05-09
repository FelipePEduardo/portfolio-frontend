<template>
  <div class="container">
    <h2 class="custom-title">Habilidades</h2>

    <div class="content-wrapper">
      <div v-if="checkIfUserIsMaster(loggedUser)" class="manage-skill">
        <Input v-model="form.name" name="skill-name" />
        <Button
          :label="buttonLabel"
          :disabled="!form.name"
          @click="addOrUpdateSkill"
        />
        <Button v-if="isEditing" label="Cancelar" @click="resetFields" />
      </div>
      <div class="skills-wrapper">
        <Skeleton v-if="isPending" width="100%" height="25rem" />
        <Skeleton v-if="isPending" width="100%" height="25rem" />
        <template v-else>
          <div v-for="skill in skills?.data" class="skill">
            <span>{{ skill.name }}</span>
            <div
              v-if="checkIfUserIsMaster(loggedUser) && skill.active"
              @click="handleEdit(skill)"
              class="icon-wrapper"
            >
              <Icon
                name="material-symbols:edit-outline"
                style="color: orange"
              />
            </div>
            <div
              v-if="checkIfUserIsMaster(loggedUser)"
              @click="handleDelete(skill)"
              class="icon-wrapper"
            >
              <Icon name="material-symbols:delete-outline" style="color: red" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, SearchResponse, SkillSearchDto, SkillDto } from '~/DTO';
import { checkIfUserIsMaster } from '~/helpers/checkUserPermission';

/* #region Composables */

const cookie = useCookie<AuthDto>('user');
const {
  data: skills,
  status,
  refresh,
} = await useCustomFetch<SearchResponse<SkillSearchDto>>(
  '/skills/search',
  {},
  {
    lazy: true,
  }
);

/* #endregion */

/* #region Data */

const form = ref<Partial<SkillSearchDto>>({});
const isEditing = ref(false);

/* #endregion */

/* #region Computed */

const buttonLabel = computed(() => (isEditing.value ? 'Editar' : 'Adicionar'));
const loggedUser = computed(() => cookie.value?.user);
const isPending = computed(() => status.value === 'pending');

/* #endregion */

/* #region Methods */

function handleEdit(skill: SkillSearchDto) {
  isEditing.value = true;
  form.value = { ...skill };
}

function addOrUpdateSkill() {
  if (isEditing.value) {
    update();
  } else {
    create();
  }
}

async function create() {
  try {
    await useAPI<SkillDto>(
      '/skills',
      {},
      {
        method: 'POST',
        body: form.value,
        headers: {
          Authorization: `Bearer ${cookie.value.token}`,
        },
      }
    );

    window.alert('Criado com sucesso');
    form.value = {};
    await refresh();
  } catch (error) {
    console.error(error);
  }
}

async function update() {
  try {
    await useAPI<SkillDto>(
      `/skills/${form.value.id}`,
      {},
      {
        method: 'PATCH',
        body: form.value,
        headers: {
          Authorization: `Bearer ${cookie.value.token}`,
        },
      }
    );

    window.alert('Atualizado com sucesso');
    resetFields();
    await refresh();
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(skill: SkillSearchDto) {
  try {
    await useAPI<void>(
      `/skills/${skill.id}`,
      {},
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookie.value.token}`,
        },
      }
    );

    window.alert('Deletado com sucesso');
    await refresh();
  } catch (error) {
    console.error(error);
  }
}

function resetFields() {
  form.value = {};
  isEditing.value = false;
}

/* #endregion */
</script>

<style lang="scss" scoped>
.container {
  .custom-title {
    background: linear-gradient(to right, #56d8ff, #fff) text;
    margin-bottom: 2rem;
  }

  .manage-skill {
    display: flex;
    align-items: start;
    gap: 1rem;

    button {
      flex: 1;
    }
  }

  .skills-wrapper {
    width: 800px;
    border-radius: 0.2rem;
    padding: 2.5rem;
    background: $bg-secondary;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;

    .skill {
      display: flex;
      align-items: center;
      background-color: rgb(145, 113, 243);
      color: $text-white;
      border-radius: 0.5rem;
      padding: 1.25rem;

      span {
        text-align: center;
        flex: 1;
      }

      button {
        margin-left: auto;
      }

      .icon-wrapper {
        max-height: 24px;
      }
    }
  }
}
</style>
