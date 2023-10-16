import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VaccinationHistory, VaccinationHistoryDocument } from './schemas/vaccination_history.schema';
import { Model } from 'mongoose';
import { Worker } from '../worker/schemas/worker.schema';
import { Animal } from '../animal/schemas/animal.schema';
import { Vaccine } from '../vaccine/schemas/vaccine.schema';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(VaccinationHistory.name) private readonly vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
    @InjectModel(Worker.name) private readonly workerModel: Model<Worker>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(Vaccine.name) private readonly vaccineModel: Model<Vaccine>,
  ) {}


  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    const {worker_id, animal_id, vaccine_id} = createVaccinationHistoryDto;
    
    const worker = await this.workerModel.findById(worker_id);
    if (!worker) { throw new BadRequestException('Worker not found'); }
    const animal = await this.animalModel.findById(animal_id);
    if (!animal) { throw new BadRequestException('Animal not found'); }
    const vaccine = await this.vaccineModel.findById(vaccine_id);
    if (!vaccine) { throw new BadRequestException('Vaccine not found')}

    const vaccinationHistory = await this.vaccinationHistoryModel.create(createVaccinationHistoryDto);
    worker.vaccination_history.push(vaccinationHistory);
    worker.save();
    animal.vaccination_history.push(vaccinationHistory);
    animal.save();
    vaccine.vaccination_history.push(vaccinationHistory);
    vaccine.save();
    return vaccinationHistory;
  }

  findAll() {
    return this.vaccinationHistoryModel.find().populate('animal_id').populate('vaccine_id').populate('worker_id');
  }

  findOne(id: number) {
    return this.vaccinationHistoryModel.findById(id).populate('animal_id').populate('vaccine_id').populate('worker_id');
  }

  update(id: number, updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    return this.vaccinationHistoryModel.findByIdAndUpdate(id, updateVaccinationHistoryDto, {new: true});
  }

  remove(id: number) {
    return this.vaccinationHistoryModel.findByIdAndRemove(id);
  }
}
