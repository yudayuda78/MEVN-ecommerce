<script setup>
    import { onMounted, ref } from "vue";
    import { useAuthStore } from "@/stores/authStore";

    const authStore = useAuthStore()
   
    

    onMounted(async () => {
        if (authStore.isLoggedIn) {
            await authStore.getUser();
        }
    });

    
</script>

<template>
    <div>
        <h2>Selamat Datang, {{ authStore.user.name }}</h2>
        <p>Email: {{ authStore.user.email }}</p>
    </div>

  <form>
    <label for="name">Name</label>
    <input type="text" name="name" :placeholder="authStore.user.name" />

    <label for="address">Addess</label>
    <input type="text" name="address" :placeholder="authStore.user.address"/>

    <button type="submit">Edit</button>
  </form>
</template>
