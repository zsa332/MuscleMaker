import React from 'react';
import Tab from './_component/Tab';
import style from './routine.module.css';
import TabProvider from './_component/TabProvider';
import TabDecider from './_component/TabDecider';
import TopProfile from '@/app/(afterLogin)/_component/TopProfile';
export default function Routine() {
  return (
    <div>
      <TopProfile />
      <TabProvider>
        <Tab/>
        <br/>
        <br/>
        <TabDecider/>
      </TabProvider>
    </div>
  );
}      