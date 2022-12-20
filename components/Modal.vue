<!-- Please remove this file from your project -->
<template>
  <transition enter-active-class="animate-fadeIn animate-duration-300"
    leave-active-class="animate-fadeOut animate-duration-300">
    <div v-if="show" class="fixed top-0 right-0 left-0 bottom-0 flex z-50 bg-black/50 justify-center items-center">
      <!-- Modal content -->
      <transition>
      <div v-click-outside="clickOut"
        class="relative p-4 max-w-sm text-center w-full bg-white rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
        <button type="button" @click="$emit('close')"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="successModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div :class="classIcon">
          <svg v-if="type == 'success'" aria-hidden="true" class="w-8 h-8 text-white dark:text-success"
            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="type == 'warning'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-warning-content dark:text-warning">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <svg v-else-if="type == 'error'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-error-content dark:text-error">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8 text-primary-600 dark:text-primary-200">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>



          <span class="sr-only">{{ title }}</span>
        </div>
        <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</p>
        <button @click="$emit('action')" type="button"
          class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900">
          {{ actionText }}
        </button>
      </div>
    </transition>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Modal',
  transitions: ['modal','modalWrapper'],
  data () {
    return {
      //
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
      validator: function (value) {
        // The value must match one of these strings
        return ['success', 'error', 'warning'].includes(value)
      }
    },
    actionText: {
      type: String,
      default: "Tiếp tục"
    },
    title: {
      type: String,
      required: true,
    }
  },
  computed: {
    classIcon: function () {
      switch (this.type) {
        case 'success':
          return "w-12 h-12 rounded-full bg-success dark:bg-success-content p-2 flex items-center justify-center mx-auto mb-3.5";
        case 'warning':
          return "w-12 h-12 rounded-full bg-warning dark:bg-warning-content p-2 flex items-center justify-center mx-auto mb-3.5";
        case 'error':
          return "w-12 h-12 rounded-full bg-error dark:bg-error-content p-2 flex items-center justify-center mx-auto mb-3.5";

        default:
          return "w-12 h-12 rounded-full bg-primary dark:bg-primary-900 p-2 flex items-center justify-center mx-auto mb-3.5";
      }
    }
  },
  methods: {
    clickOut() {
      this.$emit('close')
    }
  }
}
</script>


<style>
.modal-enter-active {
  animation: flipInY 0.3s;
}

.modal-leave-active {
  animation: flipOutY 0.3s;
}

.modalWrapper-enter-active {
  animation: fadeIn 0.3s;
}

.modalWrapper-leave-active {
  animation: fadeOut 0.3s;
}
</style>
