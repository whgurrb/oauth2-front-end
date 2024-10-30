import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom'

export default function OAuth() {
    const { token,  expirationTime } = useParams();
    const [ cookie, setCookie, removeCookie ]=useCookies();

    const navigate = useNavigate();

    useEffect(()=>{
        
        const now = new Date().getTime();
        const expires = new Date( now + Number(expirationTime) * 1000 );
        setCookie( 'accessToken', token, {expires, path: '/'})

        navigate('/');

    }, [token] );
  return (
    <div>
    </div>
  )
}
