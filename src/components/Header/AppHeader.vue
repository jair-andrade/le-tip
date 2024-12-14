<template>
  <div class="header">
    <div class="header__logo">
      <img
        :src="headerImage"
        class="header__logo-image"
        width="50px"
        alt="Logo do site no cabeçalho"
      />
    </div>
    <div class="header__info">
      <h1 class="header__title">LE TIP</h1>
    </div>
    <div class="header__info">
      <h3 class="header__subtitle"></h3>
    </div>
  </div>
</template>

<script>
import headerImage from "@/assets/logo.png";
export default {
  name: "AppHeader",
  data() {
    return {
      headerImage,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  width: 100%;
}

.header__logo {
  padding: 1rem;
}

.header__logo-image {
  max-width: 100%;
}

.header__info {
  display: flex;
  justify-content: center;
}

.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.header__subtitle {
  font-size: 1rem;
  color: white;
}
</style>
