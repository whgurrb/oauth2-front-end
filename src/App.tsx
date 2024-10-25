import InputBox from 'components/InputBox';
import './App.css';
import { ChangeEvent, useState } from 'react';

function App() {
  const onNaverClickHandler=()=>{
    alert('Naver access....');
  }

  const onKakaoClickHandler=()=>{
    alert('Kakao access....');
  }
  return (
    <div >
      <div className='disable-button-lg   full-width'>회원가입</div>
      <div className='primary-button-lg   full-width'>회원가입</div>

      <div className='text-link-lg   full-width'>로그인</div>
      <div className='sns-button-box'>
        <div className='kakao-sign-in-button' onClick={ onKakaoClickHandler}></div>
        <div className='naver-sign-in-button' onClick={ onNaverClickHandler}></div>
      </div>
    </div>
  ); 
}

export default App;
