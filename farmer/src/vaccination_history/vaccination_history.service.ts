import { Injectable } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';

@Injectable()
export class VaccinationHistoryService {
  create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    return 'This action adds a new vaccinationHistory';
  }

  findAll() {
    return `This action returns all vaccinationHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccinationHistory`;
  }

  update(id: number, updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    return `This action updates a #${id} vaccinationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccinationHistory`;
  }
}
