import React from 'react';
import RoutineList from './RoutineList';

const RoutinesPage: React.FC = () => {
    return (
        <div>
            <h1>내 루틴 관리</h1>
            <RoutineList />
        </div>
    );
};

export default RoutinesPage;
