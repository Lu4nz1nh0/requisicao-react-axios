import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"

const NovaPessoa = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [urlAvatar, setUrlAvatar] = useState("")

    const savePessoa = async(event) => {
        event.preventDefault()

        const formData = new FormData(formRef.current)
       
        const name = formData.get("name")
        const endereco = formData.get("endereco")
        const cpf = formData.get("cpf")
        const telefone = formData.get("telefone")

        const user = {
            name: name,
            endereco: endereco,
            cpf: cpf,
            telefone: telefone
        }

        try {
            const {data} = await axios.post("https://65ec995d0ddee626c9b0a886.mockapi.io/api/v1/pessoas", user)

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
                    <h1>Nova Pessoa</h1>
                </div>

                <div className="col">
                    <form ref={formRef} onSubmit={savePessoa}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" name="name"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="endereco" className="form-label">Endereço</label>
                            <input type="text" className="form-control" id="endereco" name="endereco"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" name="cpf"/>
                        </div>

                        <div className="row">
                            <div className="mb-3 col col-md-8">
                                <label htmlFor="telefone" className="form-label">Telefone</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="telefone" name="telefone"
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

export default NovaPessoa

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