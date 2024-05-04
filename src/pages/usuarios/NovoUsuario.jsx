import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"

const NovoUsuario = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [urlAvatar, setUrlAvatar] = useState("")

    const saveUser = async(event) => {
        event.preventDefault()

        const formData = new FormData(formRef.current)
       
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const avatar = formData.get("avatar")

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        }

        try {
            const {data} = await axios.post("https://65ec995d0ddee626c9b0a886.mockapi.io/api/v1/users", user)

            if(data.id) {
                toast.success("Usuário salvo com sucesso")
                navigate("/usuarios")
            }
        } catch (error) {
            toast.error("Erro ao salvar usuário")
        }
    }


    return(
        <UserContainer className="container">
            <div className="row">
                <div className="col-12 text-center mt-5">
                    <h1>Novo Usuário</h1>
                </div>

                <div className="col">
                    <form ref={formRef} onSubmit={saveUser}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" name="name"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="email" name="email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="password"/>
                        </div>

                        <div className="row">
                            <div className="mb-3 col col-md-8">
                                <label htmlFor="avatar" className="form-label">URL Avatar</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="avatar" name="avatar"
                                    onInput={e => setUrlAvatar(e.target.value)}
                                    />
                            </div>

                            <div className="col">
                                {urlAvatar && (
                                    <img className="avatar shadow" src={urlAvatar} alt="Imagem avatar" />
                                )}
                            </div>
                        </div>

                        <div className="col d-grid col-12 col-md-4">
                            <button  className="btn btn-primary">Salvar</button>
                        </div>
                    </form>     
                </div>
            </div>
        </UserContainer>
    )
}

export default NovoUsuario

const UserContainer = styled.div`
    .btn-primary {
        background-color: #A020F0;
        border: none;

        &:hover {
            background-color: #aa37f2;
        }
    }

    .avatar {
       height: 150px;
       width: 150px;
       border-radius: 50%;
       object-fit: cover;
       border: 2px solid #A020F0;
       padding: 5px;
    }
`