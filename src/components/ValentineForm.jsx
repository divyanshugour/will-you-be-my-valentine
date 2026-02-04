import React, { useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../firebase'

export default function ValentineForm({ onLinkGenerated }) {
  const [formData, setFormData] = useState({
    name: '',
    day: 'roseday',
    imageUrl: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const days = [
    { value: 'proposeday', label: '🌷 Propose Day', color: 'proposeday' },
    { value: 'chocolateday', label: '🍫 Chocolate Day', color: 'chocolateday' },
    { value: 'teddyday', label: '🧸 Teddy Day', color: 'teddyday' },
    { value: 'promiseday', label: '🤝 Promise Day', color: 'promiseday' },
    { value: 'hugday', label: '🤗 Hug Day', color: 'hugday' },
    { value: 'kissday', label: '💋 Kiss Day', color: 'kissday' },
    { value: 'valentinesday', label: '💖 Valentine\'s Day', color: 'valentinesday' }
  ]

  function generateId() {
    return 'val_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Name and Message are required')
      setLoading(false)
      return
    }

    try {
      const valentineId = generateId()
      const valentineRef = ref(db, `valentines/${valentineId}`)
      await set(valentineRef, {
        ...formData,
        createdAt: new Date().toISOString()
      })
      onLinkGenerated(valentineId)
    } catch (err) {
      setError('Failed to create valentine: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <form className="valentine-form" onSubmit={handleSubmit}>
      <h2>Create Your Valentine 💌</h2>

      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Valentine Day</label>
        <select
          value={formData.day}
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
        >
          {days.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Image/GIF URL (optional)</label>
        <input
          type="url"
          placeholder="Paste image or GIF URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Personal Message</label>
        <textarea
          placeholder="Write your romantic message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          required
        />
      </div>

      {error && <div className="error-msg">{error}</div>}

      <button type="submit" className="btn yes" disabled={loading}>
        {loading ? 'Creating...' : 'Generate Link 💌'}
      </button>
    </form>
  )
}
