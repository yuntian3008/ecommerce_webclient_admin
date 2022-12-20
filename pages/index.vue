<template>
  <div class="container mx-auto">

    <div class="bg-white dark:bg-gray-800 ">
    <div class="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span class="block">
                Chào {{ $auth.user.name }}
            </span>
            <span class="block text-yellow-500">
                Chúc bạn một ngày tốt lành
            </span>
        </h2>
        <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
                <!-- <button type="button" class="py-4 px-6  bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Get started
                </button> -->
            </div>
        </div>
    </div>
</div>

  </div>

</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      showModal: true,
      value: "",
    }
  },
  methods: {

  },

}
</script>
