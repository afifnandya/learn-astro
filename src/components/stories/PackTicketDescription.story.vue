import type { title } from 'process';
<template>
  <Story :title="title">
    <PackTicketDescription :description="description" />
  </Story>
</template>

<script lang="ts" setup>
import PackTicketDescription from "../PackTicketDescription.vue";
const description =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi provident quis debitis molestiae earum nihil sit labore consequatur nemo. Velit quasi ipsam aut ad. Maiores eaque perferendis distinctio velit fugiat?";
const title = "Pack Ticket Description";
</script>
