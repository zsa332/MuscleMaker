package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.individualGoals.request.IndividualGoalUpdateRequest;
import com.ssafy.muscle_maker.dto.individualGoals.request.IndividualGoalWriteRequest;
import com.ssafy.muscle_maker.dto.individualGoals.response.IndividualGoalResponse;
import com.ssafy.muscle_maker.entity.IndividualGoal;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.IndividualGoalRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IndividualGoalService {

    private final IndividualGoalRepository individualGoalRepository;
    private final UserRepository userRepository;


    @Transactional
    public IndividualGoal saveIndividualGoal(IndividualGoal individualGoal){
         return individualGoalRepository.save(individualGoal);
    }

    public IndividualGoalResponse writeIndividualGoal(int userId, IndividualGoalWriteRequest request){
        User user = userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()->new CustomException(ErrorCode.NO_EXIST_USER));
        IndividualGoal individualGoal = IndividualGoal.builder()
                .diet(request.isDiet())
                .fat(request.getFat())
                .kg(request.getKg())
                .muscle(request.getMuscle())
                .user(user)
                .build();
        individualGoalRepository.save(individualGoal);
        IndividualGoalResponse response = new IndividualGoalResponse();
        return response.toDTO(individualGoal);
    }

    public List<IndividualGoalResponse> findUserIndividualGoal(int userId){
        User user = userRepository.findByUserIdAndFlagFalse(userId).orElseThrow(()-> new CustomException(ErrorCode.NO_EXIST_USER));
        List<IndividualGoal> individualGoals = individualGoalRepository.findByUserAndFlagFalse(user);
        List<IndividualGoalResponse> responses = new ArrayList<>();
        for(IndividualGoal individualGoal : individualGoals){
            IndividualGoalResponse response = new IndividualGoalResponse();
            response = response.toDTO(individualGoal);
            responses.add(response);
        }
        return responses;
    }

    @Transactional
    public IndividualGoalResponse updateIndividualGoal(int individualGoalId, IndividualGoalUpdateRequest request){
       IndividualGoal individualGoal = individualGoalRepository.findById(individualGoalId).orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_INDIVIDUAL));
       individualGoal.update(request.getKg(), request.getMuscle(), request.getFat(), request.isDiet());
       individualGoalRepository.save(individualGoal);
       IndividualGoalResponse response = new IndividualGoalResponse();
       response = response.toDTO(individualGoal);
       return response;
    }


    @Transactional
    public void deleteIndividualGoal(int individualGoalId){
        IndividualGoal individualGoal = individualGoalRepository.findById(individualGoalId).orElseThrow(()-> new CustomException(ErrorCode.NOT_EXIST_INDIVIDUAL));
        individualGoal.setFlag(true);
        individualGoalRepository.save(individualGoal);
    }




}
