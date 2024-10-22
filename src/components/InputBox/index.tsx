import { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import './style.css'

interface Props{
    title: string;
    placeholder: string;
    type: 'text' | 'password';
    value: string;
    isErrorMessage: boolean; 
    buttonTitle?: string;
    onChange: ( event: ChangeEvent<HTMLInputElement> )=> void ;
    onKeydown: ( event: KeyboardEvent<HTMLInputElement> ) => void;
    onButtonClick?: () => void;
}




const InputBox = forwardRef<HTMLInputElement, Props>( ( props: Props, ref )=>{
    const {title, placeholder, type, value, isErrorMessage, buttonTitle, onChange, onKeydown,onButtonClick} = props;
    const buttonClass = (value === '')? 'input-box-button-disable' : 'input-box-button';
    return(
        <div className="input-box full-width">
            <div className='input-box-title'>{ title }</div>
            <div className='input-box-content'>
                <div className='input-box-body'>
                    <input className='input-box-input' type={type} value={value} placeholder={ placeholder }></input>
                    <div className={buttonClass} >{ buttonTitle }</div>
                </div>
                <div className='input-box-message'>{'사용 가능한 아이디 입니다'}</div>
            </div>
        </div>
    );
});

export default InputBox;