import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Página não encontrada</h2>
        <p className="mb-8 text-gray-600">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
