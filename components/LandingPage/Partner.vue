<template>
  <div class="container">
    <h2
      class="
        has-text-danger
        is-size-2
        has-text-weight-bold has-text-centered
        mt-6
      "
    >
      شركائنا
    </h2>
    <div
      class="
        partner
        is-flex is-justify-content-center
        mt-6
        is-align-items-center
      "
    >
      <img src="/images/amazon-2.svg" alt="amazon" />
      <img src="/images/jumia.svg" alt="jumia" />
      <img src="/images/aliexpress.svg" alt="ali" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
img {
  width: 200px;
  height: 50px;
  margin-inline: 25px;
  filter: grayscale(1);
}

img:hover {
  filter: grayscale(0);
}

@media (max-width: 768px) {
  .partner {
    /* display: block !important; */
    flex-direction: column;
  }

  .partner img {
    display: block;
    margin-bottom: 15px;
  }
}
</style>
