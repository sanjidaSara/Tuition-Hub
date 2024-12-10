import React from 'react';
import AuthProvider from './Providers/AuthProvider';
import TeacherLogin from './Teacher_login';

function App() {
  return (
    <AuthProvider>
      <TeacherLogin />
    </AuthProvider>
  );
}

export default App;
