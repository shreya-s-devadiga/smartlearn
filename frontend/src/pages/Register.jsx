import React, {useState} from 'react'
import { register } from '../services_api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const nav = useNavigate()
  const [form, setForm] = useState({fullname:'', email:'', username:'', password:'', confirmPassword:''})
  const [err, setErr] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    if(form.password !== form.confirmPassword){ setErr('Passwords do not match'); return }
    try{
      await register({fullname:form.fullname, email:form.email, username:form.username, password: form.password})
      nav('/login')
    }catch(e){
      setErr('Registration failed')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3 className="mb-3">Create Account 🌻</h3>
          <form onSubmit={submit}>
            {['fullname','email','username'].map(field=>(
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input className="form-control" type={field==='email'?'email':'text'}
                  value={form[field]} onChange={e=>setForm({...form,[field]:e.target.value})}/>
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={form.confirmPassword} onChange={e=>setForm({...form, confirmPassword:e.target.value})}/>
            </div>
            {err && <div className="alert alert-danger">{err}</div>}
            <button className="btn btn-success">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}