<template>
    <input 
        class="p-1 border rounded-md w-full focus:ring-2 ring-purple-600 outline-none" 
        :placeholder="placeHolder" 
        v-model="modelValue" 
        :type="type" 
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
export default {
    props: {
        placeHolder: {
            default: "Insert",
        },
        modelValue: {
            default: "",
        },
        type: {
            default: "text",
        }
    },
}
</script>
