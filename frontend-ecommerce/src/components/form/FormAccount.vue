<script setup>
    import { onMounted, ref } from "vue"
    import { useAuthStore } from "@/stores/authStore"
    import axios from "axios"

    const authStore = useAuthStore()
    const formData = ref({
        name: "",
        address: "",
    })
   
    

    onMounted(async () => {
        if (authStore.isLoggedIn) {
            await authStore.getUser()
            formData.value.name = authStore.user?.name || ""
            formData.value.address = authStore.user?.address || ""
        }
    });

    const editProfile= async () => {
        try{
            const token = authStore.token
            const response = await axios.put("http://localhost:9887/api/user/editProfile", formData.value, 
                {   headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }

            )

            authStore.updateUser(response.data.user);

            alert("Profil berhasil diperbarui!");
        }catch(error){
            console.error("Gagal update profil:", error.response?.data || error.message);
        }
    }

    
</script>

<template>
    <div>
        <h2>Selamat Datang, {{ authStore.user.name }}</h2>
        <p>Email: {{ authStore.user.email }}</p>
    </div>

  <form @submit.prevent="editProfile">
    <label for="name">Name</label>
    <input type="text" name="name" v-model="formData.name" :placeholder="authStore.user.name" />

    <label for="address">Addess</label>
    <input type="text" name="address" v-model="formData.address" :placeholder="authStore.user.address"/>

    <button type="submit">Edit</button>
  </form>
</template>
