import InputBox from 'components/InputBox';
import './App.css';


function App() {
  return (
    <div className='tmpclass'>
      <InputBox 
          title='아이디' 
          placeholder='아이디를 입력하세요..' 
          type='password' 
          value='' 
          isErrorMessage={false} 
          onChange={()=>{}}  
          buttonTitle='중복확인'
          onKeydown={()=>{}} 
          onButtonClick={()=>{}} 
      ></InputBox>
    </div>
  ); 
}

export default App;
