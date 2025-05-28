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