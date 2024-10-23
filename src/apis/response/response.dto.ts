import { ResponseCode, ResponseMessage } from "types/enums";

export default interface ResposeDto{
    
    code: ResponseCode;
    message: ResponseMessage;
    
}