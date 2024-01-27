import React, { useContext, useEffect, useState } from 'react'
import LeftNav from './LeftNav'
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoCard from './VideoCard';
import Spinner from './Spinner';
import { fetchFromApi } from '../utils/api';
import { Context } from '../context/ContextApi';

function Home() {

  const [totalResultData, setTotalResult] = useState(200);
  const [data, setData] = useState([]);
  const [nextPageTokenInfo, setNextPageTokenInfo] = useState(null)
  const { setMobileMenu, selectedCategory } = useContext(Context);

  useEffect(() => {
    setMobileMenu(true)
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((res) => {
      setData(res.items.filter((res) => res?.snippet?.liveBroadcastContent !== "live"))
      setNextPageTokenInfo(res.nextPageToken);
      setTotalResult(450);
    })
    // eslint-disable-next-line
  }, [selectedCategory]);

  const fetchMoreData = () => {
    fetchFromApi(`search?part=snippet&q=${selectedCategory}&pageToken=${nextPageTokenInfo}`).then((res) => {
      setData(data.concat(res.items.filter((res) => res?.snippet?.liveBroadcastContent !== "live")))
      setNextPageTokenInfo(res.nextPageToken)
    })
  }

  return (
    <div className='flex h-[calc(100vh-56px)] w-screen'>
      <LeftNav />
      <div id='scrollableDiv' className='md:w-[calc(100vw-240px)] h-[calc(100vh-56px)] overflow-y-scroll w-screen bg-[#191919] text-white'>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length < totalResultData}
          loader={<Spinner />}
          scrollableTarget="scrollableDiv"
        >
          {
            data.length > 0 ? (<div className='grid overflow-x-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 p-5'>
              {data.map((item, i) => (
                <VideoCard key={item?.id + i} id={item?.id?.videoId} title={item?.snippet?.title} imgUrl={item?.snippet?.thumbnails?.medium?.url} channelInfo={item?.snippet?.channelTitle} date={item?.snippet?.publishedAt} views={item?.statistics?.viewCount} />
              ))}
            </div>) : (<></>)
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home