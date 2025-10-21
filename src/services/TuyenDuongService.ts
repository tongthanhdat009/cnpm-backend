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
}
