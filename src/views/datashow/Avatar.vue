<template>
    <div class="unit-avatar">

        <unit-avatar :size="50" :src="circleUrl"></unit-avatar>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    }
}
</script>