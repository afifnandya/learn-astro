<template>
  <Story :title="storyTitle">
    <UserPackTicket
      :code="code"
      :title="title"
      :valid-start-date="validStartDate"
      :valid-end-date="validEndDate"
      :expiryDate="expiryDate"
    />
  </Story>
</template>

<script lang="ts" setup>
import UserPackTicket from "../UserPackTicket.vue";
const storyTitle = "Package Ticket";
const code = "VC-091";
const title = "Package Ticket";
const validStartDate = "2022-01-01";
const validEndDate = "2022-03-03";
const expiryDate = "2022-12-12";
</script>
