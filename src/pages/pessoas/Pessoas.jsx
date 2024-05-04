import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([])

  const listarPessoas = async() => {
    try {
      const {data} = await axios.get("https://65ec995d0ddee626c9b0a886.mockapi.io/api/v1/pessoas")
      setPessoas(data)
    } catch (error) {
      toast.error("Erro ao buscar pessoas")
    }
  }

  const deletePessoa = async(id) => {
    try {
      const {data} = await axios.delete(`https://65ec995d0ddee626c9b0a886.mockapi.io/api/v1/pessoas/${id}`)

      if(data.id) {
        toast.success("Pessoa removido com sucesso")
        const novaLista = pessoas.filter(item => item.id !== id)
        setPessoas(novaLista)
      } else {
        toast.error("Erro ao excluir pessoa")
      }
    } catch (error) {
      toast.error("Erro ao excluir pessoa")
    }
  }

  useEffect(() => {
    listarPessoas()
  },[])
  
  return(
    <div className="container">
        <div className="row">
            <div className="col text-center">
                <h1>Pessoas</h1>
            </div>

            <div className="col-12">
              <div>
                <Link to="/pessoas/novo">
                  <button className="btn btn-primary">Adicionar</button>
                </Link>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col"> Endereço</th>
                    <th scope="col"> CPF</th>
                    <th scope="col"> Telefone</th>
                    <th scope="col">Ações</th>                    
                  </tr>
                </thead>
                <tbody>
                  {
                    pessoas.map(item => (
                      <tr key={item.id}>
                        <td >{item.name}</td>
                        <td>{item.endereco}</td>
                        <td>{item.cpf}</td>
                        <td>{item.telefone}</td>
                        <td>
                          <Link to={`/pessoas/${item.id}`}>
                           <button className="btn btn-outline-primary btn-sm" ><FaEdit /></button>
                          </Link>
                          <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => deletePessoa(item.id) } ><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default Pessoas