import { Route, Routes} from 'react-router-dom';
import React, {FC} from 'react';
import {Home} from './pages/home';
import {Test} from "./pages/test";

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/test" element={<Test />}/>
        </Routes>
    );
};
