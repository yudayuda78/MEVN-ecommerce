<template>
    <div class="lastest-card-container">
        <div class="lastest-card">
            <h3>Lastest</h3>
            <div class="card-container">
                <div class="card"><RouterLink><img :src="New1" alt=""></RouterLink></div>
                <div class="card"><RouterLink><img :src="New2" alt=""></RouterLink></div>
                <div class="card"><RouterLink><img :src="New3" alt=""></RouterLink></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import New1 from '@/assets/new1.webp'
    import New2 from '@/assets/new2.webp'
    import New3 from '@/assets/new3.webp'

</script>

<style>
    .lastest-card-container{
    margin-top: 20px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    /* border-radius: 10px; */
    /* margin: auto; */
    /* background-color: aqua; */
}

.lastest-card{
    width: 80%;
    margin: auto;
    height: 500px;
   
    /* background-color: antiquewhite; */
}

.card-container{
    margin-top: 10px;
    width: 100%;
    height: 450px;
    /* background-color: brown; */
    display: flex;
    justify-content: space-between;
}

.card{
    width: 30%;
    height: 450px;
    /* background-color: bisque; */
    display: flex;
}

.card img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
</style>