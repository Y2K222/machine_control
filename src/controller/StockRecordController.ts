import { StockRecords } from "../model/StockRecord";

class StockRecordController {
    async getInfo(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId();
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        let stockRecord = new StockRecords(req.params.id)
        try {
            let data = await stockRecord.getInfo()
            res.status(200).json(data)
        } catch (error:any) {
            res.status(500).json(error)
        }
    }

    async updateInfo(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("from" ,"from should not be empty").notEmpty()
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("totalInstock","totalInstock must be number").isInt()
        req.checkBody("unit","unit should not be empty").notEmpty()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        try {
            let stockRecord = new StockRecords(req.params.id)
            let data = await stockRecord.updateInfo(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        try {
            let stockRecord = new StockRecords(req.params.id)
            let data = await stockRecord.delete()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export { StockRecordController}