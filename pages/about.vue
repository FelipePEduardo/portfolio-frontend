<template>
  <div class="about-wrapper">
    <h2 class="custom-title">Sobre mim</h2>

    <div class="content-wrapper">
      <div class="information-wrapper">
        <img :src="data?.avatar_url" alt="" />
        <p>
          Me chamo Felipe Pereira Eduardo, tenho 21 anos e moro em Santo André,
          São Paulo.
          <br />
          <br />
          Atualmente estou atuando como desenvolvedor Full-Stack Pleno na
          <a
            href="https://www.linkedin.com/company/tbdcagro/posts/?feedView=all"
            style="text-decoration: underline"
          >
            @TBDC AgroSoftware </a
          >. Atuo utilizando ferramentas como Vuejs, Nodejs, Typescript,
          desenvolvendo features, aplicando refatorações e manutenções em
          sistema web.
          <br />
          <br />
          Me considero uma pessoa focada, persistente em aprender uma nova
          linguagem e me adaptar à qualquer mudança. Estou pronto para superar
          qualquer desafio, sempre disposto a aprender e ensinar.
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
    const apiData = await $fetch(`https://portfolio-backend-fnac.onrender.com/github/user`);

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
