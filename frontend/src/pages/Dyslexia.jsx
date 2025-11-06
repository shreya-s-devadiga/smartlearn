import React, {useState} from 'react'

const activities = {
  'letter-sounds': {
    title: 'Letter Sounds Match',
    description: 'Match the letter with its sound',
    words: [
      { display: 'A', correct: 'Apple', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
      { display: 'B', correct: 'Ball', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
      { display: 'C', correct: 'Cat', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
      { display: 'D', correct: 'Dog', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
      { display: 'M', correct: 'Moon', options: ['Moon', 'Nest', 'Orange', 'Pen'] }
    ]
  },
  'rhyming': {
    title: 'Rhyming Words',
    description: 'Find the word that rhymes with the displayed word',
    words: [
      { display: 'CAT', correct: 'HAT', options: ['DOG', 'HAT', 'CAR', 'BED'] },
      { display: 'FAN', correct: 'PAN', options: ['PAN', 'PEN', 'FUN', 'FIN'] },
      { display: 'BELL', correct: 'WELL', options: ['WALL', 'WELL', 'BALL', 'BILL'] },
      { display: 'CLOCK', correct: 'BLOCK', options: ['BLOCK', 'CLICK', 'CLACK', 'CLOAK'] },
      { display: 'RAIN', correct: 'TRAIN', options: ['TRAIN', 'RING', 'ROAD', 'RUNE'] }
    ]
  }
}

export default function Dyslexia(){
  const [type, setType] = useState('letter-sounds')
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')

  const current = activities[type].words[index]

  const choose = (opt)=>{
    if(opt === current.correct){ setScore(s=>s+1); setFeedback('✅ Correct!') }
    else setFeedback(`❌ Not quite. Correct: ${current.correct}`)
  }

  const next = ()=>{
    if(index < activities[type].words.length -1){
      setIndex(i=>i+1); setFeedback('')
    } else {
      setFeedback(`🏁 Done! Score: ${score}/${activities[type].words.length}`)
    }
  }

  return (
    <div>
      <h2 className="mb-3">Dyslexia Aid 🧩</h2>
      <div className="mb-3">
        <button className={`btn me-2 ${type==='letter-sounds'?'btn-primary':'btn-outline-primary'}`} onClick={()=>{setType('letter-sounds'); setIndex(0); setScore(0); setFeedback('')}}>Letter Sounds</button>
        <button className={`btn ${type==='rhyming'?'btn-primary':'btn-outline-primary'}`} onClick={()=>{setType('rhyming'); setIndex(0); setScore(0); setFeedback('')}}>Rhyming</button>
      </div>

      <div className="card p-3">
        <h4>{activities[type].title}</h4>
        <p className="text-muted">{activities[type].description}</p>
        <div className="display-4 my-3 text-center">{current.display}</div>
        <div className="row g-2">
          {current.options.map(o=>(
            <div key={o} className="col-6 col-md-3">
              <button className="btn btn-outline-secondary w-100" onClick={()=>choose(o)}>{o}</button>
            </div>
          ))}
        </div>
        <p className="mt-3">{feedback}</p>
        <button className="btn btn-success mt-2" onClick={next}>Next</button>
      </div>
    </div>
  )
}