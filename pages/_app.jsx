import '../styles/globals.css'
import { useState, useEffect } from 'react'
export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark')
  useEffect(()=>{document.body.className=theme},[theme])
  return <>
    <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} style={{position:'fixed',top:16,right:16,zIndex:99,padding:'8px 12px',borderRadius:999,border:'none',background:'var(--card)'}}>🌓</button>
    <Component {...pageProps} />
  </>
}
