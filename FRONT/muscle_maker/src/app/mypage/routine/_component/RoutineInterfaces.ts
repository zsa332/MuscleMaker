export interface Exercise {
  exerciseId: number;
  name: string;
  setTime: number;
  number: number;
  success: boolean;
  weight: string | null;
}

export interface Routine {
  myRoutineId: number;
  title: string;
  whichDay: number;
  exerciseResponseList: Exercise[];
}
