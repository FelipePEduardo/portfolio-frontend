<template>
  <div class="wrapper">
    <AppHeader />
    <div class="page-content">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;

  display: grid;
  grid-template-rows: 72px auto 64px;

  .page-content {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-block: 2rem;
  }
}
</style>
