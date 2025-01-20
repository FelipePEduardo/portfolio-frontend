<template>
  <main class="main-wrapper">
    <img src="https://github.com/FelipePEduardo.png" alt="" />

    <div class="welcome-wrapper">
      <p>Seja bem-vindo, <span>meu nome é</span></p>
      <h2 class="custom-title">Felipe Pereira Eduardo</h2>

      <span>Full Stack Developer</span>
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  > img {
    max-width: 400px;
    border-radius: 50%;
    border: 20px solid $bg-secondary;
  }

  .welcome-wrapper {
    > p {
      font-size: 1.2rem;

      > span {
        font-size: 1rem;
      }
    }

    .custom-title {
      background: linear-gradient(to right, #7938b2, #d49ef5) text;
    }

    > span {
      font-size: 1.25rem;
      color: $text-secondary;
    }
  }
}
</style>
