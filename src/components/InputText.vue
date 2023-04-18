<template>
    <input v-model="inputValue" type="type" :placeholder="placeholder">
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        type: {
            type: String,
            default: "text",
            required: true
        },
        placeholder: {
            type: String
        },
    },
    setup() {
       const inputValue = ref("");
    
       return{
            inputValue
        };
    }
}
</script>