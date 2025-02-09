import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const type = searchParams.get('type') || 'default'; // Valor padrão

    if (!query) {
      return NextResponse.json({ error: 'O parâmetro "query" é obrigatório.' }, { status: 400 });
    }

    const apiResponse = await fetch(
      `http://localhost:5000/search?query=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json({ error: errorData.error || 'Erro na pesquisa' }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    let errorMessage = 'Erro interno do servidor';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}