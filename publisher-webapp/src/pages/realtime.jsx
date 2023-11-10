
import useFetchData from '../helpers/fetch'

export default function RealTime() {
    const {
        isLoading,
        error,
        data: {realtime_traffic_list: articles},
    } = useFetchData({url: '/get-realtime-traffic-list'})

    return (
        <div className='py-10 container bg-white mx-auto'>
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
                                <th className='p-3 col-md-8 border border-slate-300 text-left'>Title</th>
                                <th className='p-3 col-md-8 border border-slate-300 text-left'>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(articles || []).map((article, index) => {
                                return (
                                    <tr className='row' key={index}>
                                        <td className='text-left border border-slate-300 text-sky-500 p-3'>
                                            {article.unifiedScreenName}
                                        </td>

                                        <td className='text-center border border-slate-300 p-3'>
                                            {article.screenPageViews}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                )}
            </table>
        </div>
    )
}
