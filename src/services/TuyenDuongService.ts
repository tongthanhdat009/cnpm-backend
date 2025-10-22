import { TuyenDuongRepo } from "../repositories/TuyenDuongRepo";

export class TuyenDuongService {
  private repo: TuyenDuongRepo;

  constructor() {
    this.repo = new TuyenDuongRepo();
  }

  async getAll() {
    const result = await this.repo.getAll();
    return result;
  }
  async create(data: any) {
    if (data.tuyen_duong_diem_dungs.length <= 1) {
      throw new Error("Danh sách điểm dừng không được để trống");
    }
    const result = await this.repo.create(data);
    return result;
  }

}
export default new TuyenDuongService();