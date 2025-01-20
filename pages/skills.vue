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
        <Button v-if="isEditing" label="Cancelar" @click="cancelEdit" />
      </div>
      <div class="skills-wrapper">
        <div v-for="skill in data" class="skill">
          <span>{{ skill.name }}</span>
          <button
            v-if="checkIfUserIsMaster(loggedUser) && skill.active"
            @click="handleEdit(skill)"
          >
            Editar
          </button>
          <button
            v-if="checkIfUserIsMaster(loggedUser)"
            @click="handleDelete(skill)"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthDto, SearchResponse, SkillSearchDto } from '~/DTO';
import { checkIfUserIsMaster } from '~/helpers/checkUserPermission';

const data = ref<SkillSearchDto[]>([]);
const form = ref<Partial<SkillSearchDto>>({});
const isEditing = ref(false);

const cookie = useCookie<AuthDto>('user');

const buttonLabel = computed(() => (isEditing.value ? 'Editar' : 'Adicionar'));
const loggedUser = computed(() => cookie.value.user);

async function search() {
  try {
    const { data: apiData, count } = await $fetch<
      SearchResponse<SkillSearchDto>
    >(`http://localhost:3000/skills/search`);

    data.value = apiData;
  } catch (error) {
    console.error(error);
  }
}

function handleEdit(skill: SkillSearchDto) {
  isEditing.value = true;
  form.value = skill;
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
    await $fetch(`http://localhost:3000/skills`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      method: 'POST',
      body: form.value,
    });

    window.alert('Criado com sucesso');
    await search();
  } catch (error) {
    console.error(error);
  }
}

async function update() {
  try {
    await $fetch(`http://localhost:3000/skills/${form.value.id}`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      method: 'PATCH',
      body: form.value,
    });

    window.alert('Atualizado com sucesso');
    await search();
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(skill: SkillSearchDto) {
  try {
    await $fetch(`http://localhost:3000/skills/${skill.id}`, {
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      method: 'DELETE',
    });

    window.alert('Deletado com sucesso');
    await search();
  } catch (error) {
    console.error(error);
  }
}

function cancelEdit() {
  form.value = {};
  isEditing.value = false;
}

onBeforeMount(search);
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
    }
  }
}
</style>
