<template>
  <div class="block my-2 bg-white rounded-lg restaurant-card card-shadow">
    <!-- restaurant image -->
    <div
      class="block w-full bg-gray-300 rounded-tl-lg rounded-tr-lg aspect-video"
    ></div>
    <div>
      <!-- restaurant info -->
      <div class="flex p-2 pb-0 restaurant-info">
        <div class="flex flex-col flex-grow w-8/12">
          <!-- restaurant name -->
          <span class="w-8/12 h-3 mb-1 bg-gray-300 restaurant-name"> </span>
        </div>
      </div>
      <div class="flex p-2 pt-0">
        <!-- side by side cuisine , location and rating -->
        <div class="flex flex-col w-9/12 mr-1">
          <!-- restaurant primaryCuisine & primaryLocation -->
          <div class="flex items-center justify-around mb-1">
            <div class="flex items-center w-1/2">
              <div class="mr-1">
                <div class="w-6 h-2 bg-gray-300"></div>
              </div>
            </div>
            <div class="flex items-center w-1/2">
              <div class="w-6 h-2 bg-gray-300"></div>
            </div>
          </div>
          <!-- restaurant dine in / delivery -->
          <div class="flex items-center text-2xs lg:text-xs">
            <div class="flex items-center mr-1">
              <div class="mr-1">
                <div class="w-6 h-2 bg-gray-300"></div>
              </div>
            </div>

            <div class="flex items-center mr-1">
              <div class="mr-1">
                <div class="w-6 h-2 bg-gray-300"></div>
              </div>
            </div>

            <div class="flex items-center mr-1">
              <div class="mr-1">
                <div class="w-6 h-2 bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end justify-end w-3/12">
          <div class="flex flex-col items-end mt-1">
            <div class="w-6 h-2 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.restaurant-card {
  &.card-shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  .restaurant-info {
    @screen lg {
      height: 45px;
    }
    min-height: 27px;
  }
}
</style>
