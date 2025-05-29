import Setting from '../models/Setting.js'

export const getSetting = async (req, res) => {
    try{
        const setting = await Setting.find()
        const result = {};
        setting.forEach(item => {
            result[item.key] = item.value;
        }); 
        res.status(200).json({data : result})
    }catch(error){
        console.log(error)
    }
}

export const updateSetting = async(req, res) => {
    try{
        const {brand, themeColor} = req.body
        const data = {
            brand,
            themeColor
        }

        const brandSetting = await Setting.findOne({ key: 'title' });
        if (brandSetting) {
            brandSetting.value = brand;
            await brandSetting.save();
        }

        const colorSetting = await Setting.findOne({ key: 'themeColor' });
        if (colorSetting) {
            colorSetting.value = themeColor;
            await colorSetting.save();
        }

        const files = req.files
        if (files.icon) {
            const iconSetting = await Setting.findOne({ key: 'icon' })
        if (iconSetting) {
            iconSetting.value = files.icon[0].filename
            await iconSetting.save()
            }
        }

        if (files.logo) {
        const logoSetting = await Setting.findOne({ key: 'logo' })
        if (logoSetting) {
        logoSetting.value = files.logo[0].filename
        await logoSetting.save()
      }
    }
     
        
        res.status(200).json({data})
    }catch(error){
        console.log(error)
    }
}