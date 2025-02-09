import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const type = searchParams.get('type') || 'title'; // Valor padrão
    const exactMatch = searchParams.get('exact_match') || 'true'; // Valor padrão

    if (!query) {
      return NextResponse.json({ error: 'O parâmetro "query" é obrigatório.' }, { status: 400 });
    }

    const url = new URL('http://localhost:5000/search_filtered');
    url.searchParams.append('query', query);
    url.searchParams.append('type', type);
    url.searchParams.append('exact_match', exactMatch);

    // Adiciona todos os outros parâmetros como filtros
    searchParams.forEach((value, key) => {
      if (!['query', 'type', 'exact_match'].includes(key)) {
        url.searchParams.append(key, value);
      }
    });


    const apiResponse = await fetch(url.toString());

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json({ error: errorData.error || 'Erro na pesquisa filtrada' }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);

  }  catch (error) {
    let errorMessage = 'Erro interno do servidor';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 