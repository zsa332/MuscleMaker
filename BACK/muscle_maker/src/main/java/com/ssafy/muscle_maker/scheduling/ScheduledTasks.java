package com.ssafy.muscle_maker.scheduling;


import java.text.SimpleDateFormat;
import java.util.Date;

import com.ssafy.muscle_maker.service.ClubService;
import com.ssafy.muscle_maker.service.MyRoutineService;
import com.ssafy.muscle_maker.service.RoutineService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ScheduledTasks {

    private final MyRoutineService myRoutineService;
    private final ClubService clubService;

    //매주 월요일
    @Scheduled(cron = "0 0 0 * * 1")
    public void makeRoutineEveryMonday(){
        myRoutineService.makeThisWeekRoutine();
    }

    @Scheduled(cron = "0 0 0 * * *") //매일 오전 12시에
    public void updateClubEveryDay(){
        clubService.updateClubAndCalendar();
    }

}