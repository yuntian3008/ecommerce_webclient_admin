<template>
  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white"><slot></slot> <span class="align-super text-red-700 font-bold text-sm">(* bắt buộc)</span></h2>
</template>

<script>
export default {
  name: 'FormTitle',
  props: {

  },
}
</script>
