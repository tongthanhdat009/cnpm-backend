import HocSinhRepo from '../repositories/HocSinhRepo';

export class HocSinhService {
  private repo = HocSinhRepo;

  async getAll() {
    const data = await this.repo.getAll();
    return data;
  }

  async getById(id: number) {
    const data = await this.repo.getById(id);
    return data;
  }

  async getByPhuHuynh(idPhuHuynh: number) {
    const data = await this.repo.getByPhuHuynh(idPhuHuynh);
    return data;
  }
}

export default new HocSinhService();
