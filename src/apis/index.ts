import axios, { AxiosResponse } from "axios";
import { CheckCertificationNumberRequestDto, EmailCertificationRequestDto, IdCheckRequestDto } from "./request/auth";
import { CheckCertificationNumberResponseDto, EmailCertificationResponseDto, IdCheckResponseDto } from "./response/auth";
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

const ID_CHECK_URL = ()=> `${API_DOMAIN}/id-check`;
const EMAIL_CERTIFICATION_URL = ()=> `${API_DOMAIN}/email-certification`;
const CHECK_CERTIFICATION_NUMBER_URL = ()=> `${API_DOMAIN}/check-certification`;

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


