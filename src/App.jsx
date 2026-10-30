import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

/* ─── Target: 31 Oct 2026, 12:00 AM IST (UTC+5:30) ─── */
const TARGET_UTC = Date.UTC(2026, 9, 30, 18, 30, 0) // 31 Oct 00:00 IST = 30 Oct 18:30 UTC

function getTimeLeft() {
  const now = Date.now()
  const diff = TARGET_UTC - now
  if (diff <= 0) return null

  const totalSec = Math.floor(diff / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  return { days, hours, minutes, seconds }
}

/* ─── Floating Hearts ─────────────────────────────── */

function FloatingHearts() {
  const hearts = useMemo(() => {
    const emojis = ['💕', '💗', '💖', '💘', '♥', '💝', '🩷']
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${Math.random() * 100}%`,
      size: 0.8 + Math.random() * 1.2,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      opacity: 0.08 + Math.random() * 0.12,
    }))
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

/* ─── Clay Heart Illustration ─────────────────────── */

function ClayHeart() {
  return (
    <motion.div
      className="clay-heart-container"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 }}
    >
      <div className="clay-heart">
        <div className="clay-heart-shape" />
        <div className="clay-heart-highlight" />
      </div>
    </motion.div>
  )
}

/* ─── Countdown Number Block ──────────────────────── */

function CountdownBlock({ value, label, index }) {
  const display = String(value).padStart(2, '0')

  return (
    <motion.div
      className="countdown-block"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.5 + index * 0.12,
      }}
    >
      <div className="countdown-number-clay">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown-label">{label}</span>
    </motion.div>
  )
}

/* ─── App ─────────────────────────────────────────── */

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const birthdayReached = timeLeft === null

  return (
    <div className="app">
      <FloatingHearts />

      <div className="main-card">
        {/* ── Heading ── */}
        <motion.div
          className="heading-clay"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.1 }}
        >
          <h1 className="main-heading">
            {birthdayReached
              ? 'Happy Birthday, My Forever! ❤️'
              : 'Advance Happy Birthday, Manisha! ❤️'}
          </h1>
          {!birthdayReached && (
            <p className="subtitle">Your special day is almost here...</p>
          )}
        </motion.div>

        {/* ── Clay Heart ── */}
        <ClayHeart />

        {/* ── Countdown or Birthday Message ── */}
        <div className="countdown-section">
          {birthdayReached ? (
            <motion.div
              className="birthday-message-clay"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
            >
              <p className="birthday-reached-text">
                🎂 Today is your day, Manisha! 🎂
              </p>
            </motion.div>
          ) : (
            <div className="countdown-grid">
              <CountdownBlock value={timeLeft.days} label="Days" index={0} />
              <CountdownBlock value={timeLeft.hours} label="Hours" index={1} />
              <CountdownBlock value={timeLeft.minutes} label="Minutes" index={2} />
              <CountdownBlock value={timeLeft.seconds} label="Seconds" index={3} />
            </div>
          )}
        </div>

        {/* ── Forever Message ── */}
        <motion.div
          className="forever-clay"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.9 }}
        >
          <p className="forever-text">
            "Not just for today, not just for your birthday... I want to celebrate
            you in every lifetime. You're my forever. ❤️"
          </p>
        </motion.div>
      </div>
    </div>
  )
}
