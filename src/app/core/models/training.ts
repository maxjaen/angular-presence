import { TrainingType } from './enums';
import { Exercise } from './exercise';

export class Training {
  id: number;
  date: Date;
  description: string;
  exercises: Exercise[];
  type: TrainingType;
}
