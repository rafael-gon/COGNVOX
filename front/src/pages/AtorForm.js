import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./AtorForm.css"

export default function AtorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    sessao_ano: "",
    profissao: "",
    data_nascimento: "",
    inicio_intervencao: "",
    email: "",
    idioma: "",
    instituicao: "",
    endereco: "",
    cidade: "",
    estado: "",
    pais: "",
    modalidade_ensino: "",
    usuario: "",
    senha: "",
    grupo_acesso: "",
    status: "ativo",
    foto: ""
  });

  useEffect(() => {
    if (id) {
      api.get(`/atores/${id}`).then(res => {
        setForm({ ...res.data, senha: "" });
      });
    }
  }, [id]);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm({ ...form, foto: files[0]?.name || "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = { ...form };
    if (id && !payload.senha) delete payload.senha;

    const req = id
      ? api.put(`/atores/${id}`, payload)
      : api.post("/atores", payload);

    req.then(() => navigate("/atores"));
  }

  return (
    <div className="atorFormSection">
      <div className="atorForm">
        <h2>{id ? "Editar Ator" : "Cadastrar Ator"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="selections">

            <input type="file" name="foto" onChange={handleChange} />


            <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />

            <input name="sessao_ano" type="number" placeholder="Sessão/Ano" value={form.sessao_ano} onChange={handleChange} />

            <select name="profissao" value={form.profissao} onChange={handleChange}>
              <option value="" disabled>Selecione a profissão</option>
              <option value="Assistente Pedagógico (ARIS)">Assistente Pedagógico (ARIS)</option>
              <option value="Assistente Social">Assistente Social</option>
              <option value="Ator DI">Ator DI</option>
              <option value="Aux. de Escritório">Aux. de Escritório</option>
              <option value="Aux. de Limpeza">Aux. de Limpeza</option>
              <option value="Balconista">Balconista</option>
              <option value="Cozinheiro">Cozinheiro</option>
              <option value="Embalador">Embalador</option>
              <option value="Estoquista">Estoquista</option>
              <option value="Fonoaudióloga">Fonoaudióloga</option>
              <option value="Garçom">Garçom</option>
              <option value="Office-boy">Office-boy</option>
              <option value="Pedagogo">Pedagogo</option>
              <option value="Professor">Professor</option>
              <option value="Psicólogo">Psicólogo</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Repositor">Repositor</option>
              <option value="Terapeuta">Terapeuta</option>
              <option value="Par Interacional">Par Interacional</option>
              <option value="Pai ou Responsável">Pai ou Responsável</option>
              <option value="Outros">Outros</option>


            </select>

            <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} required />

            <input type="date" name="inicio_intervencao" value={form.inicio_intervencao} onChange={handleChange} />

            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />

            <select name="idioma" value={form.idioma} onChange={handleChange}>
              <option value="" disabled>Idioma</option>
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
            </select>

            <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
            <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />

            <select name="instituicao" value={form.instituicao} onChange={handleChange} >
              <option value="" disabled>Instituicao</option>
              <option value="Creche Alexandre dos Santos Oliveira">Creche Alexandre dos Santos Oliveira</option>
              <option value="Creche Denilma Bulhões">Creche Denilma Bulhões</option>
              <option value="Creche João Trajano dos Santos">Creche João Trajano dos Santos</option>
              <option value="Creche Lúcia Nogueira">Creche Lúcia Nogueira</option>
              <option value="Creche Maria Zenaide Rocha Santos">Creche Maria Zenaide Rocha Santos</option>
              <option value="Creche Menino Jesus">Creche Menino Jesus</option>
              <option value="Creche Professor Manoel Cecílio de Jesus">Creche Professor Manoel Cecílio de Jesus</option>
              <option value="Creche Rosete Andrade">Creche Rosete Andrade</option>
              <option value="Creche Vovó Judith">Creche Vovó Judith</option>
              <option value="Curso Formação Psicólogos">Curso Formação Psicólogos</option>
              <option value="Escola Antônio Cândido Toledo">Escola Antônio Cândido Toledo</option>
              <option value="Escola Barão de Penedo">Escola Barão de Penedo</option>
              <option value="Escola Cláudio Daniel Gama Amorim">Escola Cláudio Daniel Gama Amorim</option>
              <option value="Escola Côn. Teotônio Ribeiro">Escola Côn. Teotônio Ribeiro</option>
              <option value="Escola Dom Constantino Luers">Escola Dom Constantino Luers</option>
              <option value="Escola Eng. Guttemberg Brêda Breda Netto">Escola Eng. Guttemberg Brêda Breda Netto</option>
              <option value="Escola Fausto Ferreira Simões">Escola Fausto Ferreira Simões</option>
              <option value="Escola Francisco Amálio Maria">Escola Francisco Amálio Maria</option>
              <option value="Escola Francisco Araújo Azevedo">Escola Francisco Araújo Azevedo</option>
              <option value="Escola General de Góes Monteiro">Escola General de Góes Monteiro</option>
              <option value="Escola Hanna Bertholet">Escola Hanna Bertholet</option>
              <option value="Escola Irmã Jolenta">Escola Irmã Jolenta</option>
              <option value="Escola Isabel Cristina Alves Toledo">Escola Isabel Cristina Alves Toledo</option>
              <option value="Escola João XXIII">Escola João XXIII</option>
              <option value="Escola Josef Bergman">Escola Josef Bergman</option>
              <option value="Escola José Buarque da Silva">Escola José Buarque da Silva</option>
              <option value="Escola José de Carvalho Souza">Escola José de Carvalho Souza</option>
              <option value="Escola Liege Gama Rocha">Escola Liege Gama Rocha</option>
              <option value="Escola Manoel Tavares">Escola Manoel Tavares</option>
              <option value="Escola Maria da Glória Pimenteira">Escola Maria da Glória Pimenteira</option>
              <option value="Escola Nossa Sra. do Mont Serrat">Escola Nossa Sra. do Mont Serrat</option>
              <option value="Escola Paulo VI">Escola Paulo VI</option>
              <option value="Escola Professor Arlindo Ferreira de Moraes">Escola Professor Arlindo Ferreira de Moraes</option>
              <option value="Escola Professor Douglas Apratto Tenório">Escola Professor Douglas Apratto Tenório</option>
              <option value="Escola Professor Irênio Araújo">Escola Professor Irênio Araújo</option>
              <option value="Escola Professor Pedro Augusto Carneiro Leão">Escola Professor Pedro Augusto Carneiro Leão</option>
              <option value="Escola Professora Helena de O. de Carvalho">Escola Professora Helena de O. de Carvalho</option>
              <option value="Escola Professora Maria Rocha Santos Silva">Escola Professora Maria Rocha Santos Silva</option>
              <option value="Escola Rotary">Escola Rotary</option>
              <option value="Escola Santa Ana">Escola Santa Ana</option>
              <option value="Escola Santa Cândida">Escola Santa Cândida</option>
              <option value="Escola Santa Luzia">Escola Santa Luzia</option>
              <option value="Escola Santa Sofia">Escola Santa Sofia</option>
              <option value="Escola Santa Terezinha">Escola Santa Terezinha</option>
              <option value="Escola Santo Antônio">Escola Santo Antônio</option>
              <option value="Escola São João Batista">Escola São João Batista</option>
              <option value="Escola São Rafael">Escola São Rafael</option>
              <option value="ESCOLA TESTE">ESCOLA TESTE</option>
              <option value="Escola Ver. José da Costa Mangabeira">Escola Ver. José da Costa Mangabeira</option>
              <option value="Escola Ver. José Wilson Melo Nascimento">Escola Ver. José Wilson Melo Nascimento</option>
              <option value="Escola Ver. Manoel Soares de Melo">Escola Ver. Manoel Soares de Melo</option>
              <option value="Escola Wilton Lisboa Lucena">Escola Wilton Lisboa Lucena</option>
            </select>
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AM">AM</option>
              <option value="AP">AP</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MG">MG</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="PR">PR</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="RS">RS</option>
              <option value="SC">SC</option>
              <option value="SE">SE</option>
              <option value="SP">SP</option>
              <option value="TO">TO</option>
            </select>

            <input name="pais" placeholder="País" value={form.pais} onChange={handleChange} />

            <select name="modalidade_ensino" value={form.modalidade_ensino} onChange={handleChange}>
              <option value="" disable>modalidade de ensino</option>
              <option value="Creche II-B-Tarde">Creche II-B-Tarde</option>
              <option value="1º Ano - A - Manhã">1º Ano - A - Manhã</option>
              <option value="1º Ano - A - Tarde">1º Ano - A - Tarde</option>
              <option value="1º Ano - B - Manhã">1º Ano - B - Manhã</option>
              <option value="1º Ano - B - Tarde">1º Ano - B - Tarde</option>
              <option value="1º Ano - C - Tarde">1º Ano - C - Tarde</option>
              <option value="1º Ano - D - Tarde">1º Ano - D - Tarde</option>
              <option value="1º Ano - E - Tarde">1º Ano - E - Tarde</option>
              <option value="1º Ano-A-Manhã">1º Ano-A-Manhã</option>
              <option value="1º Ano-A-Tarde">1º Ano-A-Tarde</option>
              <option value="1º Ano-B-Manhã">1º Ano-B-Manhã</option>
              <option value="1º Ano-B-Tarde">1º Ano-B-Tarde</option>
              <option value="1º Ano-C-Tarde">1º Ano-C-Tarde</option>
              <option value="1º Ano-D-Tarde">1º Ano-D-Tarde</option>
              <option value="2º Ano - A - Manhã">2º Ano - A - Manhã</option>
              <option value="2º Ano - A - Tarde">2º Ano - A - Tarde</option>
              <option value="2º Ano - B - Manhã">2º Ano - B - Manhã</option>
              <option value="2º Ano - B - Tarde">2º Ano - B - Tarde</option>
              <option value="2º Ano - C - Manhã">2º Ano - C - Manhã</option>
              <option value="2º Ano - C - Tarde">2º Ano - C - Tarde</option>
              <option value="2º Ano - D - Tarde">2º Ano - D - Tarde</option>
              <option value="2º Ano - E - Manhã">2º Ano - E - Manhã</option>
              <option value="2º Ano - E - Tarde">2º Ano - E - Tarde</option>
              <option value="2º Ano-A-Manhã">2º Ano-A-Manhã</option>
              <option value="2º Ano-A-Tarde">2º Ano-A-Tarde</option>
              <option value="2º Ano-B-Manhã">2º Ano-B-Manhã</option>
              <option value="2º Ano-B-Tarde">2º Ano-B-Tarde</option>
              <option value="2º Ano-C-Tarde">2º Ano-C-Tarde</option>
              <option value="2º Ano-D-Tarde">2º Ano-D-Tarde</option>
              <option value="3º Ano  - A - Tarde">3º Ano  - A - Tarde</option>
              <option value="3º Ano - A - Manhã">3º Ano - A - Manhã</option>
              <option value="3º Ano - A - Tarde">3º Ano - A - Tarde</option>
              <option value="3º Ano - B - Manhã">3º Ano - B - Manhã</option>
              <option value="3º Ano - B - Tarde">3º Ano - B - Tarde</option>
              <option value="3º Ano - C - Tarde">3º Ano - C - Tarde</option>
              <option value="3º Ano - D - Manhã">3º Ano - D - Manhã</option>
              <option value="3º Ano - D - Tarde">3º Ano - D - Tarde</option>
              <option value="3º Ano-A-Manhã">3º Ano-A-Manhã</option>
              <option value="3º Ano-A-Tarde">3º Ano-A-Tarde</option>
              <option value="3º Ano-B-Manhã">3º Ano-B-Manhã</option>
              <option value="3º Ano-B-Tarde">3º Ano-B-Tarde</option>
              <option value="3º Ano-C-Tarde">3º Ano-C-Tarde</option>
              <option value="4º Ano - A - Manhã">4º Ano - A - Manhã</option>
              <option value="4º Ano - A - Tarde">4º Ano - A - Tarde</option>
              <option value="4º Ano - B - Manhã">4º Ano - B - Manhã</option>
              <option value="4º Ano - B - Tarde">4º Ano - B - Tarde</option>
              <option value="4º Ano - C - Manhã">4º Ano - C - Manhã</option>
              <option value="4º Ano - C - Tarde">4º Ano - C - Tarde</option>
              <option value="4º Ano - D - Tarde">4º Ano - D - Tarde</option>
              <option value="4º Ano-A-Manhã">4º Ano-A-Manhã</option>
              <option value="4º Ano-A-Tarde">4º Ano-A-Tarde</option>
              <option value="4º Ano-B-Manhã">4º Ano-B-Manhã</option>
              <option value="4º Ano-B-Tarde">4º Ano-B-Tarde</option>
              <option value="4º Ano-C-Tarde">4º Ano-C-Tarde</option>
              <option value="4º Ano-D-Tarde">4º Ano-D-Tarde</option>
              <option value="4º Ano-E-Tarde">4º Ano-E-Tarde</option>
              <option value="5º Ano - A - Manhã">5º Ano - A - Manhã</option>
              <option value="5º Ano - A - Tarde">5º Ano - A - Tarde</option>
              <option value="5º Ano - B - Manhã">5º Ano - B - Manhã</option>
              <option value="5º Ano - B - Tarde">5º Ano - B - Tarde</option>
              <option value="5º Ano - C - Manhã">5º Ano - C - Manhã</option>
              <option value="5º Ano - C - Tarde">5º Ano - C - Tarde</option>
              <option value="5º Ano - D - Tarde">5º Ano - D - Tarde</option>
              <option value="5º Ano-A-Manhã">5º Ano-A-Manhã</option>
              <option value="5º Ano-A-Tarde">5º Ano-A-Tarde</option>
              <option value="5º Ano-B-Manhã">5º Ano-B-Manhã</option>
              <option value="5º Ano-B-Tarde">5º Ano-B-Tarde</option>
              <option value="5º Ano-C-Tarde">5º Ano-C-Tarde</option>
              <option value="5º Ano-D-Tarde">5º Ano-D-Tarde</option>
              <option value="6º Ano - A - Manhã">6º Ano - A - Manhã</option>
              <option value="6º Ano - A - Tarde">6º Ano - A - Tarde</option>
              <option value="6º Ano - B - Manhã">6º Ano - B - Manhã</option>
              <option value="6º Ano - B - Manhã">6º Ano - B - Manhã</option>
              <option value="6º Ano - B - Tarde">6º Ano - B - Tarde</option>
              <option value="6º Ano - C - Manhã">6º Ano - C - Manhã</option>
              <option value="6º Ano - C - Manhã">6º Ano - C - Manhã</option>
              <option value="6º Ano - C - Tarde">6º Ano - C - Tarde</option>
              <option value="6º Ano - D - Manhã">6º Ano - D - Manhã</option>
              <option value="6º Ano - D - Manhã">6º Ano - D - Manhã</option>
              <option value="6º Ano - D - Tarde">6º Ano - D - Tarde</option>
              <option value="6º Ano - E - Manhã">6º Ano - E - Manhã</option>
              <option value="6º Ano-A-Manhã">6º Ano-A-Manhã</option>
              <option value="6º Ano-A-Tarde">6º Ano-A-Tarde</option>
              <option value="6º Ano-B-Manhã">6º Ano-B-Manhã</option>
              <option value="6º Ano-B-Tarde">6º Ano-B-Tarde</option>
              <option value="6º Ano-C-Manhã">6º Ano-C-Manhã</option>
              <option value="6º Ano-C-Tarde">6º Ano-C-Tarde</option>
              <option value="6º Ano-D-Tarde">6º Ano-D-Tarde</option>
              <option value="6º Ano-E-Tarde">6º Ano-E-Tarde</option>
              <option value="7º Ano - A - Manhã">7º Ano - A - Manhã</option>
              <option value="7º Ano - A - Manhã">7º Ano - A - Manhã</option>
              <option value="7º Ano - A - Tarde">7º Ano - A - Tarde</option>
              <option value="7º Ano - B - Manhã">7º Ano - B - Manhã</option>
              <option value="7º Ano - B - Manhã">7º Ano - B - Manhã</option>
              <option value="7º Ano - B - Tarde">7º Ano - B - Tarde</option>
              <option value="7º Ano - C - Manhã">7º Ano - C - Manhã</option>
              <option value="7º Ano - C - Tarde">7º Ano - C - Tarde</option>
              <option value="7º Ano - D - Manhã">7º Ano - D - Manhã</option>
              <option value="7º Ano - D - Tarde">7º Ano - D - Tarde</option>
              <option value="7º Ano - E - Manhã">7º Ano - E - Manhã</option>
              <option value="7º Ano - F - Tarde">7º Ano - F - Tarde</option>
              <option value="7º Ano-A-Manhã">7º Ano-A-Manhã</option>
              <option value="7º Ano-A-Tarde">7º Ano-A-Tarde</option>
              <option value="7º Ano-B-Manhã">7º Ano-B-Manhã</option>
              <option value="7º Ano-B-Tarde">7º Ano-B-Tarde</option>
              <option value="7º Ano-C-Manhã">7º Ano-C-Manhã</option>
              <option value="7º Ano-C-Tarde">7º Ano-C-Tarde</option>
              <option value="7º Ano-D-Tarde">7º Ano-D-Tarde</option>
              <option value="7º Ano-E-Tarde">7º Ano-E-Tarde</option>
              <option value="8º Ano - A - Manhã">8º Ano - A - Manhã</option>
              <option value="8º Ano - A - Tarde">8º Ano - A - Tarde</option>
              <option value="8º Ano - B - Manhã">8º Ano - B - Manhã</option>
              <option value="8º Ano - B - Tarde">8º Ano - B - Tarde</option>
              <option value="8º Ano - C - Manhã">8º Ano - C - Manhã</option>
              <option value="8º Ano - C - Tarde">8º Ano - C - Tarde</option>
              <option value="8º Ano - D - Manhã">8º Ano - D - Manhã</option>
              <option value="8º Ano - D - Tarde">8º Ano - D - Tarde</option>
              <option value="8º Ano - E - Manhã">8º Ano - E - Manhã</option>
              <option value="8º Ano-A-Manhã">8º Ano-A-Manhã</option>
              <option value="8º Ano-A-Tarde">8º Ano-A-Tarde</option>
              <option value="8º Ano-B-Manhã">8º Ano-B-Manhã</option>
              <option value="8º Ano-C-Manhã">8º Ano-C-Manhã</option>
              <option value="8º Ano-D-Tarde">8º Ano-D-Tarde</option>
              <option value="8º Ano-E-Tarde">8º Ano-E-Tarde</option>
              <option value="9º Ano - A - Manhã">9º Ano - A - Manhã</option>
              <option value="9º Ano - A - Tarde">9º Ano - A - Tarde</option>
              <option value="9º Ano - A - Tarde">9º Ano - A - Tarde</option>
              <option value="9º Ano - B - Manhã">9º Ano - B - Manhã</option>
              <option value="9º Ano - B - Tarde">9º Ano - B - Tarde</option>
              <option value="9º Ano - C - Manhã">9º Ano - C - Manhã</option>
              <option value="9º Ano - C - Tarde">9º Ano - C - Tarde</option>
              <option value="9º Ano - E - Tarde">9º Ano - E - Tarde</option>
              <option value="9º Ano-A-Manhã">9º Ano-A-Manhã</option>
              <option value="9º Ano-A-Tarde">9º Ano-A-Tarde</option>
              <option value="9º Ano-B-Manhã">9º Ano-B-Manhã</option>
              <option value="9º Ano-C-Tarde">9º Ano-C-Tarde</option>
              <option value="9º Ano-D-Tarde">9º Ano-D-Tarde</option>
              <option value="9º Ano-E-Tarde">9º Ano-E-Tarde</option>
              <option value="C2-A-Manhã">C2-A-Manhã</option>
              <option value="C3-A-Tarde">C3-A-Tarde</option>
              <option value="Creche I-A-Manhã">Creche I-A-Manhã</option>
              <option value="Creche I-B-Manhã">Creche I-B-Manhã</option>
              <option value="Creche II - A - Manhã">Creche II - A - Manhã</option>
              <option value="Creche II - C - Tarde">Creche II - C - Tarde</option>
              <option value="Creche II-A-Integral">Creche II-A-Integral</option>
              <option value="Creche II-A-Manhã">Creche II-A-Manhã</option>
              <option value="Creche II-A-Tarde">Creche II-A-Tarde</option>
              <option value="Creche II-C-Tarde">Creche II-C-Tarde</option>
              <option value="Creche III - A - Manhã">Creche III - A - Manhã</option>
              <option value="Creche III-A-Integral">Creche III-A-Integral</option>
              <option value="Creche III-A-Manhã">Creche III-A-Manhã</option>
              <option value="Creche III-A-Tarde">Creche III-A-Tarde</option>
              <option value="Creche III-B-Manhã">Creche III-B-Manhã</option>
              <option value="Creche III-B-Tarde">Creche III-B-Tarde</option>
              <option value="Creche III-C-Manhã">Creche III-C-Manhã</option>
              <option value="EJA - A - Noite">EJA - A - Noite</option>
              <option value="EJA-A-Noite">EJA-A-Noite</option>
              <option value="Jardim I - A - Manhã">Jardim I - A - Manhã</option>
              <option value="Jardim I - B - Manhã">Jardim I - B - Manhã</option>
              <option value="Jardim I - B - Tarde">Jardim I - B - Tarde</option>
              <option value="Jardim I - C - Tarde">Jardim I - C - Tarde</option>
              <option value="Jardim I-A-Integral">Jardim I-A-Integral</option>
              <option value="Jardim I-A-Manhã">Jardim I-A-Manhã</option>
              <option value="Jardim I-A-Tarde">Jardim I-A-Tarde</option>
              <option value="Jardim I-B-Tarde">Jardim I-B-Tarde</option>
              <option value="Jardim II - A - Manhã">Jardim II - A - Manhã</option>
              <option value="Jardim II - A - Tarde">Jardim II - A - Tarde</option>
              <option value="Jardim II - B - Tarde">Jardim II - B - Tarde</option>
              <option value="Jardim II - C - Tarde">Jardim II - C - Tarde</option>
              <option value="Jardim II-A-Integral">Jardim II-A-Integral</option>
              <option value="Jardim II-A-Manhã">Jardim II-A-Manhã</option>
              <option value="Jardim II-A-Tarde">Jardim II-A-Tarde</option>
              <option value="Jardim II-B-Tarde">Jardim II-B-Tarde</option>
              <option value="Jardim II-C-Tarde">Jardim II-C-Tarde</option>
              <option value="Maternal I - A - Integral">Maternal I - A - Integral</option>
              <option value="Maternal I - B - Integral">Maternal I - B - Integral</option>
              <option value="Maternal I-A-Manhã">Maternal I-A-Manhã</option>
              <option value="Maternal I-B-Tarde">Maternal I-B-Tarde</option>
              <option value="Maternal II - A - Integral">Maternal II - A - Integral</option>
              <option value="Maternal II - A - Manhã">Maternal II - A - Manhã</option>
              <option value="Maternal II - B - Integral">Maternal II - B - Integral</option>
              <option value="Maternal II - B - Manhã">Maternal II - B - Manhã</option>
              <option value="Maternal II - B - Tarde">Maternal II - B - Tarde</option>
              <option value="Maternal II - C - Manhã">Maternal II - C - Manhã</option>
              <option value="Maternal II-D-Manhã">Maternal II-D-Manhã</option>
              <option value="Maternal II-E-Tarde">Maternal II-E-Tarde</option>
              <option value="MODALIDADE COGNVOX">MODALIDADE COGNVOX</option>
              <option value="Pré-Escola 1 - A - Manhã">Pré-Escola 1 - A - Manhã</option>
              <option value="Pré-Escola 1 - C - Tarde">Pré-Escola 1 - C - Tarde</option>
              <option value="Pré-Escola 1 - D - Tarde">Pré-Escola 1 - D - Tarde</option>
              <option value="Pré-Escola 1 - E - Tarde">Pré-Escola 1 - E - Tarde</option>
              <option value="Pré-Escola 1-A-Integral">Pré-Escola 1-A-Integral</option>
              <option value="Pré-Escola 1-A-Manhã">Pré-Escola 1-A-Manhã</option>
              <option value="Pré-Escola 1-A-Tarde">Pré-Escola 1-A-Tarde</option>
              <option value="Pré-Escola 1-B-Manhã">Pré-Escola 1-B-Manhã</option>
              <option value="Pré-Escola 1-B-Tarde">Pré-Escola 1-B-Tarde</option>
              <option value="Pré-Escola 1-C-Manhã">Pré-Escola 1-C-Manhã</option>
              <option value="Pré-Escola 1-C-Tarde">Pré-Escola 1-C-Tarde</option>
              <option value="Pré-Escola 1-D-Tarde">Pré-Escola 1-D-Tarde</option>
              <option value="Pré-Escola 1-E-Tarde">Pré-Escola 1-E-Tarde</option>
              <option value="Pré-Escola 2 - A - Manhã">Pré-Escola 2 - A - Manhã</option>
              <option value="Pré-Escola 2 - B - Tarde">Pré-Escola 2 - B - Tarde</option>
              <option value="Pré-Escola 2 - C - Manhã">Pré-Escola 2 - C - Manhã</option>
              <option value="Pré-Escola 2 - C - Tarde">Pré-Escola 2 - C - Tarde</option>
              <option value="Pré-Escola 2 - D - Tarde">Pré-Escola 2 - D - Tarde</option>
              <option value="Pré-Escola 2 - E - Tarde">Pré-Escola 2 - E - Tarde</option>
              <option value="Pré-Escola 2-A-Manhã">Pré-Escola 2-A-Manhã</option>
              <option value="Pré-Escola 2-A-Tarde">Pré-Escola 2-A-Tarde</option>
              <option value="Pré-Escola 2-B-Manhã">Pré-Escola 2-B-Manhã</option>
              <option value="Pré-Escola 2-B-Tarde">Pré-Escola 2-B-Tarde</option>
              <option value="Pré-Escola 2-C-Tarde">Pré-Escola 2-C-Tarde</option>
              <option value="Pré-Escola 2-D-Tarde">Pré-Escola 2-D-Tarde</option>
              <option value="PROFISSIONAL 1">PROFISSIONAL 1</option>
            </select>



            <select name="grupo_acesso" value={form.grupo_acesso} onChange={handleChange} required>
              <option value="" disabled>Grupo de Acesso</option>
              <option value="Administrador" >Administrador</option>
              <option value="Administradores COGNVOX" >Administradores COGNVOX</option>
              <option value="Aluno DI" >Aluno DI</option>
              <option value="Aluno Interacional" >Aluno Interacional</option>
              <option value="Aluno Profissional" >Aluno Profissional</option>
              <option value="Apoio Técnico Pedagógico" >Apoio Técnico Pedagógico</option>
              <option value="Assistente Pedagógico (ARIS)" >Assistente Pedagógico (ARIS)</option>
              <option value="Assistente Social" >Assistente Social</option>
              <option value="Coordenadora de Inclusão" >Coordenadora de Inclusão</option>
              <option value="Coordenadores" >Coordenadores</option>
              <option value="Estagiário Pedagogia" >Estagiário Pedagogia</option>
              <option value="Help Desk" >Help Desk</option>
              <option value="Pai ou Responsável" >Pai ou Responsável</option>
              <option value="Professores" >Professores</option>
              <option value="PSICOLOGOS_EAD" >PSICOLOGOS_EAD</option>
              <option value="Psicólogo Supervisor" >Psicólogo Supervisor</option>
              <option value="Psicólogos" >Psicólogos</option>
              <option value="Suporte" >Suporte</option>
            </select>

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>

            <input name="usuario" placeholder="Usuário" value={form.usuario} onChange={handleChange} required />
            <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />

          </div>

          <div className="buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => navigate("/atores")}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
