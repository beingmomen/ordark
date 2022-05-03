<template>
<div class="flex items-center justify-center h-screen">
  <p class="my-10 text-5xl text-center">
    This is the Clients Page
  </p>
</div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["authentication", "admin"],
  
};
</script>