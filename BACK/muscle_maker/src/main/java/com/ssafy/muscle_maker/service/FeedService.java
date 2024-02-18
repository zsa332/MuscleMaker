package com.ssafy.muscle_maker.service;

import com.ssafy.muscle_maker.awsS3.S3Uploader;
import com.ssafy.muscle_maker.dto.feeds.request.FeedDto;
import com.ssafy.muscle_maker.entity.*;
import com.ssafy.muscle_maker.exception.CustomException;
import com.ssafy.muscle_maker.exception.ErrorCode;
import com.ssafy.muscle_maker.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedTagRepository feedTagRepository;
    private final TagRepository tagRepository;
    private final FavoriteRepository favoriteRepository;
    private final S3Uploader s3Uploader;
    private final UserRepository userRepository;
    private final UserClubRepository userClubRepository;


    @Transactional
    public void deleteFeed(FeedDto feedDto){
        int feedId = feedDto.getFeedId();
        int userId = feedDto.getUserId();
        Feed feed = feedRepository.findByFeedId(feedId);
        if(feed.getUserId() == userId && !feed.isFlag()){

            feed.setFlag(true);
            feedRepository.save(feed);
        } else  throw new CustomException(ErrorCode.NO_AUTHORITY_DELETE);
    }


    @Transactional
    public FeedDto writeFeed(FeedDto feedDto, MultipartFile img){
        if(!img.isEmpty()){
            String imgUrl = null;
            try {
                imgUrl = s3Uploader.upload(img,"feed-images");
            } catch (IOException e) {
                throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
            }
            feedDto.setImgUrl(imgUrl);
        }
        User user = userRepository.findById(feedDto.getUserId()).orElseThrow(()-> new CustomException( ErrorCode.NO_EXIST_USER));
        String userImgUrl = user.getImage();
        String nickname = user.getNickname();
        Feed feed = feedDto.toEntity();
        feedRepository.save(feed);
        List<String> tags = feedDto.getTags();
        feed.setTags(writeTag(tags, feed));
        feedRepository.save(feed);
        feedDto.toDto(feed);
        feedDto.setUserImgUrl(userImgUrl);
        feedDto.setUserImgUrl(nickname);
        return feedDto;

    }

    public List<FeedDto> searchFeed(String keyword){
        List<Tag> tags = tagRepository.findByTag(keyword.trim());

        if(tags.isEmpty())
            return Collections.emptyList();

        Tag tag = tags.get(0);
        List<FeedTag> feedTags = tag.getFeedTags();
        List<FeedDto> feedDtoList = new ArrayList<>();
        for( FeedTag feedTag : feedTags){
            if(feedTag.getFeed().isFlag())
                continue;

            FeedDto feedDto = FeedDto.builder().build().toDto(feedTag.getFeed());
            List<FeedTag> feedTagList = feedTag.getFeed().getTags();
            List<String> strings = new ArrayList<>();
            for (FeedTag feedTag1 : feedTagList)
                strings.add(feedTag1.getTag().getTag());

            feedDto.setTags(strings);
            User user = userRepository.findById(feedDto.getUserId()).orElseThrow(()-> new CustomException( ErrorCode.NO_EXIST_USER));
            String userImgUrl = user.getImage();
            String nickname = user.getNickname();
            feedDto.setUserImgUrl(userImgUrl);
            feedDto.setNickname(nickname);
            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }

    @Transactional
    public List<FeedTag> writeTag(List<String> tags, Feed feed){
        if(tags == null || tags.isEmpty())
            return Collections.emptyList();

        List<FeedTag> feedTags = new ArrayList<>();
        for(String tagName : tags){
            List<Tag>optionalTag = tagRepository.findByTag(tagName);
            Tag tag;
            if(optionalTag.size()== 1){
                tag = optionalTag.get(0);
            }
            else tag =  tagRepository.save(Tag.builder().tag(tagName).build());
            feedTags.add(feedTagRepository.save(FeedTag.builder().tag(tag).feed(feed).build()));
        }

        return feedTags;
    }

    public List<FeedDto> getAllFeedList(int visibility, int userId) {
        List<Feed> feedList = feedRepository.findByVisibilityAndFlagFalse(visibility)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));
        List<FeedDto> feedDtoList = getFeedTag(feedList, user);
        Collections.shuffle(feedDtoList);
        return feedDtoList;
    }

    public List<FeedDto> getMyFeed(int userId) {
        List<Feed> feedList = feedRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));

        List<FeedDto> feedDtoList = getFeedTag(feedList, user);
        Collections.shuffle(feedDtoList);
        return feedDtoList;
    }

    public List<FeedDto> getIndividualFeed(int userId, int individualId) {
        List<Feed> feedList = Optional.of(feedRepository.findByUserIdAndVisibilityAndFlagFalse(individualId, 1))
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));

        List<FeedDto> feedDtoList = getFeedTag(feedList, user);
        Collections.shuffle(feedDtoList);
        return feedDtoList;
    }

    public List<FeedDto> getFollowFeed(int userId) {
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        List<FeedDto> feedDtoList = new ArrayList<>();
        List<Follow> followings = user.getFollowingList();
        for(Follow following : followings) {
            User fllowingUser = following.getFollowing();
            feedRepository.findByUserIdAndVisibilityAndFlagFalse(fllowingUser.getUserId(), 1)
                    .forEach((feed) -> {
                        FeedDto feedDto = new FeedDto().toDto(feed);
                        feedDto.setFavorite(favoriteRepository.existsByUserAndFeedAndFlagFalse(fllowingUser, feed));
                        User user1 = userRepository.findById(feedDto.getUserId()).orElseThrow(()-> new CustomException( ErrorCode.NO_EXIST_USER));
                        String userImgUrl = user1.getImage();
                        String nickname = user1.getNickname();
                        feedDto.setUserImgUrl(userImgUrl);
                        feedDto.setNickname(nickname);


                        feedDtoList.add(feedDto);
                    });
        }
        return feedDtoList;
    }

    public List<FeedDto> getClubExerciseFeed(int userId) {
        List<Feed> feedList = feedRepository.findByClubIdAndFlagFalse(1)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));

        return getFeedTag(feedList, user);
    }

    public List<FeedDto> getClubFoodFeed(int userId) {
        List<Feed> feedList = feedRepository.findByClubIdAndFlagFalse(1)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_FEED_LIST));
        User user = userRepository.findByUserIdAndFlagFalse(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_EXIST_USER));

        return getFeedTag(feedList, user);
    }

    public List<FeedDto> getFeedTag(List<Feed> feedList, User user){
        List<FeedDto> feedDtoList = new ArrayList<>();
        for (Feed feed : feedList) {
            FeedDto feedDto = new FeedDto();
            feedDto = feedDto.toDto(feed);
            List<FeedTag> feedTags = feed.getTags();
            List<String> tags = new ArrayList<>();
            for (FeedTag feedTag : feedTags) tags.add(feedTag.getTag().getTag());
            feedDto.setFavorite(favoriteRepository.existsByUserAndFeedAndFlagFalse(user, feed));
            feedDto.setTags(tags);
            User user1 = userRepository.findById(feedDto.getUserId()).orElseThrow(()-> new CustomException( ErrorCode.NO_EXIST_USER));
            String userImgUrl = user1.getImage();
            String nickname = user1.getNickname();
            feedDto.setNickname(nickname);
            feedDto.setUserImgUrl(userImgUrl);

            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }

    @Transactional
    public String toggleFavorite(int userId, int feedId){
        User user = User.builder()
                .userId(userId)
                .build();

        Feed feed = feedRepository.findByFeedId(feedId);

        Favorite favorite = favoriteRepository.findByUserAndFeed(user, feed);

        boolean isAdd = true;
        if(favorite == null) {
            favorite = Favorite.builder()
                    .user(user)
                    .feed(feed)
                    .build();
            feed.updateFavoriteCnt(feed.getFavoriteCnt() + 1);
        } else if (favorite.isFlag()){
            favorite.setFlag(false);
            feed.updateFavoriteCnt(feed.getFavoriteCnt() + 1);
        } else {
            favorite.setFlag(true);
            feed.updateFavoriteCnt(feed.getFavoriteCnt() - 1);
            isAdd = false;
        }

        favoriteRepository.save(favorite);
        feedRepository.save(feed);
        if(isAdd) return "해당 피드를 좋아요 하였습니다.";
        else return "해당 피드를 좋아요 취소 하였습니다.";
    }

    public List<FeedDto> getFavoriteFeedsByUser(int userId){
        List<Favorite> favorites = favoriteRepository.findByUser(User.builder().userId(userId).build());
        List<FeedDto> feedDtoList = new ArrayList<>();
        favorites.forEach((favorite -> {
            if(!favorite.isFlag()){
                FeedDto feedDto = new FeedDto().toDto(favorite.getFeed());
                feedDto.setFavorite(true);
                User user = userRepository.findById(feedDto.getUserId()).orElseThrow(()-> new CustomException( ErrorCode.NO_EXIST_USER));
                String userImgUrl = user.getImage();
                String nickname = user.getNickname();
                feedDto.setUserImgUrl(userImgUrl);
                feedDto.setNickname(nickname);
                feedDtoList.add(feedDto);
            }
        }));
        return feedDtoList;
    }

}
