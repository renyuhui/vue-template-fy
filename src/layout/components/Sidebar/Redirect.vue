<template>
</template>
<script>
    export default {
        name: 'Redirect',
        beforeCreate() {
            const { query } = this.$route
            const path = query.path
            this.$router.replace({ path: path })
        },
        mounted() {},
        render: function(h) {
            return h() // avoid warning message
        }
    }

    // export default {
    //     name: 'Redirect',
    //     created() {
    //         const path = this.$router.currentRoute.params;
    //         this.$router.push(path);
    //     }
    // };
</script>