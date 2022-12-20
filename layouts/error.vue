<template>
  <section class="flex items-center p-16 dark:bg-gray-900 dark:text-gray-100">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl text-gray-600">
          <span class="sr-only">Lỗi</span>{{ error.statusCode }}
        </h2>
        <p class="text-2xl font-semibold md:text-3xl" v-if="error.statusCode == 404">Đáng tiếc, trang này không tồn tại
        </p>
        <p class="text-2xl font-semibold md:text-3xl" v-if="error.statusCode == 500">Máy chủ xảy ra lỗi vui lòng thử lại
          sau</p>

      </div>
      <NuxtLink to="/" class="mt-8 px-8 py-3 font-semibold rounded bg-primary-400 text-gray-900">Về trang chủ
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  layout: 'guest' // you can set a custom layout for the error page
}
</script>
