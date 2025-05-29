import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useSettingStore = defineStore('setting', () => {

    const dataSetting = ref("")
    const title = ref("")

    const getData = async () => {
        try{
            const response = await axios.get("http://localhost:9887/api/setting/getsetting")
            dataSetting.value = response.data.data
            
        }catch(error){
            console.log(error)
        }
    }

    const getTitle =  async () =>{
        try{
            const response = await axios.get("http://localhost:9887/api/setting/getsetting")
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

    const getIcon = async(icon) =>{
        const url = `http://localhost:9887/settings/${icon}`
        let link = document.querySelector("link[rel~='icon']")
        if (!link) {
            link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)}
        link.href = url
    }

    return {
        dataSetting,
        getData,
        title,
        getTitle,
        getIcon
    }

})