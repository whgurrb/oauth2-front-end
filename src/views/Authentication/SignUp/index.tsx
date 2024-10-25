import InputBox from 'components/InputBox'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

export default function SignUp() {
    const idRef = useRef<HTMLInputElement| null>( null );
    const passwordRef = useRef<HTMLInputElement| null>( null );
    const checkPasswordRef = useRef<HTMLInputElement| null>( null );
    const emailRef = useRef<HTMLInputElement| null>( null );
    const certificationNumberRef = useRef<HTMLInputElement| null>( null );

    const [id, setId] = useState<string> ('');
    const [password, setPassword] = useState<string> ('');
    const [checkPassword, setCheckPassword] = useState<string> ('');
    const [email, setEmail] = useState<string> ('');
    const [certificationNumber, setCertificationNumber] = useState<string> ('');

    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean> ( false);
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean> ( false);
    const [isCheckPasswordErrorMessage, setIsCheckPasswordErrorMessage] = useState<boolean> ( false);
    const [isEmailErrorMessage, setIsEmailErrorMessage] = useState<boolean> ( false);
    const [isCertificationNumberErrorMessage, setIsCertificationNumberErrorMessage] = useState<boolean> ( false);

    const [idMessage, setIdMessage] = useState<string> ('');
    const [passwordMessage, setPasswordMessage] = useState<string> ('');
    const [checkPasswordPessage, setCheckPasswordMessage] = useState<string> ('');
    const [emailMessage, setEmailMessage] = useState<string> ('');
    const [certificationNumberMessage, setCertificationNumberMessage] = useState<string> ('');

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

    const onCheckPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setCheckPassword( value );
        setCheckPasswordMessage('');
    }

    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setEmail( value );
        setEmailMessage('');
    }

    const onCertificationChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setCertificationNumber( value );
        setCertificationNumberMessage('');
    }


    const onIdButtonClickHandler= ()=>{
        alert("중복확인");
    }
    const onEmailButtonClickHandler= ()=>{
        alert("인증번호 전송");
    }
    const onCertificationNumberButtonClickHandler= ()=>{
        alert("인증 확인");
    }

    const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        onIdButtonClickHandler();

    }

    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        if( !checkPasswordRef.current ) return;
        checkPasswordRef.current.focus();

    }

    const onCheckPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        if( !emailRef.current ) return;
        emailRef.current.focus();

    }

    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        onEmailButtonClickHandler();

    }

    const onCertificationNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> )=>{
        if( event.key !== 'Enter') return;
        onCertificationNumberButtonClickHandler();
    }

    
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
                        <InputBox ref={idRef}                   title='아이디' placeholder='아이디를 입력하세요.' type='text' 
                                  value={id} message={idMessage} isErrorMessage={isIdErrorMessage} buttonTitle='중복 확인' 
                                  onChange={onIdChangeHandler} onKeydown={onIdKeyDownHandler} onButtonClick={onIdButtonClickHandler}/>

                        <InputBox ref={passwordRef}             title='비밀번호' placeholder='비밀번호를 입력하세요.' type='password' 
                                  value={password} message={passwordMessage} isErrorMessage={isPasswordErrorMessage} 
                                  onChange={onPasswordChangeHandler} onKeydown={onPasswordKeyDownHandler} />

                        <InputBox ref={checkPasswordRef}        title='비밀번호 확인' placeholder='비밀번호를 입력하세요.' type='password' 
                                  value={checkPassword} message={checkPasswordPessage} isErrorMessage={isCheckPasswordErrorMessage} 
                                  onChange={onCheckPasswordChangeHandler} onKeydown={onCheckPasswordKeyDownHandler}/>

                        <InputBox ref={emailRef}                title='이메일' placeholder='이메일 주소를 입력하세요.' type='text' 
                                  value={email} message={emailMessage} isErrorMessage={isEmailErrorMessage} buttonTitle='인증번호 전송' 
                                  onChange={onEmailChangeHandler} onKeydown={onEmailKeyDownHandler} onButtonClick={onEmailButtonClickHandler}/>

                        <InputBox ref={certificationNumberRef}  title='인증번호' placeholder='인증번호 4자리를 입력하세요.' type='text' 
                                  value={certificationNumber} message={certificationNumberMessage} isErrorMessage={isCertificationNumberErrorMessage} buttonTitle='인증 확인' 
                                  onChange={onCertificationChangeHandler} onKeydown={onCertificationNumberKeyDownHandler} onButtonClick={onCertificationNumberButtonClickHandler}/>
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
