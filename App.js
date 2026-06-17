import { useState } from "react";

if (typeof document !== "undefined") {
  document.body.style.background = "#F0F2F8";
  document.body.style.margin = "0";
  document.documentElement.style.colorScheme = "light";
}

const INITIAL_POSTS = [
  { id: 1, author: "Айгерім Бекова", username: "aigerim_b", avatar: "А", avatarColor: "#6C63FF", time: "2 сағат бұрын", content: "Бүгін Алматыда күн тамаша! ☀️ Парктен серуендеп қайттым, өте жақсы болды.", likes: 24, liked: false, comments: [{ id: 1, author: "Данияр", text: "Рас айтасың! 🌞" }], showComments: false },
  { id: 2, author: "Данияр Сейткали", username: "daniyar_s", avatar: "Д", avatarColor: "#FF6584", time: "5 сағат бұрын", content: "Жаңа жоба бастадым! 💻 React-та әлеуметтік желі жасап жатырмын.", likes: 47, liked: false, comments: [], showComments: false },
  { id: 3, author: "Зарина Нурланова", username: "zarina_n", avatar: "З", avatarColor: "#43B89C", time: "1 күн бұрын", content: "Университетте жаңа семестр басталды! 📚 Барлығына табыс тілеймін! 💪", likes: 89, liked: false, comments: [{ id: 1, author: "Айгерім", text: "Сізге де табыс! 🎓" }], showComments: false },
];

const USERS_DB = [
  { name: "Erasyl", username: "erasyl_vt", email: "erasyl@mail.com", password: "1234", avatar: "E", avatarColor: "#6C63FF" },
];
const COLORS = ["#6C63FF","#FF6584","#43B89C","#FF9800","#E91E63","#00BCD4"];

