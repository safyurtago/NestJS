export class CreateVaccinationHistoryDto {
  animal_id: string;
  vaccine_id: string;
  date: Date;
  next_date: Date;
  photo_url: string;
  worker_id: string;
}
