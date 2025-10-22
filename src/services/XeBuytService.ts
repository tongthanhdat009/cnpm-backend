import { XeBuytRepository } from "../repositories/XeBuytRepo";
export class XeBuytService {
    private repo: XeBuytRepository;
    constructor() {
        this.repo = new XeBuytRepository();
    }
    
    async getAllXeBuyt(){
        try {
            const xeBuyts = await this.repo.getAllXeBuyt();
            return {
                success: true,
                message: "Lấy danh sách xe buýt thành công",
                data: xeBuyts,
                total: xeBuyts.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách xe buýt",
                error: error.message
            };
        }
    }

    async getXeBuytById(id: number){
        try{
            const xeBuyt = await this.repo.getXeBuytById(id);
            return {
                success: true,
                message: "Lấy thông tin xe buýt thành công",
                data: xeBuyt
            };
        } catch (error: any){
            return {
                success: false,
                message: "Lỗi khi lấy thông tin xe buýt",
                error: error.message
            }
        }
    }
}