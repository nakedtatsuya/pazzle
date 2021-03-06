import React from 'react';
import Footer from '../organisms/Footer';
import Main from '../organisms/main/main';
import TopSection from '../organisms/TopSection';
import CollectionSection from '../organisms/CollectionSection';
import AnimationSection from '../organisms/AnimationSection';
import PuzzleSection from '../organisms/PuzzleSection';
import UnderSection from '../organisms/UnderSection';

const ProfileTemplate: React.FC = () => {
  return (
    <div>
      <Main>
        <TopSection />
        <CollectionSection />
        <AnimationSection />
        <PuzzleSection />
        <UnderSection />
      </Main>
      <Footer />
    </div>
  );
};

export default ProfileTemplate;
