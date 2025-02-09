from libgen_api_enhanced import LibgenSearch
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as origens (para desenvolvimento)


def search_libgen(query: str, search_type: str = "default"):
    s = LibgenSearch()
    try:
        if search_type == "title":
            results = s.search_title(query)
        elif search_type == "author":
            results = s.search_author(query)
        else:
            results = s.search_default(query)
        return results
    except Exception as e:
        print(f"Erro ao pesquisar na Libgen: {e}")
        return None  # Retorna None em caso de erro


def search_libgen_filtered(query: str, filters: dict, search_type: str = "title", exact_match: bool = True):
    tf = LibgenSearch()
    try:
        if search_type == "author":
            results = tf.search_author_filtered(query, filters, exact_match)
        else:
            results = tf.search_title_filtered(query, filters, exact_match)
        return results
    except Exception as e:
        print(f"Erro ao pesquisar na Libgen com filtros: {e}")
        return None

@app.route('/book/<id>', methods=['GET'])
def get_book(id):
    s = LibgenSearch()
    try:
        result = s.resolve_download_links({"ID": id, "Mirror_1": "dummy"})  # Passa um mirror dummy
        if not result:
            return jsonify({'error': 'Livro não encontrado'}), 404
        return jsonify(result)
    except Exception as e:
        print(f"Erro ao buscar detalhes do livro: {e}")
        return jsonify({'error': 'Erro interno do servidor'}), 500


@app.route('/search', methods=['GET'])
def search_api():
    query = request.args.get('query')
    search_type = request.args.get('type', 'default')  # Default search type

    if not query:
        return jsonify({'error': 'O parâmetro "query" é obrigatório.'}), 400

    results = search_libgen(query, search_type)

    if results is None:  # Se houve um erro na pesquisa
        return jsonify({'error': 'Erro ao pesquisar na Library Genesis.'}), 500

    return jsonify(results)



@app.route('/search_filtered', methods=['GET'])
def search_filtered_api():
    query = request.args.get('query')
    search_type = request.args.get('type', 'title')  # Default: title
    exact_match_str = request.args.get('exact_match', 'true')  # Default: true
    exact_match = exact_match_str.lower() == 'true'

    if not query:
        return jsonify({'error': 'O parâmetro "query" é obrigatório.'}), 400

    filters = {}
    for key, value in request.args.items():
        if key not in ['query', 'type', 'exact_match']:
            filters[key] = value

    results = search_libgen_filtered(query, filters, search_type, exact_match)

    if results is None:
        return jsonify({'error': 'Erro ao pesquisar na Library Genesis (filtrado).'}), 500

    return jsonify(results)



if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Executa em modo de depuração na porta 5000
