package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.dto.inBody.request.*;
import com.ssafy.muscle_maker.dto.inBody.response.FindInBodyResponse;
import com.ssafy.muscle_maker.entity.InBody;
import com.ssafy.muscle_maker.entity.User;
import com.ssafy.muscle_maker.repository.InBodyRepository;
import com.ssafy.muscle_maker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InBodyService {

    private final InBodyRepository inBodyRepository;
    private final UserRepository userRepository;

    @Transactional
    public void saveInBody(InBody inBody){
        inBodyRepository.save(inBody);
    }

    public User findUserById(int userId){
        return userRepository.findById(userId).orElseThrow();
    }
    public InBody findInBodyById(int inBodyId){return inBodyRepository.findById(inBodyId).orElseThrow(); }

    //인바디 추가
    @Transactional
    public List<FindInBodyResponse> createInBody(int userId, CreateInBodyRequest request){
        User user = findUserById(userId);
        InBody inBody = InBody.builder()
                .weight(request.getWeight())
                .fatMass(request.getFatMass())
                .muscleMass(request.getMuscleMass())
                .user(user)
                .build();
        saveInBody(inBody);

        List<FindInBodyResponse> responses = findInBodyList(userId);
        return responses;
    }

    public List<FindInBodyResponse> findInBodyList(int userId){
        User user = findUserById(userId);
        List<FindInBodyResponse> responses = new ArrayList<>();
        for(InBody i : user.getInBodies()){
            FindInBodyResponse response = FindInBodyResponse.builder().
                    muscleMass(i.getMuscleMass()).
                    inBodyId(i.getInBodyId())
                    .weight(i.getWeight())
                    .fatMass(i.getFatMass())
                    .createdAt(i.getCreatedAt())
                    .modifiedAt(i.getModifiedAt())
                    .build();
            responses.add(response);
        }

        return responses;
    }

    public FindInBodyResponse modifyInBody(int inBodyId, UpdateInBodyRequest request){
        InBody inBody = findInBodyById(inBodyId);

        inBody.setFatMass(request.getFatMass());
        inBody.setWeight(request.getWeight());
        inBody.setMuscleMass(request.getMuscleMass());

        saveInBody(inBody);

        FindInBodyResponse inBodyResponse = FindInBodyResponse.builder()
                .inBodyId(inBody.getInBodyId())
                .modifiedAt(inBody.getModifiedAt())
                .createdAt(inBody.getCreatedAt())
                .fatMass(inBody.getFatMass())
                .muscleMass(inBody.getMuscleMass())
                .weight(inBody.getWeight())
                .build();

        return inBodyResponse;
    }

}
//    private final InBodyRepository inBodyRepository;
//    private final UserRepository userRepository;
//
//    @Transactional
//    public void saveInBody(InBody inBody){
//        inBodyRepository.save(inBody);
//    }
//
//    public User findUserById(Long userId){
//        return userRepository.findById(userId).orElseThrow();
//    }
//    public InBody findInBodyById(Long inBodyId){return inBodyRepository.findById(inBodyId).orElseThrow(); }
//
//    //인바디 추가
//    @Transactional
//    public List<FindInBodyResponse> createInBody(Long userId, CreateInBodyRequest request){
//        User user = findUserById(userId);
//        InBody inBody = InBody.builder()
//                .weight(Double.valueOf(request.getWeight()))
//                .fatMass(Double.valueOf(request.getFatMass()))
//                .muscleMass(Double.valueOf(request.getMuscleMass()))
//                .user(user)
//                .build();
//        saveInBody(inBody);
//
//        List<FindInBodyResponse> responses = findInBodyList(userId);
//        return responses;
//    }
//
////    public List<FindInBodyResponse> findInBodyList(Long userId){
////        User user = findUserById(userId);
////        List<FindInBodyResponse> responses = new ArrayList<>();
////        for(InBody i : user.getInBodies()){
////            FindInBodyResponse response = FindInBodyResponse.builder().
////                    muscleMass(i.getMuscleMass()).
////                    inBodyId(i.getInBodyId())
////                    .weight(i.getWeight())
////                    .fatMass(i.getFatMass())
////                    .createdAt(i.getCreatedAt())
////                    .modifiedAt(i.getModifiedAt())
////                    .build();
////            responses.add(response);
////        }
//
//        return responses;
//    }
//
//    public FindInBodyResponse modifyInBody(Long inBodyId, UpdateInBodyRequest request){
//        InBody inBody = findInBodyById(inBodyId);
//
//        inBody.setFatMass(request.getFatMass());
//        inBody.setWeight(request.getWeight());
//        inBody.setMuscleMass(request.getMuscleMass());
//
//        saveInBody(inBody);
//
//        FindInBodyResponse inBodyResponse = FindInBodyResponse.builder()
//                .inBodyId(inBody.getInBodyId())
//                .modifiedAt(inBody.getModifiedAt())
//                .createdAt(inBody.getCreatedAt())
//                .fatMass(inBody.getFatMass())
//                .muscleMass(inBody.getMuscleMass())
//                .weight(inBody.getWeight())
//                .build();
//
//        return inBodyResponse;
//    }
//
//}
