import React from 'react';
import Baner from '../Baner/Baner.js';
import IconSection from '../IconSection/IconSection.js';
import Parallax from '../Parallax/Parallax.js';
import MiddleSection from '../MiddleSection/MiddleSection.js';
import Bottom from '../Bottom/Bottom.js';
import CoronavirusData from '../CoronavirusData/CoronavirusData.js';

function Home() {
  return (
    <div>
        <Baner />
        <IconSection />
        <Parallax />
        <MiddleSection />
        <CoronavirusData />
        <Bottom />
    </div>
  )
}

export default Home;