import { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import './style.css'



interface Props{
    title: string;
    placeholder: string;
    type: 'text' | 'password';
    value: string;
    message?: string;
    isErrorMessage?: boolean; 
    buttonTitle?: string;
    onChange: ( event: ChangeEvent<HTMLInputElement> )=> void ;
    onKeydown: ( event: KeyboardEvent<HTMLInputElement> ) => void;
    onButtonClick?: () => void;
}


const InputBox = forwardRef<HTMLInputElement, Props>( ( props: Props, ref )=>{
    const {title, placeholder, type, value, message, isErrorMessage, buttonTitle, onChange, onKeydown,onButtonClick} = props;
    const buttonClassName = (value === '')? 'input-box-button-disable' : 'input-box-button';
    const messageClassName = isErrorMessage ? 'input-box-message-error' : 'input-box-message';
    return(
        <div className="input-box full-width">
            <div className='input-box-title'>{ title }</div>
            <div className='input-box-content'>
                <div className='input-box-body'>
                    <input ref={ref} className='input-box-input' type={type} value={value} placeholder={ placeholder }
                           onChange={onChange} onKeyDown={onKeydown}></input>
                    { buttonTitle!==undefined && onButtonClick!==undefined && <div className={buttonClassName} onClick={onButtonClick}>{ buttonTitle }</div> } 
                </div>
                { message!==undefined && <div className={messageClassName}>{ message }</div> } 
            </div>
        </div>
    );
});

export default InputBox;