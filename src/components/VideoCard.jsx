import React from 'react'
import YtLogo from "../images/youtube logo.jpg"
import { Link } from 'react-router-dom'

function VideoCard({ id, title, imgUrl, channelInfo, views, date }) {

    const convertDateFormat = (dateString) => {
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
        <Link to={`/video/${id}`}>
            <div className='scale-95 mb-5 transition-all'>
                <img src={imgUrl} alt='Img' className='rounded-lg w-full h-48 mb-2 hover:scale-105' />
                <div className='h-16 flex flex-row gap-2 text-black'>
                    <img src={YtLogo} className=' h-8 w-8 rounded-full m-3' alt='Img' />
                    <div className='text-white'>
                        <h2 className='text-sm font-semibold line-clamp-2'>{title}</h2>
                        <p className='text-xs text-white/30 line-clamp-1'>{channelInfo}</p>
                        <p className='text-xs text-white/30 line-clamp-1'>{convertDateFormat(date)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard