import './App.css';
import React, { useEffect } from 'react';
import './mocks/demo.api';
import rootApi from './root.api.js';
import useStore from './hooks/useStore';
import { prepareRoutes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { withSentryRouting } from '@sentry/react';
import { PermissionsProvider } from './providers/PermissionProvider';

function App() {
  const { notificationsStore } = useStore();
  useEffect(() => {
    rootApi.getNotifications().then((result) => {
      notificationsStore.setNotifications(result.body);
    });
  }, []);

  const SentryRouter = withSentryRouting(BrowserRouter);

  return (
    <SentryRouter>
      <AuthProvider>
        <PermissionsProvider>{prepareRoutes()}</PermissionsProvider>
      </AuthProvider>
    </SentryRouter>
  );
}

export default App;
