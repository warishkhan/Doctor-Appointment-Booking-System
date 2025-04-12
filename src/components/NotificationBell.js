// components/NotificationBell.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../store/slices/notificationsSlice';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="relative">
      <button className="relative">
        <span className="text-xl">🔔</span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {notifications.length > 0 && (
        <div className="absolute right-0 top-10 bg-white text-black shadow-md p-4 rounded-md w-64">
          <h3 className="font-semibold text-sm mb-2">Notifications</h3>
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id} className="text-sm flex justify-between items-center mb-2">
                <span>{notif.message}</span>
                <button
                  onClick={() => handleRemoveNotification(notif.id)}
                  className="text-red-500 text-xs absolute top-3 right-3"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
