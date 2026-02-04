import React, { useEffect, useRef, useState } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function ViewValentine({ valentineId, onBack }) {
  const [valentine, setValentine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answered, setAnswered] = useState(false)
  const [yesScale, setYesScale] = useState(1)
  const [noMsgIdx, setNoMsgIdx] = useState(0)
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  const noMessages = ['are you sure?', 'fir se soch lo', 'nahi nahi', 'sach mein?', 'pakka pakka?']

  const dayThemes = {
    proposeday: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🌷', name: 'Propose Day' },
    chocolateday: { bg: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)', emoji: '🍫', name: 'Chocolate Day' },
    teddyday: { bg: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)', emoji: '🧸', name: 'Teddy Day' },
    promiseday: { bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)', emoji: '🤝', name: 'Promise Day' },
    hugday: { bg: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)', emoji: '🤗', name: 'Hug Day' },
    kissday: { bg: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)', emoji: '💋', name: 'Kiss Day' },
    valentinesday: { bg: 'linear-gradient(135deg, #ff9ac8 0%, #ff6ea1 100%)', emoji: '💖', name: 'Valentine\'s Day' }
  }

  useEffect(() => {
    async function fetchValentine() {
      try {
        const valentineRef = ref(db, `valentines/${valentineId}`)
        const snapshot = await get(valentineRef)
        if (snapshot.exists()) {
          setValentine(snapshot.val())
        } else {
          setError('Valentine not found')
        }
      } catch (err) {
        setError('Failed to load valentine: ' + err.message)
      }
      setLoading(false)
    }

    if (valentineId) {
      fetchValentine()
    }
  }, [valentineId])

  function handleNoClick(){
    setYesScale(prev => prev + 0.2)
    setNoMsgIdx(prev => (prev + 1) % noMessages.length)
  }

  useEffect(()=>{
    const no = noBtnRef.current
    if(!no) return
    const handlers = ['mouseenter','click']
    const fn = (e)=>{ e.preventDefault?.(); handleNoClick() }
    handlers.forEach(ev=> no.addEventListener(ev, fn))
    return ()=> handlers.forEach(ev=> no.removeEventListener(ev, fn))
  }, [])

  if (loading) {
    return (
      <main className="card">
        <h2>Loading valentine... 💌</h2>
      </main>
    )
  }

  if (error) {
    return (
      <main className="card">
        <h2>❌ {error}</h2>
        <button className="btn yes" onClick={onBack} style={{marginTop: '20px'}}>
          Create a Valentine
        </button>
      </main>
    )
  }

  if (!valentine) {
    return (
      <main className="card">
        <h2>Valentine not found</h2>
      </main>
    )
  }

  const theme = dayThemes[valentine.day] || dayThemes.valentinesday
  const pageStyle = {
    background: theme.bg
  }

  return (
    <div style={{height: '100vh', width: '100%', position: 'relative'}}>
      <style>
        {`body { background: ${theme.bg} !important; }`}
      </style>
      <main className="card">
        <h1 className="title">{theme.emoji} {valentine.name} Says: {theme.emoji}</h1>

        {valentine.imageUrl && (
          <img className="gif" src={valentine.imageUrl} alt="Valentine" />
        )}

        <div className="valentine-content">
          <p className="valentine-message">Will you be my Valentine?</p>
          <p className="valentine-message" style={{marginTop: '20px', fontSize: '1rem'}}>{valentine.message}</p>
        </div>

        {!answered && (
          <div className="content-wrapper" style={{marginTop: '24px'}}>
            <button ref={yesBtnRef} className="btn yes" onClick={() => setAnswered(true)} style={{transform: `scale(${yesScale})`}}>
              Yes 💘
            </button>
            <button ref={noBtnRef} className="btn no">
              {noMessages[noMsgIdx]}
            </button>
          </div>
        )}

        {answered && (
          <div className="celebration-message">
            <p>🎉 Yay! You said YES! 🎉</p>
            <p className="celebration-emoji">💕✨🎊💖{theme.emoji}✨💕</p>
          </div>
        )}
      </main>
    </div>
  )
}
