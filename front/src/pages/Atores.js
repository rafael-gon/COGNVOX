import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Atores.css";

export default function Atores() {
  const navigate = useNavigate();
  const [atores, setAtores] = useState([]);

  const [filtroNome, setFiltroNome] = useState("");

  const [selMunicipio, setSelMunicipio] = useState("");
  const [selInstituicao, setSelInstituicao] = useState("");
  const [selModalidade, setSelModalidade] = useState("");
  const [selTipo, setSelTipo] = useState("");

  const [filtroMunicipio, setFiltroMunicipio] = useState("");
  const [filtroInstituicao, setFiltroInstituicao] = useState("");
  const [filtroModalidade, setFiltroModalidade] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    api.get("/atores").then(res => setAtores(res.data));
  }, []);

  const municipios = [...new Set(atores.map(a => a.cidade).filter(Boolean))];
  const instituicoes = [...new Set(atores.map(a => a.instituicao).filter(Boolean))];
  const modalidades = [...new Set(atores.map(a => a.modalidade_ensino).filter(Boolean))];
  const tipos = [...new Set(atores.map(a => a.grupo_acesso).filter(Boolean))];

  function aplicarFiltros() {
    setFiltroMunicipio(selMunicipio);
    setFiltroInstituicao(selInstituicao);
    setFiltroModalidade(selModalidade);
    setFiltroTipo(selTipo);
  }

  function limparFiltros() {
    setSelMunicipio("");
    setSelInstituicao("");
    setSelModalidade("");
    setSelTipo("");
    setFiltroMunicipio("");
    setFiltroInstituicao("");
    setFiltroModalidade("");
    setFiltroTipo("");
  }

  function apagarAtor(id) {
    if (!window.confirm("Deseja realmente apagar este ator?")) return;

    api.delete(`/atores/${id}`).then(() => {
      setAtores(atores.filter(a => a.id !== id));
    });
  }

  const atoresFiltrados = atores.filter(a =>
    a.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (!filtroMunicipio || a.cidade === filtroMunicipio) &&
    (!filtroInstituicao || a.instituicao === filtroInstituicao) &&
    (!filtroModalidade || a.modalidade_ensino === filtroModalidade) &&
    (!filtroTipo || a.grupo_acesso === filtroTipo)
  );

  return (
    <div className="geral">

      <div className="atoresSection">

        <div className="filtersCard">
          <div className="options">

            <select value={selMunicipio} onChange={e => setSelMunicipio(e.target.value)}>
              <option value="">Município</option>
              {municipios.map(m => <option key={m}>{m}</option>)}
            </select>

            <select value={selInstituicao} onChange={e => setSelInstituicao(e.target.value)}>
              <option value="">Instituição</option>
              {instituicoes.map(i => <option key={i}>{i}</option>)}
            </select>

            <select value={selModalidade} onChange={e => setSelModalidade(e.target.value)}>
              <option value="">Modalidade</option>
              {modalidades.map(m => <option key={m}>{m}</option>)}
            </select>

            <select value={selTipo} onChange={e => setSelTipo(e.target.value)}>
              <option value="">Tipo</option>
              {tipos.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>


          <div className="buttons">
            <button className="btnSecondary" onClick={aplicarFiltros}>
              Filtrar
            </button>
            <button className="btnLink" onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>


        </div>

        <span>
          <strong>{atoresFiltrados.length}</strong> registros
        </span>
        <div className="tableWrapper">
          <div className="tableHeader">
            <button className="newAtor" onClick={() => navigate("/atores/novo")}>Adicionar</button>
            <input
              className="searchInput"
              placeholder="🔍︎ Pesquisar por nome"
              value={filtroNome}
              onChange={e => setFiltroNome(e.target.value)}
            />
          </div>

          <table className="atoresTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cidade</th>
                <th>Instituição</th>
                <th>Modalidade</th>
                <th>Grupo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {atoresFiltrados.map(ator => (
                <tr key={ator.id}>
                  <td>{ator.id}</td>
                  <td>{ator.nome}</td>
                  <td>{ator.email}</td>
                  <td>{ator.cidade}</td>
                  <td>{ator.instituicao}</td>
                  <td>{ator.modalidade_ensino}</td>
                  <td>{ator.grupo_acesso}</td>
                  <td>{ator.status}</td>
                  <td className="actionsCell">
                    <button onClick={() => navigate(`/atores/${ator.id}/editar`)}>Editar</button>
                    <button onClick={() => apagarAtor(ator.id)}>Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>

  );
}
