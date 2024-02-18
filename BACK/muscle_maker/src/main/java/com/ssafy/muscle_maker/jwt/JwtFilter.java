package com.ssafy.muscle_maker.jwt;


import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.logging.Logger;

import static org.hibernate.query.sqm.tree.SqmNode.log;

//JWT를 위한 커스텀 필터
public class JwtFilter extends GenericFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private TokenProvider tokenProvider;


    public JwtFilter(TokenProvider tokenProvider){
        this.tokenProvider = tokenProvider;
    }

    //실제 필터링 로직을 작성하는 메소드
    //토큰의 인증 정보를 SecurityContext에 저장하는 역할 수행
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String jwt = resolveToken(httpServletRequest); //resolveToken을 통해 토큰을 받아옴
        String requestURI = httpServletRequest.getRequestURI();

        //토큰의 유효성 검증을 하고 정상 토큰이면 SecurityContext에 저장
        if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)){
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Security Context에 "+authentication.getName()+" 인증 정보를 저장했습니다. uri : "+ requestURI);
        }
        else{
            log.info("유효한 JWT 토큰이 있습니다. uri :" + requestURI);
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    //Request Header에서 토큰 정보를 꺼내오기 위한 메소드
    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) return bearerToken.substring(7);
        return null;
    }
}
