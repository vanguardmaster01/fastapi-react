/* eslint-disable react/prop-types */
const Search = ({keyword, setKeyword, setCurrentPage}) => {
	const handleChange = (e) => {
		setKeyword(e.target.value)
		setCurrentPage(1)
	}

	return (
		<form action='#'>
			<div className='relative'>
				<button
					type='button'
					className='pointer-events-none absolute h-full flex items-center px-2 py-1 search__btn'
				>
					<svg width='24' height='24' fill='none' aria-hidden='true'>
						<path
							d='m19 19-3.5-3.5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
						<circle
							cx='11'
							cy='11'
							r='6'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></circle>
					</svg>
				</button>

				<input
					type='text'
					placeholder='Search keyword....'
					className='py-1 pl-8 pr-2 border-black border text-black rounded w-full'
					value={keyword}
					onChange={handleChange}
				/>
			</div>
		</form>
	)
}

export default Search
