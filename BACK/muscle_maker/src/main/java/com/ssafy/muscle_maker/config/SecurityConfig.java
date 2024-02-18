package com.ssafy.muscle_maker.config;

import com.ssafy.muscle_maker.jwt.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;


@Configuration
@EnableWebSecurity  //기본적인 Web 보안을 활성화
@EnableMethodSecurity//@PreAythorize 어노테이션을 메소드 단위로 추가
public class SecurityConfig{ //추가적인 설정을 위해 extends
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntityPoint jwtAuthenticationEntityPoint;

    private final CorsFilter corsFilter;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntityPoint jwtAuthenticationEntityPoint, CorsFilter corsFilter, JwtAccessDeniedHandler jwtAccessDeniedHandler){
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntityPoint = jwtAuthenticationEntityPoint;
        this.corsFilter = corsFilter;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable) //SpringSecurity에 default로 적용되어 있는 csrf protection 해제
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling((exceptionConfig)->
                    exceptionConfig
                            .authenticationEntryPoint(jwtAuthenticationEntityPoint)
                            .accessDeniedHandler(jwtAccessDeniedHandler)
                )

                .headers((headerConfig)->
                        headerConfig.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)
                )

                //session을 사용하지 않으므로 세션 설정 변경
                .sessionManagement((sessionManagement)->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )


                //HttpServletRequest를 사용하는 요청들에 대한 접근 제한 설정
                .authorizeHttpRequests((authorizeRequests)->
                    authorizeRequests
                            .requestMatchers("/**").permitAll()
                            .anyRequest().authenticated() //그 외 인증 없이 접근 X
                )
                .oauth2Login((oauth2)->
                        oauth2
                                .defaultSuccessUrl("https://back.muscle-maker.site/users/kakao/callback"))
                .apply(new JwtSecurityConfig(tokenProvider));


        return httpSecurity.build();
    }
}
