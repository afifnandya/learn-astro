<template>
  <Story :title="'Restaurant Featured Image'">
    <div class="flex h-[200px] bg-gray-300">
      <div class="flex-shrink-0 w-1/2">
        <img src="http://unsplash.it/250?random&gravity=center" alt="" />
      </div>
      <div class="flex flex-col w-1/2">
        <div class="object-contain min-h-[100px]">
          <img
            src="http://unsplash.it/250?random&gravity=center"
            class="object-cover w-full h-full"
            alt=""
          />
        </div>
        <div class="object-contain h-1/2">
          <img
            src="http://unsplash.it/250?random&gravity=center"
            class="object-cover w-full h-full"
            alt=""
          />
        </div>
      </div>
    </div>
  </Story>
</template>
