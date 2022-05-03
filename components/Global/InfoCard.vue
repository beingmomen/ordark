<template>
  <div class="col-span-12 sm:col-span-6 xl:col-span-3"
   :class="{'active': isActive}"
   @click="$emit('cardClicked', id)"
   >
    <div class="report-box zoom-in">
      <div class="box p-5">
        <div class="flex absolute left-5">

          <div
          v-if="percentage"
              class="report-box__indicator tooltip cursor-pointer bg-theme-9 pr-2"
            >
            
              {{percentage.toFixed(2) +  '%'}}
            </div>

          <!-- <i :class="`  text-blue-500 fas fa-${icon}`" style="font-size: 22px;"></i>
          <i :class="`  text-blue-500 fas fa-${icon}`" style="font-size: 22px;margin-right: -6px"></i>
           -->
          <!-- <i
            :data-feather="icon"
            class="report-box__icon text-theme-10 mr-auto "
          ></i> -->
        </div>
        <div class="text-3xl font-medium leading-8">{{value}} <span class="font-bold text-sm" v-if="money">({{money}} ج.م)</span> </div>
        <div class="text-base text-gray-600 mt-1">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title', 'value', 'id', 'icon', 'isActive','percentage','money'],
    computed:{
        
    }
};
</script>

<style>
.active .report-box::before{
  background: rgba(28, 63, 170, 0.6) ;
}
</style>