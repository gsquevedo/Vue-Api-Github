<template>
    <button :type="type"><slot></slot></button>
</template>

<script>
export default {
    name: "ButtonUser",
    props: {
        type: {
            type: String,
            default: "button",
            required: true
        }
    },
    setup() {
    }
}
</script>
