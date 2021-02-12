import React, {lazy, Suspense} from 'react';
//import {Jumbotron} from "react-bootstrap";

import './Home.css';

const CoverImg = lazy(() => import('./CoverImg'));

export default function Home(props){
  return(
    <main>
      <Suspense fallback={<div><h1>Loading...</h1></div>}>
        <CoverImg />
      </Suspense>
    </main>
  );
}