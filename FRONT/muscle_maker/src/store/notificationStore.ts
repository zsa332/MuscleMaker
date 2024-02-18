import { create } from "zustand";

interface notification {
  notificationId: number;
  message: string;
  isRead: boolean;
  notificationType: string;
  senderId: number;
  sendUserId: number;
}

interface notificationListState {
  canChange: boolean;
  notifications: notification[];
  setNotifications: (notifications: notification[]) => void;
  setCanChange: (flag: boolean) => void;
  setIsRead: (notificationId: number, isRead: boolean) => void;
}

export const useNotificationStore = create<notificationListState>(
  (set, get) => ({
    notifications: [],
    setNotifications: (notifications: any) => {
      const { canChange } = get(); // 현재 상태 가져오기
      if (canChange) {
        set({ notifications });
      }
    },
    canChange: true,
    setCanChange: (flag: boolean) => set({ canChange: flag }),
    setIsRead: (notificationId: number, isRead: boolean) => {
      const { notifications } = get();
      const updatedNotifications = notifications.map((notification) =>
        notification.notificationId === notificationId
          ? { ...notification, isRead }
          : notification
      );
      set({ notifications: updatedNotifications });
    },
  })
);
