import InputBox from 'components/InputBox'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { CheckCertificationNumberRequestDto, EmailCertificationRequestDto, IdCheckRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { checkCertificationNumberRequest, emailCertificationRequest, idCheckRequest, signUpRequest } from 'apis';
import { CheckCertificationNumberResponseDto, EmailCertificationResponseDto, IdCheckResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enums';
import { ResponseType } from 'types';

export default function SignIn() {
    const idRef = useRef<HTMLInputElement| null>( null );
    const passwordRef = useRef<HTMLInputElement| null>( null );

    const [id, setId] = useState<string> ('');
    const [password, setPassword] = useState<string> ('');

    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean> ( false);
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean> ( false);

    const [idMessage, setIdMessage] = useState<string> ('');
    const [passwordMessage, setPasswordMessage] = useState<string> ('');

    const signUpButtonClassName = ( id && password )? 'primary-button-lg' :'disable-button-lg' ;

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/

    const navigate = useNavigate();

    const signUpResponse = (responseBody: ResponseType<SignUpResponseDto>)=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("모든 항목을 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.DUPLICATE_ID ){
            setIsIdErrorMessage( true );
            setIdMessage("이미 사용중인 아이디 입니다.");
        }
        if( code !== ResponseCode.SUCCESS ) return;
        navigate('/auth/sign-in');
    }

    const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setId( value );
        setIdMessage('');
    }

    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setPassword( value );
        setPasswordMessage('');
    }


    const onSignUpButtonClickHandler= ()=>{
        navigate('/auth/sign-up');
    }

    const onSignInButtonClickHandler = ()=>{
        alert("Login.....");
    }





    const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        if( !passwordRef.current) return;
        passwordRef.current.focus();
    }

    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    }

  return (
    <div id='sign-in-wrapper'>
        <div className='sign-in-image'></div>
        <div className='sign-in-container'>
            <div className='sign-in-box'>
                <div className='sign-in-title'> { '우주여행 서비스' } </div>
                <div className='sign-in-content-box'>
                    <div className='sign-in-content-input-box full-width'>
                        <InputBox ref={idRef}                   title='아이디' placeholder='아이디를 입력하세요.' type='text' 
                                  value={id} message={idMessage} isErrorMessage={isIdErrorMessage} 
                                  onChange={onIdChangeHandler} onKeydown={onIdKeyDownHandler} />

                        <InputBox ref={passwordRef}             title='비밀번호' placeholder='비밀번호를 입력하세요.' type='password' 
                                  value={password} message={passwordMessage} isErrorMessage={isPasswordErrorMessage} 
                                  onChange={onPasswordChangeHandler} onKeydown={onPasswordKeyDownHandler} />

                    </div>
                    <div className='sign-in-content-buton-box'>
                        <div className={signUpButtonClassName} onClick={onSignInButtonClickHandler}> {'로그인'}</div>
                        <div className='text-link-lg full-width' onClick={onSignUpButtonClickHandler}> {'회원가입'} </div>
                    </div>
                    <div className='sign-in-content-divider'></div>
                    <div className='sign-in-content-sns-sign-in-box'>
                        <div className='sign-in-content-sns-sign-in-title'> { 'SNS 로그인' }</div>
                        <div className='sign-in-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button'></div>
                            <div className='naver-sign-in-button'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