function LoginScreen({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handle = () => {
    const u = USERS_DB.find(u => u.email === email && u.password === password);
    if (!u) { setError("Email немесе құпия сөз қате! ❌"); return; }
    onLogin(u);
  };
  return (
    <div style={A.page}>
      <div style={A.card}>
        <div style={A.logo}>⟁ KazConnect</div>
        <h2 style={A.title}>Кіру</h2>
        <p style={A.sub}>Аккаунтыңызға кіріңіз</p>
        {error && <div style={A.err}>{error}</div>}
        <label style={A.lbl}>Email</label>
        <input style={A.inp} type="email" placeholder="email@mail.com" value={email} onChange={e=>{setEmail(e.target.value);setError("")}} />
        <label style={A.lbl}>Құпия сөз</label>
        <input style={A.inp} type="password" placeholder="••••••••" value={password} onChange={e=>{setPassword(e.target.value);setError("")}} onKeyDown={e=>e.key==="Enter"&&handle()} />
        <button style={A.btn} onClick={handle}>Кіру →</button>
        <div style={A.hint}>Аккаунт жоқ па? <span style={A.lnk} onClick={onGoRegister}>Тіркелу</span></div>
        <div style={A.demo}>🔑 Демо: erasyl@mail.com / 1234</div>
      </div>
    </div>
  );
}

function RegisterScreen({ onRegister, onGoLogin }) {
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const handle = () => {
    if (!name.trim()||!uname.trim()||!email.trim()||!pw){setError("Барлық өрістерді толтырыңыз! ⚠️");return;}
    if (pw!==pw2){setError("Құпия сөздер сәйкес келмейді! ❌");return;}
    if (USERS_DB.find(u=>u.email===email)){setError("Бұл email тіркелген! ⚠️");return;}
    if (USERS_DB.find(u=>u.username===uname)){setError("Бұл username алынған! ⚠️");return;}
    const nu={name:name.trim(),username:uname.trim(),email,password:pw,avatar:name.trim()[0].toUpperCase(),avatarColor:COLORS[Math.floor(Math.random()*COLORS.length)]};
    USERS_DB.push(nu);
    onRegister(nu);
  };
  return (
    <div style={A.page}>
      <div style={A.card}>
        <div style={A.logo}>⟁ KazConnect</div>
        <h2 style={A.title}>Тіркелу</h2>
        <p style={A.sub}>Жаңа аккаунт жасаңыз</p>
        {error && <div style={A.err}>{error}</div>}
        <label style={A.lbl}>Аты-жөні</label>
        <input style={A.inp} placeholder="Erasyl Bekov" value={name} onChange={e=>{setName(e.target.value);setError("")}} />
        <label style={A.lbl}>Username</label>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#999",fontSize:15}}>@</span>
          <input style={{...A.inp,paddingLeft:28}} placeholder="erasyl_vt" value={uname} onChange={e=>{setUname(e.target.value.replace(/\s/g,""));setError("")}} />
        </div>
        <label style={A.lbl}>Email</label>
        <input style={A.inp} type="email" placeholder="email@mail.com" value={email} onChange={e=>{setEmail(e.target.value);setError("")}} />
        <label style={A.lbl}>Құпия сөз</label>
        <input style={A.inp} type="password" placeholder="••••••••" value={pw} onChange={e=>{setPw(e.target.value);setError("")}} />
        <label style={A.lbl}>Қайталаңыз</label>
        <input style={A.inp} type="password" placeholder="••••••••" value={pw2} onChange={e=>{setPw2(e.target.value);setError("")}} onKeyDown={e=>e.key==="Enter"&&handle()} />
        <button style={A.btn} onClick={handle}>Тіркелу ✓</button>
        <div style={A.hint}>Аккаунт бар ма? <span style={A.lnk} onClick={onGoLogin}>Кіру</span></div>
      </div>
    </div>
  );
}

export default function KazConnect() {
  const [authMode, setAuthMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("feed");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [notif, setNotif] = useState(null);

  const showNotif = msg => { setNotif(msg); setTimeout(()=>setNotif(null),2500); };
  const handleLogin = u => { setCurrentUser(u); showNotif("Қош келдіңіз, "+u.name+"! 👋"); };
  const handleRegister = u => { setCurrentUser(u); showNotif("Тіркелу сәтті! 🎉"); };
  const handleLogout = () => { setCurrentUser(null); setAuthMode("login"); setPage("feed"); };
  const handleLike = id => setPosts(posts.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p));
  const handleToggleCmt = id => setPosts(posts.map(p=>p.id===id?{...p,showComments:!p.showComments}:p));
  const handleAddCmt = pid => {
    const text=(commentInputs[pid]||"").trim(); if(!text)return;
    setPosts(posts.map(p=>p.id===pid?{...p,comments:[...p.comments,{id:Date.now(),author:currentUser.name,text}],showComments:true}:p));
    setCommentInputs({...commentInputs,[pid]:""});
  };
  const handlePost = () => {
    if(!newPostText.trim())return;
    setPosts([{id:Date.now(),author:currentUser.name,username:currentUser.username,avatar:currentUser.avatar,avatarColor:currentUser.avatarColor,time:"Жаңа ғана",content:newPostText.trim(),likes:0,liked:false,comments:[],showComments:false},...posts]);
    setNewPostText(""); showNotif("Пост жарияланды! ✅");
  };
  const myPosts = currentUser ? posts.filter(p=>p.username===currentUser.username) : [];

  if (!currentUser) {
    if (authMode==="register") return <RegisterScreen onRegister={handleRegister} onGoLogin={()=>setAuthMode("login")} />;
    return <LoginScreen onLogin={handleLogin} onGoRegister={()=>setAuthMode("register")} />;
  }

  return (
    <div style={S.app}>
      {notif && <div style={S.notif}>{notif}</div>}
      <header style={S.header}>
        <div style={S.logo}><span style={{fontSize:22,color:"#6C63FF"}}>⟁</span><span style={S.logoTxt}>KazConnect</span></div>
        <nav style={S.nav}>
          <button style={{...S.nb,...(page==="feed"?S.nba:{})}} onClick={()=>setPage("feed")}>🏠 Лента</button>
          <button style={{...S.nb,...(page==="profile"?S.nba:{})}} onClick={()=>setPage("profile")}>👤 Профиль</button>
          <button style={S.logout} onClick={handleLogout}>Шығу</button>
        </nav>
      </header>

      <main style={S.main}>
        {page==="feed" && (
          <div style={S.feedLayout}>
            <aside style={S.sidebar}>
              <div style={S.sideCard}>
                <div style={{...S.bigAv,background:currentUser.avatarColor}}>{currentUser.avatar}</div>
                <div style={{fontWeight:700,fontSize:16}}>{currentUser.name}</div>
                <div style={{color:"#999",fontSize:13,marginBottom:16}}>@{currentUser.username}</div>
                <div style={{display:"flex",justifyContent:"center",gap:20}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{fontWeight:700,fontSize:18,color:"#6C63FF"}}>{myPosts.length}</span><span style={{fontSize:11,color:"#999"}}>Пост</span></div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{fontWeight:700,fontSize:18,color:"#6C63FF"}}>128</span><span style={{fontSize:11,color:"#999"}}>Дос</span></div>
                </div>
              </div>
            </aside>
            <div style={S.feed}>
              <div style={S.createCard}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{...S.av,background:currentUser.avatarColor,flexShrink:0}}>{currentUser.avatar}</div>
                  <textarea style={S.ta} placeholder="Не болып жатыр? Бөлісіңіз..." value={newPostText} onChange={e=>setNewPostText(e.target.value)} rows={3} />
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
                  <span style={{fontSize:12,color:"#bbb"}}>{newPostText.length} символ</span>
                  <button style={{...S.postBtn,opacity:newPostText.trim()?1:0.5}} onClick={handlePost} disabled={!newPostText.trim()}>Жариялау</button>
                </div>
              </div>
              {posts.map(p=>(
                <div key={p.id} style={S.card}>
                  <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                    <div style={{...S.av,background:p.avatarColor}}>{p.avatar}</div>
                    <div><div style={{fontWeight:700,fontSize:15}}>{p.author}</div><div style={{color:"#999",fontSize:12}}>@{p.username} · {p.time}</div></div>
                  </div>
                  <p style={{margin:"0 0 16px",lineHeight:1.6,fontSize:15}}>{p.content}</p>
                  <div style={{display:"flex",gap:8,borderTop:"1px solid #F0F2F8",paddingTop:12}}>
                    <button style={{...S.actBtn,...(p.liked?{background:"#FFF0F3",color:"#FF4D6D"}:{})}} onClick={()=>handleLike(p.id)}>{p.liked?"❤️":"🤍"} {p.likes}</button>
                    <button style={S.actBtn} onClick={()=>handleToggleCmt(p.id)}>💬 {p.comments.length}</button>
                    <button style={S.actBtn}>🔗 Бөлісу</button>
                  </div>
                  {p.showComments && (
                    <div style={{marginTop:14,borderTop:"1px solid #F0F2F8",paddingTop:12}}>
                      {p.comments.map(c=>(
                        <div key={c.id} style={{padding:"6px 0",fontSize:13,borderBottom:"1px solid #F8F9FC"}}>
                          <span style={{fontWeight:700,color:"#6C63FF"}}>{c.author}:</span> <span style={{color:"#444"}}>{c.text}</span>
                        </div>
                      ))}
                      <div style={{display:"flex",gap:8,marginTop:10}}>
                        <input style={S.cmtInp} placeholder="Пікір жазыңыз..." value={commentInputs[p.id]||""} onChange={e=>setCommentInputs({...commentInputs,[p.id]:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handleAddCmt(p.id)} />
                        <button style={S.cmtSend} onClick={()=>handleAddCmt(p.id)}>→</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {page==="profile" && (
          <div style={{maxWidth:680,margin:"0 auto"}}>
            <div style={{background:"#fff",borderRadius:16,overflow:"hidden",marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{height:100,background:"linear-gradient(135deg,#6C63FF 0%,#FF6584 100%)"}} />
              <div style={{padding:"0 24px 24px",display:"flex",gap:20,alignItems:"flex-end",marginTop:-30}}>
                <div style={{width:72,height:72,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:28,border:"4px solid #fff",flexShrink:0,background:currentUser.avatarColor}}>{currentUser.avatar}</div>
                <div style={{flex:1,paddingTop:36}}>
                  <h2 style={{margin:"0 0 2px",fontSize:20}}>{currentUser.name}</h2>
                  <div style={{color:"#999",fontSize:13,marginBottom:6}}>@{currentUser.username}</div>
                  <div style={{color:"#555",fontSize:14,marginBottom:12}}>KazConnect қолданушысы 👨‍💻</div>
                  <div style={{display:"flex",gap:20,marginBottom:12}}>
                    <div style={{fontSize:14,color:"#555"}}><strong>{myPosts.length}</strong> Пост</div>
                    <div style={{fontSize:14,color:"#555"}}><strong>128</strong> Дос</div>
                    <div style={{fontSize:14,color:"#555"}}><strong>256</strong> Ізбасар</div>
                  </div>
                  <button style={{padding:"8px 20px",borderRadius:20,border:"1.5px solid #FFE0E6",background:"transparent",cursor:"pointer",fontWeight:600,fontSize:13,color:"#FF6584"}} onClick={handleLogout}>🚪 Шығу</button>
                </div>
              </div>
            </div>
            <h3 style={{margin:"0 0 12px",fontWeight:700,fontSize:18}}>Менің посттарым</h3>
            {myPosts.length===0
              ? <div style={{background:"#fff",borderRadius:16,padding:40,textAlign:"center",color:"#999"}}>Әлі пост жоқ ✍️</div>
              : myPosts.map(p=>(
                <div key={p.id} style={S.card}>
                  <p style={{margin:"0 0 8px",lineHeight:1.6,fontSize:15}}>{p.content}</p>
                  <div style={{color:"#999",fontSize:12}}>{p.time} · {p.likes} лайк · {p.comments.length} пікір</div>
                </div>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
}

const A = {
  page:{minHeight:"100vh",background:"linear-gradient(135deg,#6C63FF 0%,#FF6584 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:16},
  card:{background:"#fff",borderRadius:24,padding:"36px 32px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(108,99,255,0.25)"},
  logo:{fontSize:22,fontWeight:800,color:"#6C63FF",textAlign:"center",marginBottom:20},
  title:{margin:"0 0 4px",fontSize:24,fontWeight:800,color:"#1a1a2e",textAlign:"center"},
  sub:{margin:"0 0 24px",color:"#999",fontSize:14,textAlign:"center"},
  err:{background:"#FFF0F3",color:"#FF4D6D",borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:16,fontWeight:500},
  lbl:{display:"block",fontSize:13,fontWeight:600,color:"#555",marginBottom:6,marginTop:14},
  inp:{width:"100%",border:"1.5px solid #E8EAF0",borderRadius:12,padding:"11px 14px",fontSize:15,outline:"none",fontFamily:"inherit",color:"#1a1a2e",boxSizing:"border-box",background:"#FAFAFA"},
  btn:{width:"100%",background:"linear-gradient(135deg,#6C63FF,#9C8FFF)",color:"#fff",border:"none",borderRadius:14,padding:"14px",fontWeight:700,fontSize:16,cursor:"pointer",marginTop:24,boxShadow:"0 4px 16px rgba(108,99,255,0.4)"},
  hint:{textAlign:"center",marginTop:16,fontSize:14,color:"#888"},
  lnk:{color:"#6C63FF",fontWeight:700,cursor:"pointer"},
  demo:{textAlign:"center",marginTop:12,fontSize:12,color:"#bbb",background:"#F8F9FF",borderRadius:8,padding:"8px"},
};
const S = {
  app:{minHeight:"100vh",background:"#F0F2F8",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#1a1a2e",colorScheme:"light"},
  notif:{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#6C63FF",color:"#fff",padding:"10px 24px",borderRadius:24,fontWeight:600,zIndex:999,boxShadow:"0 4px 20px rgba(108,99,255,0.4)",whiteSpace:"nowrap"},
  header:{background:"#fff",borderBottom:"1px solid #E8EAF0",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  logo:{display:"flex",alignItems:"center",gap:8},
  logoTxt:{fontWeight:800,fontSize:20,color:"#6C63FF",letterSpacing:"-0.5px"},
  nav:{display:"flex",gap:8,alignItems:"center"},
  nb:{padding:"8px 16px",borderRadius:20,border:"none",background:"transparent",cursor:"pointer",fontWeight:500,fontSize:14,color:"#666"},
  nba:{background:"#EEF0FF",color:"#6C63FF",fontWeight:700},
  logout:{padding:"8px 16px",borderRadius:20,border:"1.5px solid #FFE0E6",background:"transparent",cursor:"pointer",fontWeight:600,fontSize:13,color:"#FF6584"},
  main:{maxWidth:900,margin:"0 auto",padding:"24px 16px"},
  feedLayout:{display:"flex",gap:20,alignItems:"flex-start"},
  sidebar:{width:220,flexShrink:0,position:"sticky",top:80},
  sideCard:{background:"#fff",borderRadius:16,padding:20,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  bigAv:{width:64,height:64,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:24,margin:"0 auto 12px"},
  feed:{flex:1,display:"flex",flexDirection:"column",gap:16},
  createCard:{background:"#fff",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  av:{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:16},
  ta:{flex:1,border:"1.5px solid #E8EAF0",borderRadius:12,padding:"10px 14px",fontSize:15,resize:"none",outline:"none",fontFamily:"inherit",color:"#1a1a2e",lineHeight:1.5},
  postBtn:{background:"#6C63FF",color:"#fff",border:"none",borderRadius:20,padding:"10px 24px",fontWeight:700,fontSize:14,cursor:"pointer"},
  card:{background:"#fff",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  actBtn:{background:"#F5F6FA",border:"none",borderRadius:20,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:500,color:"#555"},
  cmtInp:{flex:1,border:"1.5px solid #E8EAF0",borderRadius:20,padding:"8px 14px",fontSize:13,outline:"none",fontFamily:"inherit"},
  cmtSend:{background:"#6C63FF",color:"#fff",border:"none",borderRadius:20,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:15},
};
