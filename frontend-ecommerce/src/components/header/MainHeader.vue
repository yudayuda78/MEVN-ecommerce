<template>
    <div class="main-header-container">
        <div class="main-header">
            <RouterLink class="main-header-logo">
                <img :src="MainHeader" alt="Logo" />
            </RouterLink>
            
        </div>
    </div>
</template>

<script setup>
import MainHeader from '@/assets/mainheader.webp'
import { RouterLink } from 'vue-router';

</script>

<style scoped>
.main-header-container{
    margin-top: 20px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    /* border-radius: 10px; */
    /* margin: auto; */
    /* background-color: aqua; */
}

.main-header{
    width: 80%;
    margin: auto;
    height: 490px;
   
    /* background-color: antiquewhite; */
}

.main-header-logo img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

</style>