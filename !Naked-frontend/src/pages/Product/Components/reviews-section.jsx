import styled from "styled-components"
import Review from "./review"
import { useContext, useEffect, useState } from "react"
import { ratingToStars } from "./details-container"

import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import hoody from "../../../assets/Hoody.jpg"
import hoody2 from "../../../assets/Hoody2.jpg"
import { userStateContext } from "../../../Contexts/user-state"
import Pagination from "../../../components/Pagination/pagination"
import { useSearchParams } from "react-router-dom"

const Container = styled.div`
margin: 0 0 2rem 0;
`
const Header = styled.div`
padding: 0 0 4rem 0;
border-bottom:2px solid black;
`
const Title = styled.h2`
margin: 0 0 4rem 0;

font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}

`
const StarsContainer = styled.div`
display:flex;
gap:8px;
align-items:flex-start;
margin:auto;
justify-content:center;


`
const Rating = styled.div`
font-weight:600;
margin:0;

font-size:1.8rem;
@media screen and (max-width:800px){
    font-size:1.6rem;
}
`
const Stars = styled.div`
display:flex;

`
const Star = styled.img`
width:40px;
@media screen and (max-width:800px){
    width:30px;
}
`
const Reviews = styled.div`
display:flex;
flex-direction : column;

`
export default function ReviewsSection({product_id}){
    const userState = useContext(userStateContext)
    const [reviews, setReviews] = useState(rvs);
    const [reviewsDetails, setReviewsDetails] = useState({average_ratings:5 , reviews_count:0});
    const [likedReviews, setLikedReviews] = useState([4,5]);
    const [CurrentPage,setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    // update currentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])

    async function requestReviews(product_id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+product_id+"/reviews");
        const response = await request.json(); 
        if ( request.status == 200){
            setReviews(response.data.reviews)
            setReviewsDetails({average_ratings:response.average_ratings,reviews_count:response.total_count})
        }
    }

    async function requestClientLikedReviews(product_id,user_token){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+product_id+"/user/reviews/liked",{
            type:"GET",
            headers:{
                "Authorization":"Bearer "+user_token 
            }
        });
        const response = await request.json(); 
        if ( request.status == 200){
            setLikedReviews(response.data.liked_reviews)
        }
    }

    function checkIfLiked(review_id,likedReviews){
        function searchForId(s,e){
            let middle = (s+e)/ 2
            if (s>e){
                return false;
            }
            if (likedReviews[middle] === review_id){
                return true;
            }
            if (likedReviews[middle] > review_id){
                return searchForId(s, middle-1);
            }
            return searchForId(middle +1 , e);
        }
        return searchForId(0, likedReviews.length)
    }
    useEffect(()=>{
        // requestClientLikedReviews(product_id,userState.token)
        // requestReviews(product_id)
    },[])
    return (
        <Container>
            <Header>
                <Title>Reviews ({reviewsDetails.reviews_count}): </Title>
                <StarsContainer>
                    <Rating>{reviewsDetails.average_ratings}</Rating>
                    <Stars>
                        {ratingToStars(reviewsDetails.average_ratings).map((value)=>{
                            if (value === "star") return <Star src={star} />
                            if (value=== "half") return <Star src={half_star} />
                            if (value=== "empty") return <Star src={empty_star} /> 
                        })}
                    </Stars>
                </StarsContainer>
            </Header>
            <Reviews>
                {reviews && reviews.map((review)=>{
                    return(
                        <Review 
                            liked={checkIfLiked(review.id,likedReviews)}
                            id = {review.id}
                            username={review.username}
                            height={review.user_height}
                            weight={review.user_weight}
                            rating={review.rating}
                            title={review.title}
                            text={review.text}
                            color={review.color}
                            size={review.size}
                            images={review.images}
                            date={review.created_at}
                            helpful_count={review.helpful_count}
                        />
                    )
                })}
                
            </Reviews>
            <Pagination CurrentPage={CurrentPage} TotalPagesCount={30}/>
        </Container>
    )
}
const likedrvs = [
    4,5
]

const rvs = [
    {
        id:5,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            hoody,
            hoody,
            hoody2,
            hoody2
        ],
        user_height:'190cm',
        user_weight:'38kg',
        helpful_count:29,
        created_at:"2033-09-09"
    },
    {
        id:4,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            hoody,
            hoody,
            hoody2
        ],
   
        helpful_count:40,
        created_at:"2033-09-09",
        user_height:'190cm',
        user_weight:'38kg',
    },
    {
        id:2,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        user_height:'190cm',
        user_weight:'38kg',
        helpful_count:0,
        created_at:"2033-09-09"
    }
]