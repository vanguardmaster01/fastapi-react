import {useEffect, useState} from 'react'
import Search from '../components/Search'
import useFetchArticle from '../helpers/fetchArticle'
import SearchScore from '../components/Search-score'
import {useSearchParams} from 'react-router-dom'
import Logout from '../components/Logout'

const ArticleList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('current_page')?.split('=')) || 1)
    const [keyword, setKeyword] = useState('')
    const [score, setScore] = useState('')

    const {
        isLoading,
        error,
        articles: {article_list: articles},
    } = useFetchArticle({
        currentPage,
        keyword,
        score,
    })

    useEffect(() => {
        setSearchParams({current_page: currentPage})
    }, [currentPage, setSearchParams])

    return (
        <div className='container bg-white mx-auto'>
			<Logout />
            <header className='flex justify-between py-4'>
                <div className='w-2/12'>
                    <SearchScore score={score} setScore={setScore} setCurrentPage={setCurrentPage} />
                </div>
                <div className='w-4/12'>
                    <Search keyword={keyword} setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
                </div>
            </header>

            <table className='hover border-collapse border border-slate-400 w-full'>
                {isLoading ? (
                    <tbody>
                        <tr className='row'>
                            <td>&nbsp;</td>
                            <td className='text-center p-3'>Loading...</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                ) : !isLoading && error ? (
                    <tbody>
                        <tr className='row'>
                            <td>&nbsp;</td>
                            <td className='text-center p-3'>There is an error in loading data!</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                ) : !isLoading && articles?.length === 0 ? (
                    <tbody>
                        <tr className='row'>
                            <td>&nbsp;</td>
                            <td className='text-center p-3'>No article found!</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        <thead>
                            <tr className='row'>
                                <th className='p-3 col-md-8 border border-slate-300 text-left'>Image</th>
                                <th className='p-3 col-md-8 border border-slate-300 text-left'>Url</th>
                                <th className='p-3 col-md-4 text-center border border-slate-300'>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(articles || []).map((article, index) => {
                                return (
                                    <tr className='row' key={index}>
                                        <td className='text-left border border-slate-300 text-sky-500 p-3 w-6'>
                                            <img
                                                className='block'
                                                src={article.featured_image_url}
                                                alt={article.title}
                                                width={100}
                                            />
                                        </td>
                                        <td className='text-left border border-slate-300 text-sky-500 p-3'>
                                            <a href={article.url} target='_blank' rel='noopener noreferrer'>
                                                {article.title}
                                            </a>
                                        </td>
                                        <td className='text-center border border-slate-300 p-3'>
                                            {article.session_score}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                )}
                <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <td className='text-center p-3'>
                            <button
                                className='bg-blue-300 p-2 rounded'
                                disabled={currentPage === 1}
                                onClick={() => {
                                    setCurrentPage((previousPage) => (previousPage === 1 ? 1 : previousPage - 1))
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className='bg-blue-300 p-2 ml-3 rounded'
                                onClick={() => {
                                    setCurrentPage((previousPage) => previousPage + 1)
                                }}
                            >
                                Next
                            </button>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ArticleList
