from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:root@127.0.0.1:3306/cognvox?charset=utf8mb4"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------- MODEL ---------------- #

class Ator(db.Model):
    __tablename__ = "ator"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(255))
    profissao = db.Column(db.String(100))
    sessao_ano = db.Column(db.Integer)
    inicio_intervencao = db.Column(db.Date)
    modalidade_ensino = db.Column(db.String(100))
    idioma = db.Column(db.String(50))
    instituicao = db.Column(db.String(255))
    endereco = db.Column(db.String(255))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(50))
    pais = db.Column(db.String(50))
    usuario = db.Column(db.String(100), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    grupo_acesso = db.Column(db.String(50), nullable=False)
    foto = db.Column(db.String(255))
    status = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "data_nascimento": self.data_nascimento.isoformat(),
            "email": self.email,
            "profissao": self.profissao,
            "sessao_ano": self.sessao_ano,
            "inicio_intervencao": self.inicio_intervencao.isoformat() if self.inicio_intervencao else None,
            "modalidade_ensino": self.modalidade_ensino,
            "idioma": self.idioma,
            "instituicao": self.instituicao,
            "endereco": self.endereco,
            "cidade": self.cidade,
            "estado": self.estado,
            "pais": self.pais,
            "usuario": self.usuario,
            "grupo_acesso": self.grupo_acesso,
            "foto": self.foto,
            "status": self.status
        }

with app.app_context():
    db.create_all()

# ---------------- LOGIN ---------------- #

@app.route("/login", methods=["POST"])
def login():
    dados = request.get_json()

    if not dados or "usuario" not in dados or "senha" not in dados:
        return jsonify({"erro": "Usuário e senha são obrigatórios"}), 400

    ator = Ator.query.filter_by(usuario=dados["usuario"]).first()

    if not ator or not check_password_hash(ator.senha_hash, dados["senha"]):
        return jsonify({"erro": "Credenciais inválidas"}), 401

    return jsonify({
        "mensagem": "Login realizado com sucesso",
        "usuario": ator.usuario,
        "grupo_acesso": ator.grupo_acesso
    })

# ---------------- CRUD ATOR ---------------- #

@app.route("/atores", methods=["GET"])
def listar_atores():
    atores = Ator.query.all()
    return jsonify([a.to_dict() for a in atores])

@app.route("/atores/<int:id>", methods=["GET"])
def obter_ator(id):
    ator = Ator.query.get_or_404(id)
    return jsonify(ator.to_dict())

@app.route("/atores", methods=["POST"])
def criar_ator():
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "Dados não enviados"}), 400

    ator = Ator(
        nome=dados["nome"],
        data_nascimento=dados["data_nascimento"],
        email=dados.get("email"),
        profissao=dados.get("profissao"),
        sessao_ano=dados.get("sessao_ano"),
        inicio_intervencao=dados.get("inicio_intervencao"),
        modalidade_ensino=dados.get("modalidade_ensino"),
        idioma=dados.get("idioma"),
        instituicao=dados.get("instituicao"),
        endereco=dados.get("endereco"),
        cidade=dados.get("cidade"),
        estado=dados.get("estado"),
        pais=dados.get("pais"),
        usuario=dados["usuario"],
        senha_hash=generate_password_hash(dados["senha"]),
        grupo_acesso=dados["grupo_acesso"],
        foto=dados.get("foto"),
        status=dados.get("status", "ATIVO")
    )

    db.session.add(ator)
    db.session.commit()

    return jsonify(ator.to_dict()), 201

@app.route("/atores/<int:id>", methods=["PUT"])
def editar_ator(id):
    ator = Ator.query.get_or_404(id)
    dados = request.get_json()

    for campo in dados:
        if campo == "senha":
            ator.senha_hash = generate_password_hash(dados["senha"])
        elif hasattr(ator, campo):
            setattr(ator, campo, dados[campo])

    db.session.commit()
    return jsonify(ator.to_dict())

@app.route("/atores/<int:id>", methods=["DELETE"])
def deletar_ator(id):
    ator = Ator.query.get_or_404(id)
    db.session.delete(ator)
    db.session.commit()
    return jsonify({"mensagem": "Ator deletado com sucesso"})

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
