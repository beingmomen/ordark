<template>
  <article
    class="gb-vue-timeline-update gb-vue-timeline-update--dark js-vue-timeline-update"
  >
    <div class="gb-vue-timeline-update__left">
          {{index+1}}
      
      <span class="gb-vue-timeline-update__ago"
        >{{formattedDate}}</span
      >
    </div>
    
    <div class="gb-vue-timeline-update__right">
      <div class="gb-vue-timeline-update__information">
        <div class="gb-vue-timeline-update__meta">
          <span
            class="gb-vue-timeline-update__category gb-base-badge gb-base-badge--black gb-base-badge--small gb-base-badge--dark gb-base-badge--filled"
            ><span class="gb-base-badge__focuser"></span>جديد</span
          ><span class="gb-vue-timeline-update__ago"
            >{{formattedDate}}</span
          >
        </div>
        <h2 class="gb-vue-timeline-update__title">
          {{ status.message }}
        </h2>
      </div>
      <!---->
      <p class="gb-vue-timeline-update__description">
        {{ status.message }}
      </p>
      <!---->
    </div>
  </article>
</template>

<script>
export default {
  props: ["logDate", "status","index"],
  computed: {
    formattedDate() {
      let date = new Intl.DateTimeFormat("ar-AR", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(this.logDate));
      return date;
    },
  },
};
</script>

<style></style>
