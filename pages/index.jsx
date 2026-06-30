import { useState, useEffect } from 'react';

const stats = { users: '1.2K', downloads: '18.4K', files: '342', online: '84' };
const trending = [
  {id:1, name:'Vodacom UDP Ultra', downloads: '4.2K', rating:4.9},
  {id:2, name:'MTN TLS Fast', downloads: '3.1K', rating:4.8},
  {id:3, name:'Cell C HTTP', downloads: '2.8K', rating:4.7},
];

export default function Home() {
  return (
    <main style={{maxWidth:'1100px',margin:'0 auto',padding:'24px'}}>
      {/* HERO */}
      <section className="glass neon" style={{padding:'48px',borderRadius:'24px',textAlign:'center',marginBottom:'24px'}}>
        <h1 style={{fontSize:'40px',margin:0,color:'var(--neon)',fontWeight:800}}>HYPER UDP FREENET SA</h1>
        <p style={{opacity:0.8}}>South Africa’s #1 Premium Config Platform</p>
        <button onClick={()=>alert('Install on your phone')} style={{marginTop:16,background:'var(--neon)',color:'var(--bg)',fontWeight:800,padding:'12px 24px',borderRadius:12,border:'none'}}>Install App</button>
      </section>

      {/* STATS */}
      <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>
        {Object.entries(stats).map(([k,v])=>(
          <div key={k} className="glass" style={{padding:'20px',borderRadius:'16px',textAlign:'center'}}>
            <div style={{fontSize:'28px',fontWeight:800}}>{v}</div>
            <div style={{opacity:0.6,fontSize:'12px',textTransform:'uppercase'}}>{k}</div>
          </div>
        ))}
      </section>

      {/* TRENDING */}
      <section>
        <h2 style={{marginBottom:12}}>🔥 Trending Files</h2>
        {trending.map(f=>(
          <div key={f.id} className="glass" style={{padding:'16px',borderRadius:'16px',marginBottom:'12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{f.name}</div>
              <div style={{fontSize:12,opacity:0.6}}>{f.downloads} Downloads • ⭐{f.rating}</div>
            </div>
            <button className="neon" style={{background:'var(--neon)',color:'var(--bg)',fontWeight:800,padding:'10px 16px',borderRadius:12,border:'none'}}>Download</button>
          </div>
        ))}
      </section>
    </main>
  )
                         }
