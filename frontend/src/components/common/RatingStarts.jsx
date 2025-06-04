import { useEffect, useState } from "react"

const RatingStars = ({Review_Count, Star_Size}) => {
    const [startCount, setStarCount] = useState({
        full:0,
        half:0,
        empty:0,
    })
    useEffect(()=>{
        const wholeStars = Math.floor(Review_Count) || 0;
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(Review_Count) ? 0 : 1,
            empty: Number.isInteger(Review_Count) ? 5-wholeStars :4 -wholeStars,
        })
    },[Review_Count])

    return(
        <div className="flex gap-1 text-yellow-400">
            {[...new Array(startCount.full)].map((_,i)=>{
                return <TiStarFullOutline key={i} size={Star_Size || 20}/>
            })}
              {[...new Array(startCount.half)].map((_,i)=>{
                return <TiStarhalfOutline key={i} size={Star_Size || 20}/>
            })}
              {[...new Array(startCount.empty)].map((_,i)=>{
                return <TiStarOutline key={i} size={Star_Size || 20}/>
            })}
        </div>
    )
}