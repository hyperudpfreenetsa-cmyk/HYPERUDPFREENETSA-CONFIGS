import { useState, useEffect } from 'react';

const ADMIN_KEY = "HYPERADMIN2026"; // Change this

export default function Home() {
  const [configs, setConfigs] = useState([]);
  const [tab, setTab] = useState('browse');
  const [form, setForm] = useState({network:'', type:'', host:'', sni:''});
  const [adminPass, setAdminPass] = useState('');

  useEffect(() => { fetch('/api/configs').then(r=>r.json()).then(setConfigs); }, [tab]);

  const copyConfig = (c) => {
    const payload = `HYPER://${c.network}/${c.type}?host=${c.host}&sni=${c.sni}`;
    navigator.clipboard.writeText(payload);
    alert('Copied: ' + payload);
  }

  const submitConfig = async () => {
    if(!form.network ||!form.host) return alert('Fill network + host');
    await fetch('/api/configs', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)});
    alert('Submitted! Waiting for admin approval.');
    setForm({network:'', type:'', host:'', sni:''});
  }

  const approve = async (id, status) => {
    await fetch('/api/configs', {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id, status})});
    setTab('admin');
  }

  return (
    <main style={{minHeight:'100vh',background:'#0A0F1E',color:'#fff',padding:'16px',maxWidth:'600px',margin:'0 auto',fontFamily:'system-ui'}}>
      <h1 style={{fontSize:'22px',fontWeight:'800',color:'#00F5FF',margin:'0 0 12px 0'}}>HYPER UDP FREENET SA</h1>

      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        <button onClick={()=>setTab('browse')} style={{flex:1,padding:'10px',borderRadius:'12px',border:'none',background: tab==='browse'?'#00F5FF':'#111829',color: tab==='browse'?'#0A0F1E':'#fff',fontWeight:700}}>Browse</button>
        <button onClick={()=>setTab('submit')} style={{flex:1,padding:'10px',borderRadius:'12px',border:'none',background: tab==='submit'?'#00F5FF':'#111829',color: tab==='submit'?'#0A0F1E':'#fff',fontWeight:700}}>Submit</button>
        <button onClick={()=>setTab('admin')} style={{flex:1,padding:'10px',borderRadius:'12px',border:'none',background: tab==='admin'?'#00F5FF':'#111829',color: tab==='admin'?'#0A0F1E':'#fff',fontWeight:700}}>Admin</button>
      </div>

      {tab==='browse' && (
        <div>
          {configs.filter(c=>c.status==='Working').map(c => (
            <div key={c.id} style={{background:'#111829',padding:'16px',borderRadius:'16px',marginBottom:'12px',border:'1px solid rgba(255,255,255,0.1)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontWeight:600}}>{c.network} • {c.type}</span>
                <span style={{fontSize:'12px',padding:'2px 8px',borderRadius:'999px',background:'rgba(34,197,94,0.2)', color:'#4ade80'}}>Working</span>
              </div>
              <p style={{fontSize:'12px',opacity:0.6,margin:'0 0 12px 0'}}>Host: {c.host} | Exp: {c.expires}</p>
              <button onClick={()=>copyConfig(c)} style={{width:'100%',background:'#00F5FF',color:'#0A0F1E',fontWeight:800,padding:'10px',borderRadius:'12px',border:'none'}}>Copy Config</button>
            </div>
          ))}
        </div>
      )}

      {tab==='submit' && (
        <div style={{background:'#111829',padding:'16px',borderRadius:'16px'}}>
          <h3 style={{marginTop:0}}>Submit New Config</h3>
          <input placeholder="Network e.g. Vodacom" value={form.network} onChange={e=>setForm({...form,network:e.target.value})} style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'8px',border:'1px solid #333',background:'#0A0F1E',color:'#fff'}}/>
          <input placeholder="Type e.g. UDP, TLS" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'8px',border:'1px solid #333',background:'#0A0F1E',color:'#fff'}}/>
          <input placeholder="Host IP" value={form.host} onChange={e=>setForm({...form,host:e.target.value})} style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'8px',border:'1px solid #333',background:'#0A0F1E',color:'#fff'}}/>
          <input placeholder="SNI" value={form.sni} onChange={e=>setForm({...form,sni:e.target.value})} style={{width:'100%',padding:'10px',marginBottom:'12px',borderRadius:'8px',border:'1px solid #333',background:'#0A0F1E',color:'#fff'}}/>
          <button onClick={submitConfig} style={{width:'100%',background:'#00F5FF',color:'#0A0F1E',fontWeight:800,padding:'12px',borderRadius:'12px',border:'none'}}>Submit for Review</button>
        </div>
      )}

      {tab==='admin' && (
        <div>
          {adminPass!==ADMIN_KEY? (
            <div style={{background:'#111829',padding:'16px',borderRadius:'16px'}}>
              <input type="password" placeholder="Admin Key" value={adminPass} onChange={e=>setAdminPass(e.target.value)} style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'8px',border:'1px solid #333',background:'#0A0F1E',color:'#fff'}}/>
              <button onClick={()=>setAdminPass(adminPass)} style={{width:'100%',background:'#00F5FF',color:'#0A0F1E',fontWeight:800,padding:'12px',borderRadius:'12px',border:'none'}}>Login</button>
            </div>
          ) : (
            <div>
              <h3>Pending Configs</h3>
              {configs.filter(c=>c.status==='Pending').map(c => (
                <div key={c.id} style={{background:'#111829',padding:'16px',borderRadius:'16px',marginBottom:'12px'}}>
                  <p style={{margin:'0 0 8px 0'}}>{c.network} - {c.host}</p>
                  <div style={{display:'flex',gap:'8px'}}>
                    <button onClick={()=>approve(c.id,'Working')} style={{flex:1,background:'#22c55e',color:'#fff',fontWeight:700,padding:'10px',borderRadius:'12px',border:'none'}}>Approve</button>
                    <button onClick={()=>approve(c.id,'Expired')} style={{flex:1,background:'#ef4444',color:'#fff',fontWeight:700,padding:'12px',borderRadius:'12px',border:'none'}}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
         }
