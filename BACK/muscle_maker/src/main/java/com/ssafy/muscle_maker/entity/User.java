package com.ssafy.muscle_maker.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseTime{

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(name = "email_id", length = 50, unique = true)
    private String emailId;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "address", length = 50)
    private String address;

    @Column(name = "height")
    @Builder.Default
    private int height = 0;

    @Column(name = "weight")
    @Builder.Default
    private int weight = 0;

    @Column(name = "age")
    @Builder.Default
    private int age = 0;

    @Column(name = "gender")
    @Builder.Default
    private boolean gender = false; // false 남자 true 여자

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "activated")
    @Builder.Default
    private boolean activated = true; // 활성화 되어 있어야 jwt 토큰을 보내 줄 때 객체를 만들 수 있음

    @Column(name = "exercise_club")
    @Builder.Default
    private boolean exerciseClub = false;

    @Column(name = "food_club")
    @Builder.Default
    private boolean foodClub = false;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @OneToMany(mappedBy = "user")
    private List<Routine> routines;

    @OneToMany(mappedBy = "user")
    private List<MyRoutine> myRoutines;

    @OneToMany(mappedBy = "user")
    private List<InBody> inBodies;

    @OneToOne(mappedBy = "user")
    private Basket basket;

    @OneToMany(mappedBy = "user")
    private List<UserClub> userClubs;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followerList;

    @OneToMany(mappedBy = "following")
    private List<Follow> followingList;

}