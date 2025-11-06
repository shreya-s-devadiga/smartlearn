import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services_api'

export default function Login(){
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await login({username, password})
      localStorage.setItem('user', JSON.stringify(res.data))
      nav('/dashboard')
    }catch(e){
      setErr('Invalid credentials or server error.')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4">
          <h3 className="mb-3">Login</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            {err && <div className="alert alert-danger">{err}</div>}
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}