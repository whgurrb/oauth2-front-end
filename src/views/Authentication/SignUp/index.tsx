import InputBox from 'components/InputBox'
import React from 'react'

export default function SignUp() {
  return (
    <div id='sign-up-wrapper'>
        <div className='sign-up-image'></div>
        <div className='sign-up-container'>
            <div className='sign-up-box'>
                <div className='sign-up-title'> { '우주여행 서비스' } </div>
                <div className='sign-up-content-box'>
                    <div className='sign-up-content-sns-sign-in-box'>
                        <div className='sign-up-content-sns-sign-in-title'> { 'SNS 로그인' }</div>
                        <div className='sign-up-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button'></div>
                            <div className='naver-sign-in-button'></div>
                        </div>
                    </div>
                    <div className='sign-up-content-divider'></div>
                    <div className='sign-up-content-input-box'>
                        <InputBox title='아이디' placeholder='아이디를 입력하세요.' type='text' value='' message='' isErrorMessage={false} buttonTitle='중복 확인' onChange={()=>{}} onKeydown={()=>{}} onButtonClick={()=>{}}/>
                        <InputBox title='비밀번호' placeholder='비밀번호를 입력하세요.' type='password' value='' message='' isErrorMessage={false} onChange={()=>{}} onKeydown={()=>{}} />
                        <InputBox title='비밀번호 확인' placeholder='비밀번호를 입력하세요.' type='password' value='' message='' isErrorMessage={false} onChange={()=>{}} onKeydown={()=>{}}/>
                        <InputBox title='이메일' placeholder='이메일를 입력하세요.' type='text' value='' message='' isErrorMessage={false} buttonTitle='인증번호 전송' onChange={()=>{}} onKeydown={()=>{}} onButtonClick={()=>{}}/>
                        <InputBox title='인증번호' placeholder='인증번호를 입력하세요.' type='text' value='' message='' isErrorMessage={false} buttonTitle='인증 확인' onChange={()=>{}} onKeydown={()=>{}} onButtonClick={()=>{}}/>
                    </div>
                    <div className='sign-up-content-buton-box'>
                        <div className='primary-button-lg full-width'> {'회원가입'}</div>
                        <div className='text-link-lg full-width'> {'로그인'} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
