import { useCookies } from 'react-cookie';
import './style.css'
export default function Home() {
    const [cookie, setCookie, removeCookie] = useCookies();
    alert( cookie );

    return(
        <div>
            <div><h1>우주여행 서비스</h1></div>
            <div className='login-text-link'> 로그인 </div>
            <div className='login-text-link'> 로그아웃 </div>
            
        </div>
    )
}