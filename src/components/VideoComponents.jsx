import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import { RiThumbUpFill } from "react-icons/ri";
import { RiThumbDownFill } from "react-icons/ri";
import { IoRemoveOutline } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import Markdown from 'react-markdown';
import { fetchFromApi } from '../utils/api';
import RelatedVideo from './RelatedVideo';

function VideoComponents() {

    const [videoData, setVideoData] = useState([])
    const [descHeight, setDescHeight] = useState(false);
    const [relatedVideoData, setRelatedVideoData] = useState([])

    const [changeLikeColor, setChangeLikeColor] = useState(false)
    const [dislikeColor, setDislikeColor] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        try {
            fetchFromApi(`videos?part=contentDetails,snippet,statistics&id=${id}`).then((data) => {
                setVideoData(data.items)
            })
            fetchFromApi(`search?part=snippet,statistics&relatedToVideoId=${id}`).then((data) => {
                setRelatedVideoData(data.items);
            })
        } catch (error) {
            console.log(error.message)
        }
    }, [id]);

    const toggleDescription = () => {
        setDescHeight(!descHeight);
    }

    const likeFormatFunc = (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B';
        }
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        }
        if (number >= 1e3) {
            return (number / 1e3).toFixed(1) + 'K';
        }
        return number;
    }

    const viewFormatConvertor = (number) => {
        const suffixes = ["", "K", "M", "B"];

        let i = 0;
        while (number >= 1000 && i < suffixes.length - 1) {
            number /= 1000;
            i++;
        }

        const roundedNumber = Math.round(number * 10) / 10;
        const formattedNumber = roundedNumber + suffixes[i];

        return formattedNumber;
    }

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
        <div className='bg-[#353535] h-[calc(100vh-56px)] w-screen text-white overflow-y-scroll'>
            <div className='flex flex-col lg:flex-row'>
                <div>
                    <div className='w-full h-[250px] md:h-[450px] lg:w-[calc(100vw-350px)]'>
                        <ReactPlayer
                            url={`https://youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            playing={true}
                        />
                    </div>
                    <div className='lg:w-[calc(100vw-350px)] px-2 mt-2'>
                        {/* Additional content goes here */}

                        <h2 className='text-lg lg:text-2xl font-semibold'>{videoData[0]?.snippet?.title}</h2>


                        <div className='flex items-center justify-between h-12 overflow-hidden my-2 gap-3'>
                            <div className='flex items-center gap-4 my-2'>
                                {/* <img src='https://i.ytimg.com/vi/X7aF3nZOS98/default.jpg' className='h-8 w-8 rounded-full my-2 object-cover' alt='' /> */}
                                <h4 className='font-bold text-base md:text-lg w-24 md:w-auto overflow-hidden'>
                                    {videoData[0]?.snippet?.channelTitle}
                                </h4>
                            </div>
                            <div className='flex gap-3 scale-90 md:scale-100'>
                                <div className='flex items-center text-lg bg-[#252525] px-3 py-2 rounded-full'>
                                    <span className='flex items-center gap-2'>
                                        <RiThumbUpFill onClick={() => setChangeLikeColor(!changeLikeColor)} className={`cursor-pointer ${changeLikeColor ? "text-blue-500" : ""}`}/>
                                        <span className='text-xs hidden md:block'>
                                            {
                                                changeLikeColor ? (<span>{likeFormatFunc(parseFloat(videoData[0]?.statistics?.likeCount) + 1)}</span>):(<span>{likeFormatFunc(videoData[0]?.statistics?.likeCount)}</span>)
                                            }
                                        </span>
                                    </span> <IoRemoveOutline className='text-white/40 rotate-90' /> <RiThumbDownFill onClick={() =>setDislikeColor(!dislikeColor)} className={`${dislikeColor ? "text-red-600" : ""}`} />
                                </div>
                                <div className='bg-[#252525] px-3 py-2 rounded-full flex items-center gap-2'>
                                    <IoIosShareAlt className='text-lg' />
                                    <span className='text-xs'>
                                        Share
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div onClick={toggleDescription} className={`relative bg-[#252525] w-full pb-6 rounded-lg px-5 pt-2 overflow-hidden mb-6 ${descHeight ? "h-auto" : "h-[120px] hover:bg-white/10"}`}>
                            
                            <h4 className='pb-2 text-sm text-white/40 font-semibold'>{viewFormatConvertor(videoData[0]?.statistics?.viewCount)} Views . {convertDateFormat(videoData[0]?.snippet?.publishedAt)}</h4>
                            
                            <span className={`text-sm text-white/70 ${descHeight ? "line-clamp-none" : "line-clamp-2"}`}>
                                <Markdown>
                                    {videoData[0]?.snippet?.description}
                                </Markdown>
                            </span>
                            
                            {
                                !descHeight && <p className="px-4 py-2">...more </p>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full bg-[#313131] lg:w-[350px] h-[calc(100vh-56px)] px-4'>
                    {
                        relatedVideoData?.map((item) => {
                            return <RelatedVideo key={item} item={item} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default VideoComponents;
