import React from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

export const LoginScreen = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/', {
      replace: true
    });
  }



  return (

    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h3 className="card-title text-center mb-5 fw fs-3">Iniciar Sesión</h3>
            <form>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Usuario</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Contraseña</label>
              </div>

              
              <br></br>
              <br></br>

              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Log
                  in</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
