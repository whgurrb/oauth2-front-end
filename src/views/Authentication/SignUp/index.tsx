import InputBox from 'components/InputBox'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { CheckCertificationNumberRequestDto, EmailCertificationRequestDto, IdCheckRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { checkCertificationNumberRequest, emailCertificationRequest, idCheckRequest, signUpRequest, SNS_SIGN_IN_URL } from 'apis';
import { CheckCertificationNumberResponseDto, EmailCertificationResponseDto, IdCheckResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { ResponseCode } from 'types/enums';
import { ResponseBody } from 'types';

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

    const [isIdChecked, setIsIdChecked] = useState<boolean>( false );
    const [isCertificationNumberChecked, setIsCertificationNumberChecked] = useState<boolean>( false );

    const signUpButtonClassName = ( ( id && isIdChecked ) && password && checkPassword && email 
                                      && ( certificationNumber && isCertificationNumberChecked) )? 'primary-button-lg' :'disable-button-lg' ;

    const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/

    const navigate = useNavigate();

    const idCheckResponse=( responseBody: ResponseBody<IdCheckResponseDto> )=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("아이디를 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.DUPLICATE_ID ){
            setIsIdErrorMessage( true );
            setIdMessage("이미 사용중인 아이디 입니다.");
            setIsIdChecked( false );
        }
        if( code !== ResponseCode.SUCCESS ) return;
        setIsIdErrorMessage( false );
        setIdMessage('사용가능한 아이디 입니다.');
        setIsIdChecked( true );
    }


    const emailCertificationResponse=(responseBody: ResponseBody<EmailCertificationResponseDto> )=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("아이디와 이메일을 모두 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.MAIL_FAIL ) alert("이메일 발송에 실패했습니다.");
        
        if( code === ResponseCode.DUPLICATE_ID ){
            setIsIdErrorMessage( true );
            setIdMessage("이미 사용중인 아이디 입니다.");
            setIsIdChecked( false ); 
        }
        if( code !== ResponseCode.SUCCESS ) return;

        setIsEmailErrorMessage( false );
        setEmailMessage("인증 번호가 전송 되었습니다.");
    }

    const checkCertificationNumberResponse = (responseBody: ResponseBody<CheckCertificationNumberResponseDto> )=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("아이디, 이메일과 인증번호을 모두 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.CERTIFICATION_FAIL ) {
            setIsCertificationNumberErrorMessage( true );
            setCertificationNumberMessage("인증번호가 일치하지 않습니다.");
            setIsCertificationNumberChecked( false ); 
        }
        if( code !== ResponseCode.SUCCESS ) return;
        setIsCertificationNumberErrorMessage( false );
        setCertificationNumberMessage("인증번호를 확인 되었습니다.");
        setIsCertificationNumberChecked( true ); 
    }

    const signUpResponse = (responseBody: ResponseBody<SignUpResponseDto>)=>{
        if( !responseBody ) return;
        const { code } = responseBody;
        if( code === ResponseCode.VALIDATION_FAIL ) alert("모든 항목을 입력하세요.");
        if( code === ResponseCode.DATABASE_ERROR ) alert("데이터베이스 오류입니다.");
        if( code === ResponseCode.CERTIFICATION_FAIL ) {
            setIsCertificationNumberErrorMessage( true );
            setCertificationNumberMessage("인증번호가 일치하지 않습니다.");
            setIsCertificationNumberChecked( false ); 
        }
        if( code === ResponseCode.DUPLICATE_ID ){
            setIsIdErrorMessage( true );
            setIdMessage("이미 사용중인 아이디 입니다.");
            setIsIdChecked( false ); 
        }
        if( code !== ResponseCode.SUCCESS ) return;
        navigate('/auth/sign-in');
    }

    const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setId( value );
        setIdMessage('');
        setIsIdChecked( false );
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
        setIsCertificationNumberChecked( false ); 
    }


    const onIdButtonClickHandler= ()=>{
        if( !id ) return;
        const requestBody: IdCheckRequestDto = { id };
        idCheckRequest(requestBody).then( idCheckResponse )
    }

    const onEmailButtonClickHandler= ()=>{
        if( !id || !email ) return;
        const isEmailChecked = emailPattern.test( email );
        if( !isEmailChecked ) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setIsEmailErrorMessage( true );
            return;
        }
        const requestBody: EmailCertificationRequestDto = { id, email };
        emailCertificationRequest( requestBody ).then( emailCertificationResponse );

        setIsEmailErrorMessage( false );
        setEmailMessage('전송중 ...');

    }



    const onCertificationNumberButtonClickHandler= ()=>{

        if( !id || !email || !certificationNumber ) return;
        
        const requestBody: CheckCertificationNumberRequestDto = { id, email, certificationNumber };
        checkCertificationNumberRequest( requestBody ).then( checkCertificationNumberResponse );

    }


    const onSignUpButtonClickHandler= ()=>{
        if( !id || !password || !checkPassword || !email || !certificationNumber ) return;
        if( !isIdChecked ) {
            alert("아이디 중복확인은 필수 입니다.");
            return;
        }
        const isPasswordPattern = passwordPattern.test( password );
        if( !isPasswordPattern ){ 
            setIsPasswordErrorMessage( true );
            setPasswordMessage('영문자, 숫자를 혼용하여 8~13 문자를 입력하세요.');
            return;
        }

        if( password !== checkPassword ) { 
            setIsCheckPasswordErrorMessage(true);
            setCheckPasswordMessage('비밀번호와 일치하지 않습니다.');
            return;
        }

        if( !isCertificationNumberChecked ) {
            alert('이메일 인증은 필수 입니다.');
            return;
        }

        const requestBody: SignUpRequestDto = { id, password, email, certificationNumber };
        signUpRequest( requestBody ).then( signUpResponse );

    }



    const onSignInButtonClickHandler = ()=>{
        navigate('/auth/sign-in');
    }

    const onSnsSignInButtonHandler = ( type: 'kakao' | 'naver' ) => {
        window.location.href = SNS_SIGN_IN_URL( type );

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
                        <div className='sign-up-content-sns-sign-in-title'> { 'SNS 회원가입' }</div>
                        <div className='sign-up-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button' onClick={()=>onSnsSignInButtonHandler('kakao') }></div>
                            <div className='naver-sign-in-button' onClick={()=>onSnsSignInButtonHandler('naver') }></div>
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
                        <div className={signUpButtonClassName} onClick={onSignUpButtonClickHandler}> {'회원가입'}</div>
                        <div className='text-link-lg full-width' onClick={onSignInButtonClickHandler}> {'로그인'} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
