import React, { useState, useEffect } from 'react';
import { routines as routineAPI } from '@/app/apis/api/routine';
import styles from "@/app/(afterLogin)/_component/addexerciseform.module.css";

interface ExerciseItem {
  exerciseId?: number;
  name: string;
  number: number;
  setTime: number;
  success: boolean;
  weight: number;
}

interface AddExerciseFormProps {
  fwhichDay: number;
  onRefresh: () => void;
}

export default function AddExerciseForm({ fwhichDay, onRefresh }: AddExerciseFormProps) {
  const [exercise, setExercise] = useState<ExerciseItem>({
    name: '',
    setTime: 0,
    number: 0,
    success: false,
    weight: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("추가하기")

  useEffect(() => {
    console.log("전달되는값:",fwhichDay,)
  }, [fwhichDay, exercise]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setExercise(prev => ({ ...prev, [name]: checked }));
    } else {
      const newValue = type === 'number' ? Number(value) : value;
      setExercise(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const toggleForm = () => {
    setButtonText(showForm ? "추가하기" : "숨기기");
    setShowForm(!showForm);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (userId && exercise && fwhichDay !== null) {
      try {
        const parseUserId = parseInt(userId);
        await routineAPI.createExercise(parseUserId, fwhichDay, exercise);
        setExercise({ // API 호출 성공 후 상태 초기화
          name: '',
          number: 0,
          setTime: 0,
          success: false,
          weight: 0,
        });
        onRefresh();

      } catch (error) {
        console.error("운동 추가 실패:", error);
      }
    } else {
      console.error("유효하지 않은 입력값");
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <button onClick={toggleForm} className={styles.submitButton}>
        {
          buttonText==="추가하기" && <img src = "/down_icon.png" style={{width:'40px', height:'40px'}}></img>
        }
        {
          buttonText==="숨기기" && <img src = "/up_icon.png" style={{width:'40px', height:'40px'}}></img>
        }
      </button>
      {buttonText=="숨기기" && (
        <form onSubmit={handleSubmit}>
          <table className={styles.formTable}>
            <thead>
              <tr>
                <th>운동 이름</th>
                <th>세트 수</th>
                <th>횟수</th>
                <th>무게(kg)</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" name="name" value={exercise.name} onChange={handleChange} /></td>
                <td><input type="number" name="setTime" value={exercise.setTime} onChange={handleChange} /></td>
                <td><input type="number" name="number" value={exercise.number} onChange={handleChange} /></td>
                <td><input type="number" name="weight" value={exercise.weight} onChange={handleChange} /></td>
                <td><button type="submit" className={styles.submitButton2}>
                    <img className = {styles.plusBtn} src = "/add_icon.png" style={{width:'30px', height: '30px'}}></img>
                  </button></td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
};
