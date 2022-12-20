<template>
  <div class="w-full flex flex-col gap-y-2">
    <label class="block text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }} <span v-if="required" class="text-red-700 font-bold">*</span></label>
    <div role="status" v-if="loading">
        <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-twSpin animate-infinite dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    <textarea v-else-if="textarea" rows="5" :value="value" @input="$emit('input', $event.target.value)"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                :placeholder="placeholder ?? label"></textarea>

    <select v-else-if="select.length"  :value="value" @change="$emit('input', $event.target.value)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
      <option selected :value="null">{{ placeholder }}</option>
      <option v-for="(item, index) in select" :key="index" :value="item.id">{{ item.name }}</option>
    </select>

    <div v-else class="relative">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">

        <slot name="icon" :_class="'w-5 h-5'"></slot>

      </div>
      <input :type="inputType" :value="value" @input="$emit('input', $event.target.value)"
        :class="($scopedSlots.icon ? 'pl-10 ' : '') + 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        :placeholder="placeholder ?? label" required>
    </div>
    <p id="helper-text-explanation" v-if="$scopedSlots.helper" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <slot name="helper"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    placeholder: {
      type: String,
    },
    value: [String, Number, Boolean],
    textarea: {
      type: Boolean,
      default() {
        return false
      },
    },
    inputType: {
      type: String,
      default() {
        return 'text'
      }
    },
    select: {
      type: Array,
      default() {
        return []
      }
    },
    required: {
      type: Boolean,
      default() {
        return false
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false
      }
    }

  },
  data () {
    return {
      scopedSlots: this.$scopedSlots,
      slot: this.$slots
    }
  }
}
</script>
