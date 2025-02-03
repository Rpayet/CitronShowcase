import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AnimationProvider } from './context/AnimationContext';
import { ModalProvider } from './context/ModalContext';
import { AppProvider } from './context/AppProvider';
import AuthProvider from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <DashboardProvider>
                    <ModalProvider>
                        <AuthProvider>
                            <AnimationProvider>
                                    <App />
                            </AnimationProvider>
                        </AuthProvider>
                    </ModalProvider>
                </DashboardProvider>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
