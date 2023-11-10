/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react'
import {axios} from '../utils/axios'
import debounce from '../utils/debounce'

const useFetchArticle = ({currentPage, keyword, score}) => {
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState(undefined)
	const [articles, setArticles] = useState([])

	const fetchPost = async ({currentPage, keyword, score}) => {
		setLoading(true)
		try {
			const response = await axios.post(`/get-article-list`, {
				page_number: currentPage,
				...(keyword && {keyword: keyword}),
				...(score && {session_score: score}),
			})
			setArticles(response.data)
		} catch (e) {
			console.log('error', e)
			setError(e)
		}

		setLoading(false)
	}

	const debouncedFetch = useCallback(debounce(fetchPost, 500), [])

	useEffect(() => {
		debouncedFetch({
			currentPage,
			...(keyword && {keyword: keyword}),
			...(score && {score: score}),
		})
	}, [currentPage, keyword, score, debouncedFetch])

	return {isLoading, error, articles}
}

export default useFetchArticle
