<template>
  <main id="main" :class="$route.meta.extraClass">
    <router-view />
  </main>
</template>

<style lang="scss">
#main {
  margin: 0 auto;
  padding: 2rem;

  &.no-padding {
    padding: 0;
  }
}
</style>
