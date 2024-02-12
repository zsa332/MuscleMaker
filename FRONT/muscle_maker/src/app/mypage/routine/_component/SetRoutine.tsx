"use client";

import React, { useState, useEffect } from "react";
import AddExerciseForm from "./AddExerciseForm";
import WeekRoutines from "./WeekRoutines";


export default function RoutinesPage() {
  return (
    <div>
      <AddExerciseForm/>
      <h1>내 루틴 관리</h1>
      <WeekRoutines />
    </div>
  );

}
