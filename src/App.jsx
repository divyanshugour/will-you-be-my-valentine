import React, { useEffect, useRef, useState } from 'react'

function randomInt(min, max){ return Math.floor(min + Math.random()*(max-min+1)) }

export default function App(){
  const [hearts, setHearts] = useState([])
  const heartsRef = useRef([])
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  useEffect(()=>{
    heartsRef.current = []
    spawnHearts(18)
    const t = setInterval(()=> spawnHearts(4), 900)
    return ()=> clearInterval(t)
  }, [])

  function spawnHearts(n){
    setHearts(prev=>{
      const next = [...prev]
      for(let i=0;i<n;i++){
        const id = cryptoRandomId()
        const size = randomInt(18,54)
        const left = Math.random()*100
        const dur = (6 + Math.random()*8).toFixed(2)
        const sway = (2 + Math.random()*4).toFixed(2)
        const opacity = (0.6 + Math.random()*0.5).toFixed(2)
        next.push({id,size,left,dur,sway,opacity})
      }
      return next.slice(-120)
    })
    setTimeout(()=>{
      setHearts(prev=>prev.slice(20))
    },16000)
  }

  function cryptoRandomId(){
    return Math.random().toString(36).slice(2,9)
  }

  function moveNo(immediate=false){
    const no = noBtnRef.current
    const yes = yesBtnRef.current
    if(!no) return
    const yesRect = yes ? yes.getBoundingClientRect() : {left:-9999,right:-9999,top:-9999,bottom:-9999}
    const padding = 60
    const vw = window.innerWidth
    const vh = window.innerHeight
    let x,y
    for(let tries=0; tries<30; tries++){
      x = padding + Math.random()*(vw - padding*2)
      y = padding + Math.random()*(vh - padding*2)
      if(!(x > yesRect.left-80 && x < yesRect.right+80 && y > yesRect.top-80 && y < yesRect.bottom+80)) break
    }
    no.style.transition = immediate ? 'none' : 'left 0.28s ease, top 0.28s ease, transform 0.2s'
    no.style.left = x + 'px'
    no.style.top = y + 'px'
    no.style.transform = 'translate(-50%,-50%) scale(1.04)'
    setTimeout(()=> no.style.transform = 'translate(-50%,-50%) scale(1)', 220)
  }

  useEffect(()=>{
    const no = noBtnRef.current
    if(!no) return
    const handlers = ['mouseenter','mousedown','touchstart','focus','click']
    const fn = (e)=>{ e.preventDefault && e.preventDefault(); moveNo() }
    handlers.forEach(ev=> no.addEventListener(ev, fn))
    return ()=> handlers.forEach(ev=> no.removeEventListener(ev, fn))
  }, [])

  function handleYes(){
    spawnHearts(40)
    if(yesBtnRef.current){
      yesBtnRef.current.textContent = 'Yay! 💞'
      yesBtnRef.current.disabled = true
    }
  }

  return (
    <div className="app-root">
      <div className="hearts-layer" aria-hidden="true">
        {hearts.map(h => (
          <span key={h.id}
            className="heart"
            style={{left: `${h.left}vw`, fontSize: `${h.size}px`, animationDuration: `${h.dur}s, ${h.sway}s`, opacity: h.opacity}}
          >{Math.random()>.5? '💖':'❤️'}</span>
        ))}
      </div>

      <main className="card">
        <h1 className="title">Will You Be My Valentine?</h1>
        <img className="gif" src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Valentine GIF" />

        <div className="buttons" style={{position:'relative'}}>
          <button ref={yesBtnRef} className="btn yes" onClick={handleYes}>Yes 💘</button>
          <button ref={noBtnRef} className="btn no" style={{position:'absolute', left: '60%', top: '55%', transform:'translate(-50%,-50%)'}}>
            No 😅
          </button>
        </div>
      </main>
    </div>
  )
}
