<template>
  <div class="bg-red-400 pt-2 relative mx-auto text-gray-800 bg-red-400 w-full">
    <input
      class="w-full text-2xl font-semibold border-2 border-gray-300 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none text-center"
      type="search"
      name="search"
      placeholder="Search"
      v-model="number"
    />
    
  </div>
</template>
<script>
export default{
    data(){
        return {
            number: "123"
        }
    }
}
</script>

<style>

</style>
