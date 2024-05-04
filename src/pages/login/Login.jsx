import styled from "styled-components"
import Logo from '../../assets/logo_roxo.png'
import { useRef } from "react"
import { useAuth } from "../../AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {

    const formRef = useRef(null)
    const {LoginUser, user} = useAuth()
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData(formRef.current)
        const email = formData.get('email')
        const password = formData.get('password')

        //fazendo login
        const response = await LoginUser({email, password})

        if(response) {
            // vai pra tela home
            navigate('/')
        } else {
            // mostrar erro na tela
            setErrorMessage('E-mail ou senha inválido!')
            toast.error('Erro ao fazer login!')
        }
    }

    return (
        <Container >
            <div className="row justify-content-center">
                <form ref={formRef} onSubmit={submit} className="col-12 col-md-6 col-lg-4 formulario">
                    <div className="text-center mb-5">
                        <img src={Logo} alt="" />
                    </div>

                    <div className="form-floating mb-3">
                        <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">E-mail</label>
                    </div>
                    
                    <div className="form-floating">
                        <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary btn-lg">LOGIN</button>
                    </div>

                    <div className="text-danger">
                        {errorMessage}
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login

const Container = styled.section`
    background-color : #3b075b;
    height: 100vh;
    padding-top: 10%;

    .formulario {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        padding: 30px;
        border-radius: 8px;

        img {
            width: 200px;
        }

        .btn-primary {
            background-color: #A020F0;
            border: none;

            &:hover {
                background-color: #7f0dc6;
            }
        }
    }
`