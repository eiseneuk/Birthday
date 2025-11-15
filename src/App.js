import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const MESSAGE_LINES = [
  'হ্যালো মায়া... আমি জানি তুমি আমাকে ঘৃণা করো 😂 কিন্তু আমি তোমাকে অনেক ভালোবাসি।',
  'এই দিনে আমি আশা করি তুমি যা কিছু কখনোই চেয়েছিলে সবই পাও।',
  'আমি আশা করি তুমি বাংলাদেশে দেখা সবচেয়ে শ্রেষ্ঠ আইনজীবী হয়ে উঠবে এবং ধীরে ধীরে একজন বিচারকও হয়ে উঠবে।',
  'যাই হোক, আমি জানি আমার বেশিরভাগ কথা তোমাকে বিরক্ত করবে, কিন্তু আমি চাই তুমি সর্বদা সুখী থেকো... যেকোন পরিস্থিতিতেই।',
  'আজকের দিনে আমি তোমার পাশে থাকতে পারিনি... তবু আশা করি এই ওয়েবসাইটটা সবসময় তোমার সাথে থাকবে।',
  'শুভ জন্মদিন, মায়া 💙'
];

export default function App() {
  const [stage, setStage] = useState('landing');
  const [typedText, setTypedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ytSrc, setYtSrc] = useState('');
  const [audioOnly, setAudioOnly] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (stage !== 'message') return;
    if (lineIndex >= MESSAGE_LINES.length) return;

    const currentLine = MESSAGE_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setTypedText((s) => s + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      }, 35 + Math.random() * 50);
      return () => clearTimeout(t);
    }

    const pause = setTimeout(() => {
      setTypedText((s) => s + '\n');
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 700);
    return () => clearTimeout(pause);
  }, [stage, lineIndex, charIndex]);

  useEffect(() => {
    if (lineIndex === MESSAGE_LINES.length) {
      setShowConfetti(true);
      setTimeout(() => setStage('final'), 1500);
    }
  }, [lineIndex]);

  function handleBegin() {
    setYtSrc('https://www.youtube-nocookie.com/embed/LDYVYGsmGsQ?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1');
    setAudioOnly(true);
    setStage('message');
  }

  function handleSurprise() {
    setShowConfetti(true);
  }

  return (
    <div className="app-root">
      {/* Vines background */}
      <Vines />

      <div className="container">
        {stage === 'landing' && (
          <div className="card landing">
            <h1 className="title english-text">Happy Birthday, Maya 💙</h1>
            <p className="subtitle english-text">A small surprise made with ❤️</p>
            <button className="btn english-text" onClick={handleBegin}>Click to Begin 🎁</button>
            <p className="hint english-text">(Tap the button to start music and the message)</p>
          </div>
        )}

        {stage === 'message' && (
          <div className="card message">
            <pre className="typing">{typedText}</pre>
            <div className="controls">
              <button className="btn ghost english-text" onClick={() => {
                setTypedText('');
                setLineIndex(0);
                setCharIndex(0);
              }}>Replay</button>
              <button className="btn english-text" onClick={handleSurprise}>A little surprise 💌</button>
            </div>
          </div>
        )}

        {stage === 'final' && (
          <div className="card final">
            <h2>শুভ জন্মদিন, মায়া 💙</h2>
            <p>তোমার জন্য সব শুভেচ্ছা।</p>
            <button className="btn english-text" onClick={() => {
              setStage('message');
              setTypedText('');
              setLineIndex(0);
              setCharIndex(0);
            }}>পুনরায় দেখুন</button>
          </div>
        )}

        <div className={`yt-wrap ${audioOnly ? 'audio' : ''}`} aria-hidden={ytSrc === ''}>
          {ytSrc && (
            <iframe
              title="birthday-music"
              src={ytSrc}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {showConfetti && <Confetti />}
      </div>

      <footer className="credit english-text">With love — from Goru, Chagol, Bhera</footer>
    </div>
  );
}

function Confetti() {
  const pieces = new Array(24).fill(0);
  return (
    <div className="confetti">
      {pieces.map((_, i) => (
        <span key={i} className={`piece p${i % 6}`} />
      ))}
    </div>
  );
}

function Vines() {
  return (
    <div className="vines">
      <div className="vine v1">
        <span className="leaf l1"></span>
        <span className="leaf l2"></span>
        <span className="leaf l3"></span>
      </div>
      <div className="vine v2">
        <span className="leaf l1"></span>
        <span className="leaf l2"></span>
      </div>
      <div className="vine v3">
        <span className="leaf l1"></span>
        <span className="leaf l2"></span>
        <span className="leaf l3"></span>
      </div>
      <div className="vine v4">
        <span className="leaf l1"></span>
        <span className="leaf l2"></span>
      </div>
      <div className="vine v5">
        <span className="leaf l1"></span>
      </div>
    </div>
  );
}
