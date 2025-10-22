import DiemDungRepo from '../repositories/DiemDungRepo';

export class DiemDungService {
  private repo = DiemDungRepo;

  async getAll() {
    const data = await this.repo.getAll();
    return data;
  }

  async getById(id: number) {
    const data = await this.repo.getById(id);
    return data;
  }
}

export default new DiemDungService();
