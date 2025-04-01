import Link from 'next/link'

const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-blue-600 text-white rounded">
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination

