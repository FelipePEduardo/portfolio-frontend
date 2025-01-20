<template>
  <div class="about-wrapper">
    <h2 class="custom-title">Sobre mim</h2>

    <div class="content-wrapper">
      <div class="information-wrapper">
        <img :src="data?.avatar_url" alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
          necessitatibus temporibus corrupti quia doloremque unde culpa laborum
          accusantium architecto, neque natus nemo sed suscipit. Laboriosam
          similique eos amet esse odit.
        </p>
      </div>

      <div class="bio-wrapper">
        <h3>Bio</h3>
        <blockquote>
          {{ data?.bio }}
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = ref();

async function getGithubInformations() {
  try {
    const apiData = await $fetch(`http://localhost:3000/github/user`);

    data.value = apiData;
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(getGithubInformations);
</script>

<style lang="scss" scoped>
.about-wrapper {
  .custom-title {
    background: linear-gradient(to right, #80ffea, #d49ef5) text;
    margin-bottom: 2rem;
  }

  .content-wrapper {
    .information-wrapper {
      display: flex;
      align-items: start;
      gap: 3rem;

      > img {
        border-radius: 0.5rem;
      }

      > p {
        max-width: 384px;
        line-height: 2rem;
      }
    }

    .bio-wrapper {
      margin-top: 2rem;

      > h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      > blockquote {
        font-style: italic;

        border-left: 1px solid #666;
        padding-left: 1.25rem;
      }
    }
  }
}
</style>
