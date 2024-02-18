package com.ssafy.muscle_maker.controller;

import com.amazonaws.Response;
import com.ssafy.muscle_maker.controller.constants.Message;
import com.ssafy.muscle_maker.dto.kakao.KakaoProfileDto;
import com.ssafy.muscle_maker.dto.kakao.KakaoUserInfoDto;
import com.ssafy.muscle_maker.dto.kakao.OAuthTokenDto;
import com.ssafy.muscle_maker.dto.clubs.request.ClubLeaderRequest;
import com.ssafy.muscle_maker.dto.clubs.request.ClubTransitRequest;
import com.ssafy.muscle_maker.dto.users.LoginDto;
import com.ssafy.muscle_maker.dto.users.TokenDto;
import com.ssafy.muscle_maker.dto.users.UserDto;
import com.ssafy.muscle_maker.dto.users.request.ModifyPasswordRequest;
import com.ssafy.muscle_maker.dto.users.request.UserInfoRequest;
import com.ssafy.muscle_maker.dto.users.response.loginDto;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.jwt.JwtFilter;
import com.ssafy.muscle_maker.jwt.TokenProvider;
import com.ssafy.muscle_maker.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final ClubService clubService;
    private final UserClubService userClubService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MyRoutineService myRoutineService;
    private final BasketService basketService;

    public UserController(UserService userService, ClubService clubService, UserClubService userClubService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, MyRoutineService myRoutineService, BasketService basketService) {
        this.userService = userService;
        this.clubService = clubService;
        this.userClubService = userClubService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.myRoutineService = myRoutineService;
        this.basketService = basketService;
    }

    @PostMapping("/join")
    public ResponseEntity signup(
            @Valid @RequestBody UserDto userDto
    ) {
        //UserDto에 userId 넣어서 보내도록 수정
        UserDto ret = userService.signup(userDto);
        myRoutineService.createBlankRoutineAndMyRoutineWhenSignUp(ret.getUserId());
        basketService.createBasketWhenSignUp(ret.getUserId());
        return ResponseEntity.ok(ret);
    }

    @GetMapping("/search")
    public ResponseEntity<Message> searchUser(@RequestParam String keyword){
        Map<String,Object> map = new HashMap<>();
        map.put( "users",userService.searchUser(keyword));
        return ResponseEntity.status(HttpStatus.OK).body(new Message("성공적으로 피드 검색을 하였습니다.", map));
    }

   @PostMapping("/login")
    public ResponseEntity authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmailId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if(!authentication.isAuthenticated()) return ResponseEntity.status(400).body("아이디/비밀번호를 잘못 입력하셨습니다.");

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        int userId = userService.getUserId(loginDto.getEmailId());
        loginDto logindto = new loginDto(jwt,userId);
        return new ResponseEntity<>(logindto, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/clubs")
    public ResponseEntity<Message> getClubsContainingUser(@RequestParam("userId") int userId){
        Message message = new Message("사용자가 속한 클럽 조회에 성공했습니다.", clubService.getClubsContainMember(userId));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/clubs/join")
    public ResponseEntity<Message> applyClub(@RequestBody ClubTransitRequest clubTransitRequest){
        userClubService.applyClub(clubTransitRequest.getUserId(), clubTransitRequest.getClubId());
        Message message = new Message("클럽에 가입 신청을 완료했습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/clubs/leave")
    public ResponseEntity<Message> leaveClub(@RequestHeader("clubId") int clubId, @RequestHeader("userId") int userId){
        userClubService.leaveClub(userId, clubId);

        Message message = new Message("클럽 탈퇴를 완료했습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/clubs/join/{clubId}")
    public ResponseEntity<Message> acceptClubMember(@PathVariable int clubId, @RequestBody ClubLeaderRequest clubLeaderRequest){
        userClubService.acceptClubMember(clubLeaderRequest, clubId);
        Message message = new Message("해당 사용자의 가입을 승낙했습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @DeleteMapping("/clubs/join/{clubId}")
    public ResponseEntity<Message> refuseClubMember(@PathVariable int clubId, @RequestHeader("leaderId") int leaderId, @RequestHeader("memberId") int memberId){
        userClubService.refuseClubMember(leaderId, memberId, clubId);
        Message message = new Message("해당 사용자의 가입을 거절했습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/clubs/fire/{clubId}")
    public ResponseEntity<Message> fireClubMember(@PathVariable int clubId, @RequestHeader("leaderId") int leaderId, @RequestHeader("memberId") int memberId){
        userClubService.fireClubMember(leaderId, memberId, clubId);
        Message message = new Message("해당 사용자를 탈퇴시켰습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/clubs/target")
    public ResponseEntity<Message> achieveTarget(@RequestBody ClubTransitRequest clubTransitRequest){
        userClubService.achieveTarget( clubTransitRequest.getUserId(), clubTransitRequest.getClubId());

        Message message = new Message("해당 클럽에서 해당 멤버가 목표를 성취했습니다!");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    //jwt 테스팅 코드
    @GetMapping("/info")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Message> getUserInfo(HttpServletRequest request){
        Message message = new Message("사용자 정보 조회에 성공했습니다.");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Message> getMyUserInfo() {
        return ResponseEntity.ok(new Message("사용자 기본 정보 조회에 성공했습니다.",userService.getCurrentUserInfo()));
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Message> updateUserInfo(@RequestPart(value = "userInfoRequest") UserInfoRequest userInfoRequest,
                                                  @RequestPart(value = "img", required = false) MultipartFile img) throws IOException {
        return ResponseEntity.ok(new Message("개인 정보 수정에 성공했습니다.", userService.updateUserInfo(userInfoRequest, img)));
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Message> updatePassword(@RequestBody ModifyPasswordRequest modifyPasswordRequest){
        userService.updatePassword(modifyPasswordRequest);
        return ResponseEntity.ok(new Message("비밀번호 변경에 성공했습니다."));
    }

    //이 api로 들어오면 인증 완료 된 것
    @GetMapping("/kakao/callback")
    public ResponseEntity<Message> kakaoCallBack(String code) throws IOException, URISyntaxException {
        String token = getKakaoToken(code).getAccess_token();
        KakaoUserInfoDto kakaoUserInfoDto = getKakaoUserInfo(token);

        //회원 가입이 되어 있지 않다면 회원 상세 페이지로 redirect -- 이부분 아직 안짬
        if(!userService.isAlreadyRegistered(kakaoUserInfoDto)){
           // HttpHeaders httpHeaders = new HttpHeaders();

            return new ResponseEntity<>(new Message("이제 상세 정보 입력 후 회원 가입해야 함", token), HttpStatus.OK);
        }

        Message message = new Message("로그인 완료",getTokenFromKakao(kakaoUserInfoDto));
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
    // 카카오 로그인 완료시
    // 1. 회원 정보가 기존에 남아 있는 경우 : 토큰을 프론트 엔드로 보내줌 + 바로 로그인
    // 2. 회원 정보가 기존에 없는 경우 : 토큰을 프론트 엔드로 보내줌 + 상세 페이지로 이동
        // 2-1. 상세 정보+ 토큰을 /auth/kakao/join 으로 보내줌

    // 로그인 실패시 로그인 페이지로 이동 !

    @PostMapping("/kakao/join")
    public ResponseEntity<Message> joinKakaoUser(@RequestBody UserInfoRequest userInfoRequest, @RequestHeader String token){
        KakaoUserInfoDto kakaoUserInfoDto = getKakaoUserInfo(token);

        return signup(UserDto.builder()
                .emailId(kakaoUserInfoDto.getEmailId())
                .password(kakaoUserInfoDto.getPassword())
                .name(userInfoRequest.getName())
                .nickname(userInfoRequest.getNickname())
                .age(userInfoRequest.getAge())
                .height(userInfoRequest.getHeight())
                .weight(userInfoRequest.getWeight())
                .address(userInfoRequest.getAddress())
                .gender(userInfoRequest.getGender())
                .image(userInfoRequest.getImage())
                .build());
    }

    public OAuthTokenDto getKakaoToken(String code) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
        param.add("grant_type", "authorization_code");
        param.add("client_id", "f7054ff4270562c55c1ab6082aafe08f");
        param.add("redirect_uri", "https://back.muscle-maker.site/users/kakao/callback");
        param.add("code", code);

        HttpEntity<MultiValueMap<String, String> > kakaoTokenRequest =
                new HttpEntity<>(param, httpHeaders);

        ResponseEntity<OAuthTokenDto> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                OAuthTokenDto.class
        );

        return response.getBody();
    }

    //oAuthTokenDto.getAccess_token() 파라미터
    public KakaoUserInfoDto getKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        httpHeaders.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String> > kakaoProfileToken =
                new HttpEntity<>(httpHeaders);

        ResponseEntity<KakaoProfileDto> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileToken,
                KakaoProfileDto.class
        );

        if(response.getBody() == null) throw new CustomException(ErrorCode.CANNOT_CONNECT_KAKAO_API);

        return KakaoUserInfoDto.builder()
                .emailId(response.getBody().getId()+"@musclemaker.com")
                .image(response.getBody().getProperties().getProfileImage())
                .nickname(response.getBody().getProperties().getNickname())
                .password("asdf1234")//나중에 암호화된 우리만의 코드로 바꾸기
                .build();
    }

    public String getTokenFromKakao(KakaoUserInfoDto kakaoUserInfoDto){
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(kakaoUserInfoDto.getEmailId(), "asdf1234");

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if(!authentication.isAuthenticated()) throw new CustomException(ErrorCode.NO_EXIST_USER);

        return tokenProvider.createToken(authentication);
    }
}
