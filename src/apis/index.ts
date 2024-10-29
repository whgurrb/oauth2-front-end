import axios, { AxiosResponse } from "axios";
import { CheckCertificationNumberRequestDto, EmailCertificationRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { CheckCertificationNumberResponseDto, EmailCertificationResponseDto, IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";


const responseHandler = <T> (response: AxiosResponse )=>{
    const responseBody:T = response.data;
    return responseBody;
}

const errorHandler = (error:any)=>{
    if( !error.response || !error.response.data) return null;
    const responseBody:ResponseDto = error.response.data;
    return responseBody;
}

const DOMAIN = 'http://localhost:4040';

const API_DOMAIN = `${DOMAIN}/api/v1/auth`;

const SIGN_IN_URL = ()=> `${API_DOMAIN}/sign-in`;
const SIGN_UP_URL = ()=> `${API_DOMAIN}/sign-up`;
const ID_CHECK_URL = ()=> `${API_DOMAIN}/id-check`;
const EMAIL_CERTIFICATION_URL = ()=> `${API_DOMAIN}/email-certification`;
const CHECK_CERTIFICATION_NUMBER_URL = ()=> `${API_DOMAIN}/check-certification`;


export const signInRequest = async( requestBody: SignInRequestDto )=>{
    const result = await axios.post( SIGN_IN_URL(), requestBody)
        .then( responseHandler<SignInResponseDto> )
        .catch( errorHandler )
    return result;
}


export const signUpRequest = async( requestBody: SignUpRequestDto ) =>{
    const result = await axios.post(SIGN_UP_URL(), requestBody )
        .then( responseHandler<SignUpResponseDto> )
        .catch( errorHandler );
    return result;
} 



export const idCheckRequest = async ( requestBody: IdCheckRequestDto )=> {
    const result = await axios.post(ID_CHECK_URL(), requestBody )
        .then( responseHandler<IdCheckResponseDto> )
        .catch( errorHandler );
    return result;
} 

export const emailCertificationRequest = async ( requestBody: EmailCertificationRequestDto )=> {
    const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody )
        .then( responseHandler<EmailCertificationResponseDto> )
        .catch( errorHandler );
    return result;
} 


export const checkCertificationNumberRequest = async( requestBody: CheckCertificationNumberRequestDto ) =>{
    const result = await axios.post(CHECK_CERTIFICATION_NUMBER_URL(), requestBody )
        .then( responseHandler<CheckCertificationNumberResponseDto> )
        .catch( errorHandler );
    return result;
}




