<template>
  <div class="projects-wrapper">
    <h2 class="custom-title">Projetos</h2>

    <div class="projects-list">
      <a
        v-for="project in data"
        :key="project.id"
        class="project"
        @click="handleNavigateToProject(project)"
      >
        <span>{{ project.name }}</span>
        <p>{{ project.description }}</p>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = ref<any[]>([]);

async function getGithubRepositories() {
  try {
    data.value = await $fetch<any[]>(`https://portfolio-backend-fnac.onrender.com/github/repos`);
  } catch (error) {
    console.error(error);
  }
}

function handleNavigateToProject(project: any) {
  navigateTo(project.html_url, { open: { target: '_blank' } });
}

onBeforeMount(getGithubRepositories);
</script>

<style lang="scss" scoped>
.projects-wrapper {
  .custom-title {
    background: linear-gradient(to right, #f2555a, #d49ef5) text;
    margin-bottom: 2rem;
  }

  .projects-list {
    max-width: 900px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    .project {
      border: 1px solid #666;
      border-radius: 10px;
      padding: 1rem;
      cursor: pointer;

      > span {
        color: $text-white;
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 2rem;
      }
    }
  }
}
</style>
