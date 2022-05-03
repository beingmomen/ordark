<template>
  <div class="hero-section columns is-desktop mt-3">
    <div
      class="
        img-column
        column
        is-flex is-justify-content-center is-align-items-center
      "
    >
      <img class="hero-img" src="/images/496x421px.svg" alt="hero" />
    </div>
    <div
      class="
        mt-5
        data-column
        column
        is-flex is-justify-content-center is-align-items-center
      "
    >
      <div>
        <h2
          class="
            has-text-white has-text-weight-bold
            is-size-3-desktop is-size-3-touch
            mb-6
          "
        >
          عايز السرعه يبقى لازم تختار
          <span class="has-background-danger has-text-dark px-2 rounded"
            >Bline Orders</span
          >
        </h2>
        <p class="has-text-white is-size-4-desktop is-size-4-touch mb-4">
          معانا هتقدر توصل منتجاتك فى أسرع وقت وأقل تكلفة
        </p>
        <p class="has-text-white is-size-4-desktop is-size-4-touch mb-4">
          معانا هتقدر توصل منتجاتك لاى مكان انت عايزه
        </p>
        <p class="has-text-white is-size-4-desktop is-size-4-touch mb-4">
          معانا هتقدر تتابع تحركات المنتج أول بأول
        </p>

        <nuxt-link
          to=""
          class="
            inline-block
            is-size-4
            has-background-danger has-text-white has-text-weight-bold
            px-4
            py-3
            my-6
            rounded
          "
          style="width: fit-content"
        >
          اشحن معانا
        </nuxt-link>
        <nuxt-link
          to=""
          class="
            inline-block
            is-size-4
            has-background-danger has-text-white has-text-weight-bold
            px-4
            py-3
            mr-3
            my-6
            rounded
          "
          style="width: fit-content"
        >
          تتبع شحنتك
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hero-section {
  background-image: url("/images/hero.svg");
  min-height: 700px;
}

.img-column {
  order: 2;
}

.data-column {
  order: 1;
}
@media (max-width: 768px) {
  .hero-img {
    width: 80%;
  }

  p,
  h2,
  a {
    margin-right: 30px;
    line-height: 1.3;
  }

  span {
    display: block;
    width: fit-content;
    margin-top: 15px;
    padding-block: 10px;
  }
}

@media (max-width: 350px) {
  h2 {
    font-size: 28px !important;
  }
}
</style>
