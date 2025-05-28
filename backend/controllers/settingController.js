import Setting from '../models/Setting.js'

export const getSetting = async (req, res) => {
    try{
        const setting = await Setting.find()
        res.status(200).json({data : setting})
    }catch(error){
        console.log(error)
    }
}