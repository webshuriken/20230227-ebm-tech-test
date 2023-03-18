import React from 'react';
import { BrowserRouter, Navigate, Route, Routes as SwitchRoutes } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Chat from './Chat';
import Analytics from './Analytics';

const Routes = () => {
    return (
        <BrowserRouter>
            <SwitchRoutes>
                <Route path="/" element={<PageWrapper />}>
                    <Route index element={<Navigate to='/chat' />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/analytics' element={<Analytics />} />
                </Route>

                <Route path="*" element={<Navigate to='/chat' />} />
            </SwitchRoutes>
        </BrowserRouter>
    );
};

export default Routes;