import HocSinhRepo from '../repositories/HocSinhRepo';

class HocSinhService {
  private repo = HocSinhRepo;

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id: number) {
    return await this.repo.getById(id);
  }

  async getByPhuHuynh(idPhuHuynh: number) {
    return await this.repo.getByPhuHuynh(idPhuHuynh);
  }

  async create(data: any) {
    return await this.repo.create(data);
  }

  async update(id: number, data: any) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error('Học sinh không tồn tại');
    }
    return await this.repo.update(id, data);
  }

  async delete(id: number) {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error('Học sinh không tồn tại');
    }
    return await this.repo.delete(id);
  }
}

export default new HocSinhService();
