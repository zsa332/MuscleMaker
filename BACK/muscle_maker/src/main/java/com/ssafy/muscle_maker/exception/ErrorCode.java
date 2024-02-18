package com.ssafy.muscle_maker.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //400 BAD_REQUEST 잘못된 요청
    NO_EXIST(400, "조회할 항목이 없습니다."),

    //사용자
    NO_EXIST_USER(400, "해당 사용자가 없습니다."),
    NOT_MATCH_PASSWORD(400,"기존 비밀번호를 틀렸습니다."),
    DUPLICATE_EMAIL_ID(400, "이메일 아이디가 겹칩니다."),

    //카카오 api 통신
    CANNOT_CONNECT_KAKAO_API(400, "카카오 api 연결 안됨"),

    //클럽
    NO_EXIST_CLUB(400, "해당 클럽이 존재하지 않습니다."),
    ALREADY_IN_CLUB(400, "이미 해당 클럽에 가입/가입 신청되어 있습니다."),
    ALREADY_IN_FOOD_CLUB(400, "해당 사용자는 이미 식단 클럽에 가입/가입 신청했습니다."),
    ALREADY_IN_EXERCISE_CLUB(400, "해당 사용자는 이미 운동 클럽에 가입/가입 신청했습니다."),
    CANNOT_UPDATE_CATEGORY(400, "카테고리 정보는 바꿀 수 없습니다."),
    NOT_APPROPRIATE_AUTHORITY(400, "클럽의 적절한 권한이 아닙니다."),
    NO_EXIST_USER_CLUB(400, "해당 클럽에 해당 멤버가 없습니다."),
    ALREADY_ACHIEVE_TARGET(400, "이미 오늘의 목표를 달성했습니다."),
    ALREADY_SAME_TITLE(400, "이미 같은 이름의 클럽이 있습니다."),
    
    //팔로우
    NOT_EXIST_FOLLOW(400, "팔로우 관계가 아닙니다."),
    ALREADY_FOLLOW(400, "이미 팔로우 관계입니다."),

    //개인목표
    NOT_EXIST_INDIVIDUAL(400, "해당 목표가 존재하지 않습니다."),
    //피드
    NO_AUTHORITY_DELETE(400,"삭제할 권한이 없습니다"),
    NO_FEED_LIST(400, "조회할 수 있는 피드가 없습니다. "),
    FILE_UPLOAD_ERROR(500, "파일 업로드에 실패하였습니다."),
    // 피드 댓글
    NO_FEED_COMMENT(204, "수정할 댓글이 존재하지 않습니다."),

    //루틴
    NO_SETTING_ROUTINE(400, "해당 루틴은 수정 가능한 루틴이 아닙니다."),
    CANNOT_CHANGE_SETTING_ROUTINE(400, "세팅 루틴은 완료 표시 불가능합니다."),

    // 알림
    NOT_EXIST_NOTIFICATION(204, "해당 알림이 존재하지 않습니다.");

    private final int status;
    private final String message;
}
