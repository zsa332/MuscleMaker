// store/useExerciseStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

interface ExerciseState {
  addExercise: (
    userId: number,
    whichDay: number,
    exercise: ExerciseInput
  ) => Promise<void>;
  fetchWeekRoutines: (userId: number) => Promise<void>;
  routines: any[]; // 더 구체적인 타입으로 대체 가능
}

interface ExerciseInput {
  name: string;
  setTime: number;
  number: number;
  success: boolean;
  weight: number;
  type: boolean;
}

// const baseURL = 'http://localhost:8080/'
    
const baseURL = "https://back.muscle-maker.site/"

export const useExerciseStore = create<ExerciseState>()(
  devtools((set, get) => ({
    routines: [],
    addExercise: async (
      userId: number,
      whichDay: number,
      exercise: ExerciseInput
    ) => {
      try {
        const response = await axios.post(
          `${baseURL}routines/settings/exercises`,
          exercise,
          {
            params: { userId, whichDay },
          }
        );
        console.log("Exercise added:", response.data);
        // 운동 추가 후 루틴 목록 새로고침
        await get().fetchWeekRoutines(userId);
      } catch (error) {
        console.error("Error adding exercise:", error);
      }
    },
    fetchWeekRoutines: async (userId: number) => {
      try {
        const response = await axios.get(`${baseURL}routines`, {
          params: { userId },
        });
        console.log("find:", response.data);
        set({ routines: response.data.data });
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    },
  }))
);
