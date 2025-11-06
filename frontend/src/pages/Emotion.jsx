import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import { sendSupport } from '../services_api'

export default function Emotion(){
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [emotion, setEmotion] = useState('detecting...')
  const [message, setMessage] = useState('')
  const [solution, setSolution] = useState('')

  useEffect(()=>{
    const load = async ()=>{
      const base = '/src/assets/models'
      try{
        await faceapi.nets.tinyFaceDetector.loadFromUri(base)
        await faceapi.nets.faceExpressionNet.loadFromUri(base)
      }catch(e){
        console.warn('Models not found. Put models in /src/assets/models', e)
      }
      startVideo()
    }
    load()
  }, [])

  const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video:{}}).then(stream=>{
      if(videoRef.current){ videoRef.current.srcObject = stream }
    })
  }

  const analyze = async ()=>{
    if(!videoRef.current) return
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions()
    if(detections.length>0){
      const mood = Object.entries(detections[0].expressions).sort((a,b)=>b[1]-a[1])[0][0]
      setEmotion(mood)
    }
  }

  useEffect(()=>{
    const id = setInterval(analyze, 1500)
    return ()=> clearInterval(id)
  }, [])

  const onSupport = async ()=>{
    const res = await sendSupport({emotion, userMsg: message})
    setSolution(res.data.solution)
  }

  return (
    <div>
      <h2>How are you feeling today?</h2>
      <video ref={videoRef} width="320" height="240" autoPlay muted className="border rounded"></video>
      <p className="mt-2">Detected Mood: <strong>{emotion}</strong></p>

      <div className="card p-3 mt-3">
        <h5>Share your thoughts 💬</h5>
        <textarea className="form-control" rows="3" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us what's bothering you..."></textarea>
        <button className="btn btn-primary mt-2" onClick={onSupport}>Get Support</button>
        {solution && <div className="alert alert-success mt-2">💡 {solution}</div>}
      </div>
    </div>
  )
}