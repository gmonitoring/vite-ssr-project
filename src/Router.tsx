import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "src/pages/home";
import { Test } from "src/pages/test";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};
