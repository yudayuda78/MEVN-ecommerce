import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useSettingStore = defineStore('setting', () => {

    const title = ref("")

    const getSetting =  async () =>{
        try{
            const response = await axios.get("http://localhost:9887/api/setting/getsetting");
            const settings = response.data.data;

            if (settings.title) {
                title.value = settings.title;
            document.title = title.value;
            } else {
                console.warn("Title tidak ditemukan di response");
            }
        }catch(error){
            console.error("Gagal mengambil setting:", error)
        }
    }

    return {
        title,
        getSetting
    }

})