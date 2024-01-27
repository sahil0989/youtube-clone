import React from 'react'
import { Link } from 'react-router-dom'

function RelatedVideo({ item }) {

    const convertTimeFormat = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata',
        };

        const indianDate = new Date(dateString);
        const formattedDate = indianDate.toLocaleDateString('en-IN', options);

        return formattedDate;
    }

    return (
        <Link to={`/video/${item.id.videoId}`}>
            <div className='flex items-center w-full h-[95px] my-4 rounded-lg overflow-hidden gap-4 hover:bg-[#252525] py-2'>
                <img src={item.snippet.thumbnails.default.url} className='rounded-lg' alt='' />
                <div>
                    <h2 className=' line-clamp-2 text-sm font-bold'>{item.snippet.title}</h2>
                    <h4 className=' line-clamp-1 text-[12px] text-white/50'>{item.snippet.channelTitle}</h4>
                    <p className='line-clamp-1 text-[12px] text-white/50'>{convertTimeFormat(item.snippet.publishedAt)}</p>
                </div>
            </div>
        </Link>
    )
}

export default RelatedVideo