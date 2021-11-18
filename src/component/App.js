import React, { useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { authService } from '../data/fbase';
import './view/css/reset.css';
import Auth from "./view/AuthPage/Auth";
import Profile from './view/ProfilePage/Profile';
import Home from './view/HomePage/Home';
import Header from './view/Header';
import LoadingView from './view/LoadungView';
import ClubMain from './view/ClubPage/ClubMain';
import ClubOn from './view/ClubPage/ClubOn/ClubOn';
import ClubKoi from './view/ClubPage/ClubKoi/ClubKoi';
import ClubAgk from './view/ClubPage/ClubAgk/ClubAgk';
import ClubSs from './view/ClubPage/ClubSs/ClubSs';
import ClubMc from './view/ClubPage/ClubMc/ClubMc';
import ClubMod from './view/ClubPage/ClubMod/ClubMod';
import ClubRoot from './view/ClubPage/ClubRoot/ClubRoot';
import ClubThreed from './view/ClubPage/ClubThreed/ClubThreed';
import ClubMeeple from './view/ClubPage/ClubMeeple/ClubMeeple';
import ClubTia from './view/ClubPage/ClubTia/ClubTia';
import ClubGame from './view/ClubPage/ClubGame/ClubGame';
import ClubWeb from './view/ClubPage/ClubWeb/ClubWeb';
import ClassGame from './view/ClassPage/ClassGame/ClassGame';
import ClassAi from './view/ClassPage/ClassAi/ClassAi';
import ClassMain from './view/ClassPage/ClassMain';

export default function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid
    });
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Header userObj={userObj} />}
      {init ? <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club" element={<ClubMain />} />
            <Route path="/club/on" element={<ClubOn userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/koi" element={<ClubKoi userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/agk" element={<ClubAgk userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/ss" element={<ClubSs userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/mc" element={<ClubMc userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/mod" element={<ClubMod userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/root" element={<ClubRoot userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/threed" element={<ClubThreed userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/meeple" element={<ClubMeeple userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/tia" element={<ClubTia userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/game" element={<ClubGame userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/club/web" element={<ClubWeb userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/class" element={<ClassMain />} />
            <Route path="/class/game" element={<ClassGame userObj={userObj} refreshUser={refreshUser} />} />
            <Route path="/class/ai" element={<ClassAi userObj={userObj} refreshUser={refreshUser} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
        : <LoadingView /> }
    </BrowserRouter>
  );
}