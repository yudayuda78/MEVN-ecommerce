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
     
        
        res.status(200).json({data})
    }catch(error){
        console.log(error)
    }
}