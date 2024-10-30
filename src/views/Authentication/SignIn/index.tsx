import InputBox from 'components/InputBox'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { CheckCertificationNumberRequestDto, EmailCertificationRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { checkCertificationNumberRequest, emailCertificationRequest, idCheckRequest, signInRequest, signUpRequest } from 'apis';
import { CheckCertificationNumberResponseDto, EmailCertificationResponseDto, IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enums';
import { ResponseBody } from 'types';
import { useCookies } from 'react-cookie';

export default function SignIn() {
    const idRef = useRef<HTMLInputElement| null>( null );
    const passwordRef = useRef<HTMLInputElement| null>( null );

    const [cookie, setCookie, removeCookie] = useCookies();

    const [id, setId] = useState<string> ('');
    const [password, setPassword] = useState<string> ('');

    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean> ( false);
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean> ( false);

    const [idMessage, setIdMessage] = useState<string> ('');
    const [passwordMessage, setPasswordMessage] = useState<string> ('');

    const signUpButtonClassName = ( id && password )? 'primary-button-lg' :'disable-button-lg' ;

    const navigate = useNavigate();


       
    const signInResponse = (responseBody: ResponseBody<SignInResponseDto>)=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("아이디와 비밀번호를 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.SIGN_IN_FAIL ){
            setIsPasswordErrorMessage(true);
            setPasswordMessage("로그인 정보가 일치하지 않습니다.");
            return;
        }
        if( code !== ResponseCode.SUCCESS ) return;

        const { token, expirationTime } = responseBody as SignInResponseDto;
        const now = new Date().getTime();
        const expires = new Date( now + expirationTime * 1000 );
        setCookie( 'accessToken', token, {expires, path: '/'})

        navigate('/');
        
    }

    const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setId( value );
        setIdMessage('');
        setPasswordMessage('');
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

        if( !id || !password ) {
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }
        const requestBody: SignInRequestDto = { id, password };
        signInRequest( requestBody ).then( signInResponse );

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
                            <div className='kakao-sign-in-button' ></div>
                            <div className='naver-sign-in-button' ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
