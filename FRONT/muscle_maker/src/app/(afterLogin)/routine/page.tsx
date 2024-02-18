import React from 'react';
import Tab from './_component/Tab';
import style from './routine.module.css';
import TabProvider from './_component/TabProvider';
import TabDecider from './_component/TabDecider';

export default function Routine() {
  return (
    <>
      <main className={style.backgroundcolor}>
        <TabProvider>
          <Tab/>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <TabDecider />
        </TabProvider>

      </main>

    </>
  );
}