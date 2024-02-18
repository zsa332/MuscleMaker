"use client";

import { useNotificationStore } from "@/store/notificationStore";
import { homeStore } from "@/store/homeStore";
import style from "@/app/(afterLogin)/notification/notification.module.css";
import { useEffect, useState } from "react";
import { notificationAPI } from "@/app/apis/api/notification";
import { useRouter } from "next/navigation";
import { users } from "@/app/apis/api/user";

export default function Notification() {
  const { notifications, setIsRead, setCanChange } = useNotificationStore();
  const router = useRouter();
  const [activeNotificationId, setActiveNotificationId] = useState(0);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage?.getItem("userId");
      if (storedUserId) {
        setUserId(parseInt(storedUserId, 10));
      }
    }
  }, [notifications]);

  const onClickAcceptButton = (
    notificationId: number,
    memberId: number,
    clubId: number
  ) => {
    const clubLeaderRequest = {
      leaderId: userId,
      memberId: memberId,
    };
    const func = async () => {
      try {
        const response = await users.acceptClubMember(
          clubId,
          clubLeaderRequest
        );
        alert(response.data.message);
        setIsRead(notificationId, true);
        notificationAPI.readNotification(notificationId);
      } catch (e) {
        console.log(e);
      }
    };

    func();
  };

  const onClickRefuseButton = (
    notificationId: number,
    memberId: number,
    clubId: number
  ) => {
    const func = async () => {
      try {
        const response = await users.refuseClubMember(clubId, userId, memberId);
        alert(response.data.message);
        setIsRead(notificationId, true);
        notificationAPI.readNotification(notificationId);
      } catch (e) {
        console.log(e);
      }
    };

    func();
  };
  return (
    <>
      <div className={style.homeContainer}>
        <div className={style.homeFixed}>
          <div className={style.homeText}>&nbsp;</div>
          <div className={style.homeTab}></div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className={style.notifications}>
          {notifications &&
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                style={{ display: notification.isRead ? `none` : `block` }}
              >
                {notification.notificationType === "FOLLOW" ? (
                  <div className={style.notificationBox}>
                    {notification.message}
                    <button
                      className={style.goButton}
                      onClick={() => {
                        try {
                          setIsRead(notification.notificationId, true);
                          notificationAPI.readNotification(
                            notification.notificationId
                          );
                          router.push(
                            `/userpage/${notification.senderId}/myfeed`
                          );
                        } catch (e) {
                          console.log("읽기 실패" + e);
                        }
                      }}
                    >
                      &rsaquo;
                    </button>
                  </div>
                ) : notification.notificationType === "CLUB_LEADER" ? (
                  <div className={style.notificationBox}>
                    {notification.message}
                    <button
                      className={style.goButton}
                      onClick={() => {
                        setActiveNotificationId(notification.notificationId);
                      }}
                    >
                      &rsaquo;
                    </button>
                    <div
                      style={{
                        display:
                          notification.notificationId == activeNotificationId
                            ? "block"
                            : "none",
                      }}
                      className={style.buttonContainer}
                    >
                      <button
                        className={style.button}
                        style={{ marginLeft: "320px" }}
                        onClick={() => {
                          onClickAcceptButton(
                            notification.notificationId,
                            notification.sendUserId,
                            notification.senderId
                          );
                        }}
                      >
                        수락
                      </button>
                      <button
                        className={style.button}
                        onClick={() => {
                          onClickRefuseButton(
                            notification.notificationId,
                            notification.sendUserId,
                            notification.senderId
                          );
                        }}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ) : notification.notificationType === "CLUB_MEMBER" ? (
                  <div className={style.notificationBox}>
                    {notification.message}
                    <button
                      className={style.goButton}
                      onClick={() => {
                        try {
                          setIsRead(notification.notificationId, true);
                          notificationAPI.readNotification(
                            notification.notificationId
                          );
                          router.push(`/club/${notification.senderId}`);
                        } catch (e) {
                          console.log("읽기 실패" + e);
                        }
                      }}
                    >
                      &rsaquo;
                    </button>
                  </div>
                ) : (
                  <div className={style.notificationBox}>
                    {notification.message}
                    <button
                      className={style.goButton}
                      onClick={() => {
                        try {
                          setIsRead(notification.notificationId, true);
                          notificationAPI.readNotification(
                            notification.notificationId
                          );
                          homeStore
                            .getState()
                            .setCanChange(true, notification.senderId);
                          router.push(`/home`);
                        } catch (e) {
                          console.log("읽기 실패" + e);
                        }
                      }}
                    >
                      &rsaquo;
                    </button>
                  </div>
                )}
                {!notifications && <div>알림이 없습니다.</div>}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
