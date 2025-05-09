<template>
  <div class="projects-wrapper">
    <h2 class="custom-title">Projetos</h2>

    <div class="projects-list">
      <template v-if="isPending">
        <Skeleton
          v-for="skeleton in skeletonQuantity"
          :key="skeleton"
          width="12.5rem"
          height="12.5rem"
        />
      </template>
      <template v-else>
        <a
          v-for="project in githubRepos"
          :key="project.id"
          class="project"
          @click="handleNavigateToProject(project)"
        >
          <span>{{ project.name }}</span>
          <p>{{ project.description }}</p>
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RepositoryDto } from '~/DTO';

const { data: githubRepos, status } = await useCustomFetch<RepositoryDto[]>(
  '/github/repos',
  {},
  { lazy: true }
);

const skeletonQuantity = ref(12);

const isPending = computed(() => status.value === 'pending');

function handleNavigateToProject(project: RepositoryDto) {
  navigateTo(project.html_url, { open: { target: '_blank' } });
}
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
