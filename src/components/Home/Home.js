import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import Baner from '../Baner/Baner.js';
import IconSection from '../IconSection/IconSection.js';
import Parallax from '../Parallax/Parallax.js';
import MiddleSection from '../MiddleSection/MiddleSection.js';
import Bottom from '../Bottom/Bottom.js';
import Footer from '../Footer/Footer.js';
import CoronavirusData from '../CoronavirusData/CoronavirusData.js';

function Home() {
  return (
    <div>
        <Navigation />
        <Baner />
        <IconSection />
        <Parallax />
        <MiddleSection />
        <CoronavirusData />
        <Bottom />
        <Footer />
    </div>
  )
}

export default Home;