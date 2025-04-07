import React from 'react';
import { Layout } from 'antd';
import {HeaderComponent} from "./LayoutComponents/Header";
import {BodyComponent} from "./LayoutComponents/Body";
import Footer from "./LayoutComponents/Footer";



export function LayoutComponent(){
  return (
    <Layout>
      <HeaderComponent />
      <BodyComponent />
      <Footer trademark={`© Copyright ${new Date().getFullYear()} — Hexlet Pizza`}/>
    </Layout>
  );
};