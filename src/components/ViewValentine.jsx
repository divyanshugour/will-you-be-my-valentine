import React, { useEffect, useRef, useState } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function ViewValentine({ valentineId }) {
  const [valentine, setValentine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answered, setAnswered] = useState(false)
  const [yesScale, setYesScale] = useState(1)
  const [noMsgIdx, setNoMsgIdx] = useState(0)
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  const noMessages = ['No', 'Pakka?', 'Soch lia?', 'Mana mat kro na!', 'Achche bachche na nahi bolte.', 'Lock kar diya jaye?', 'Ek baar phir soch lo.', 'Final decision hai?', 'Mere liye bhi nahi?', 'Itni chhoti si toh baat hai.', 'Ek baar "haan" bol ke toh dekho.']

  const dayThemes = {
    roseday: {
      bg: 'linear-gradient(135deg, #ff9ac8 0%, #ff6ea1 100%)',
      emoji: '🌹',
      name: 'Rose Day',
      gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTVnZGJwbDB5b2xwbjgzYnR4Njh6bjVxaWNpdG45emxya3Z2YXF4OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vr9v03pX4cJmMx2yD8/giphy.gif'
    },
    proposeday: {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      emoji: '🌷',
      name: 'Propose Day',
      gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZnMzcydnh3OHFqMzc1OHh3aWN1OWZwb3hpazY4OWQ2ZXVqc3RlMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sj93cJMsnoQJkqdgYD/giphy.gif'
    },
    chocolateday: {
      bg: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
      emoji: '🍫',
      name: 'Chocolate Day',
      gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY24ycHQ4aTVkdW43a290Mm9qcTNlbXVydTc1ZjY1YjdwaXg4eWduaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9NgiavRTlG7n0J0hVH/giphy.gif'
    },
    teddyday: {
      bg: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
      emoji: '🧸',
      name: 'Teddy Day',
      gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmFmOG5uM2U3MDc3cnVubXBhOW94bDV0dDRlcHVvZzhudGQ5ZjJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NxC8VtyxqhMtpLoEEN/giphy.gif'
    },
    promiseday: {
      bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)',
      emoji: '🤝',
      name: 'Promise Day',
      gif: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXdpamtlazg4ejRqZ3RmbThxZ24zMXM3ZjA4cWRhZDZxaDV2NjZpYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DIsERFi2YjlmcnbKcK/giphy.gif'
    },
    hugday: {
      bg: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)',
      emoji: '🤗',
      name: 'Hug Day',
      gif: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hjNmcwOTVieXFnd3BtMm5kdTA3NGd0cW5iYXo0bHY2OXc3NzE4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uakdGGShmMS0KYfTgp/giphy.gif'
    },
    kissday: {
      bg: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
      emoji: '💋',
      name: 'Kiss Day',
      gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzJkd255cjkxeDJja2g0NWxuYnZyN3dwdDFuYWFodHprMXA2ZXNkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uaJW5HM7eWAvhoj0pZ/giphy.gif'
    },
    valentinesday: {
      bg: 'linear-gradient(135deg, #ff9ac8 0%, #ff6ea1 100%)',
      emoji: '💖',
      name: "Valentine's Day",
      gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW9mdHlneDVpN2xocnI2NGhneHFnNDQyZDF2eHd1MHZpaWcyNjNvbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RXoZQgt5la08uk5efU/giphy.gif'
    }
  }

  const dayMessages = {
    roseday: "Sending this red rose to you, [Name], because you bring fragrance and beauty into my life every single day.",
    proposeday: "On this special day, I have just one question for you, [Name]: will you walk this path of life with me forever?",
    chocolateday: "Life is sweeter with you in it, [Name], much sweeter than this chocolate I'm sending your way.",
    teddyday: "Sending this teddy to you, [Name], so you have something soft to hug whenever I'm not there.",
    promiseday: "I promise to stand by your side through all the highs and lows, [Name], today and always.",
    hugday: "Sending you the biggest, warmest hug, [Name], to let you know how much you mean to me.",
    kissday: "Sealed with a kiss for you, [Name]; sending all my love and a gentle kiss.",
    valentinesday: "Happy Valentine's Day, [Name]; you are the reason I believe in love, and I am so incredibly lucky to call you mine."
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
  }, [noBtnRef.current])

  useEffect(() => {
    if (!valentine) return
    const theme = dayThemes[valentine.day] || dayThemes.valentinesday
    const previous = document.body.style.background
    const previousEmoji = document.body.dataset.heartEmoji
    document.body.style.background = theme.bg
    // set dataset so background hearts use the day's emoji
    document.body.dataset.heartEmoji = theme.emoji
    return () => {
      document.body.style.background = previous
      if (previousEmoji) {
        document.body.dataset.heartEmoji = previousEmoji
      } else {
        delete document.body.dataset.heartEmoji
      }
    }
  }, [valentine])

  if (loading) {
    return (
      <main className="card">
        <h2>Loading valentine... 💌</h2>
      </main>
    )
  }

  if (error) {
    return (
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <main className="card">
          <h2>❌ {error}</h2>
        </main>
      </div>
    )
  }

  if (!valentine) {
    return (
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <main className="card">
          <h2>Valentine not found</h2>
        </main>
      </div>
    )
  }

  const theme = dayThemes[valentine.day] || dayThemes.valentinesday
  const templateDayMessage = (dayMessages[valentine.day] || '')

  function renderDayMessageWithHighlight(template, name){
    if(!template) return null
    const parts = template.split('[Name]')
    return (
      <span>
        {parts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx === parts.length - 1 ? null : <span className="highlight-name">{name}</span>}
          </span>
        ))}
      </span>
    )
  }

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0'}}>
      <main className="card">
        {templateDayMessage && (
          <p className="day-top-message"><span className="day-top-emoji">{theme.emoji}</span>{renderDayMessageWithHighlight(templateDayMessage, valentine.name)}</p>
        )}

        <h1 className="title">{valentine.message}</h1>

        {(valentine.imageUrl || theme.gif) && (
          <img className="gif" src={valentine.imageUrl || theme.gif} alt="Valentine" />
        )}

        {valentine.day === 'valentinesday' && !answered && (
        <div style={{display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', marginTop: '24px'}}>
          <button ref={yesBtnRef} className="btn yes" onClick={() => setAnswered(true)} style={{transform: `scale(${yesScale})`}}>
            Yes 💘
          </button>
          <div style={{width: '220px', maxWidth: '45%', flexShrink: 0}}></div>
          <button ref={noBtnRef} className="btn no">
            {noMsgIdx === 0 ? 'No' : noMessages[noMsgIdx - 1]}
          </button>
        </div>
        )}

        {valentine.day === 'valentinesday' && answered && (
          <div className="celebration-message">
            <p>🎉 Yay! You said YES! 🎉</p>
            <p className="celebration-emoji">💕✨🎊💖{theme.emoji}✨💕</p>
          </div>
        )}
        
        <footer style={{marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)'}}>
          Made with ❤ by <a href="https://www.instagram.com/y0ur_wellwisher" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
            <svg style={{width: '18px', height: '18px', verticalAlign: 'middle'}} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            y0ur_wellwisher
          </a>
        </footer>
      </main>
    </div>
  )
}
