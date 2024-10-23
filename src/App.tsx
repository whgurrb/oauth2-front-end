import InputBox from 'components/InputBox';
import './App.css';


function App() {
  const onIdChangeHandler=()=>{
    alert('onIdChangeHandler');
  }
  const onIdKeydownHangler=()=>{
    alert('onIdKeydownHangler');
  }
  const onIdButtonClick=()=>{
    alert('onIdButtonClick');
  }

  return (
    <div className='tmpclass'>
      <InputBox 
          title='아이디' 
          placeholder='아이디를 입력하세요..' 
          type='password' 
          value='ㅁㅁ' 
          message='정상적인 입력입니다.'
          isErrorMessage={false} 
          onChange={onIdChangeHandler}  
          buttonTitle='중복확인'
          onKeydown={onIdKeydownHangler} 
          onButtonClick={onIdButtonClick } 
      ></InputBox>
    </div>
  ); 
}

export default App;
