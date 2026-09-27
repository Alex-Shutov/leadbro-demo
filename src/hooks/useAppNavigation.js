import { useState } from 'react';

const useAppNavigation = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {};

  const navigation = [
    {
      title: 'Проекты',
      action: () => {},
      url: '/deals',
    },
    {
      title: 'Компании',
      action: () => {},
      url: '/clients',
    },
    {
      title: 'Продукты',
      action: () => {},
      url: '/services',
    },
    {
      title: 'Календарь',
      action: () => {},
      url: '/calendar',
    },
    {
      title: 'Трекер времени',
      action: () => {},
      url: '/timetrackings',
    },
  ];

  return {
    navigation,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    handleLogout,
  };
};

export { useAppNavigation };
