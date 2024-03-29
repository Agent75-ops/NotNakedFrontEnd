import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import RatingStars from "../RatingStars/rating-stars";
import {useState } from "react";
import {useSendRequest} from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up";
import OverlayColorsSizesMenu from "./Components/overlay-colors-sizes-menu";
import ShoppingButtons from "./Components/shopping-buttons";
import PopUpColorsSizesMenu from "./Components/pop-up-colors-sizes-menu";

export const ProductCardContainer = styled.div`
min-width:${({$min_width})=>{return ($min_width?$min_width:"auto")}};
height:auto;
border-radius:6px;
min-height:200px;
`
export const ProductLinkImage = styled(Link)`
aspect-ratio:1/1.04;
position:relative;
display:block;
`
const HighLight =styled.div`
background:#00C2FF;
position:absolute;
padding:.2rem .4rem;
border-radius: 8px 0 0 0;
`
export const ProductCardImage  = styled.img`
object-fit: cover; 
width: 100%;
height: 100%;
margin:0;
border-radius: 8px 8px 0 0;
`
export const ProductCardDetailsContainer = styled.div`
margin:0;
display:flex;
flex-direction:column;
align-items:center;
gap:.5rem;
width:100%;
padding-top:.5rem;
background:white;
position:relative;
`
const RatingContainer = styled.div`
display:flex;
gap:8px;
justify-content:center;
align-items:center;
`

const Rating = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem)
`
const ReviewsCount = styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
`
export const ProductName =styled(Link)`
text-decoration:none;
color:black;
margin:0;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Category = styled.p`
margin:0;
color: grey;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

const PriceContainer =styled.div`
display:flex;
gap:.5rem;
align-items:flex-end;
flex-wrap:wrap;
// width:100%;
`
const NewPrice =styled.p`
margin:0;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const OldPrice =styled.p`
margin:0;
color:grey;
opacity:.6;
font-weight:600;
text-decoration:line-through;
font-size:clamp(.6rem,2vw,.9rem);
`
const SalePercentage =styled.p`
margin:0;
color:black;
font-size:clamp(.6rem,2vw,.9rem);
font-weight:600;
`

const PriceButtonsContainer = styled.div`
display:flex;
width:100%;
justify-content:space-between;
align-items:center;
`

const ButtonsContainer = styled.div`
display:flex;
gap:10px;
position:relative;
`
export const Icon = styled.i`
font-size:clamp(.7rem,2vw,.9rem);
transition:transform .3s;

@media screen and (max-width:800px){
    font-size:clamp(.65rem,1.8vw,.8rem);
}
`

export const ButtonsDisplayer = styled.div`
height:25px;
background:#00C2FF;
padding: 0 8px;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
border-radius:30px;
transition:width .3s;
width:${({$hover})=>$hover?"65px":"25px"};
@media screen and (max-width:1300px){
    width: 28px;
    height: 28px;
}
@media screen and (max-width:600px){
    width: 20px;
    height: 20px;
}
`

const HeartButton = styled(ButtonsDisplayer)`
background:white;
border:1px solid #C0C3C7;
padding: 2px 0 0 0;
&:hover ${Icon}{
    transform:scale(1.05);
}
@media screen and (max-width:600px){
    padding:0;
}
@media screen and (max-width:400px){
    padding:1px 0 0 0;
}
@media screen and (max-width:380){
    padding:0 0 0 0;
}
`



const ReviewsWord = styled.p`
font-size:inherit;
color:inherit;
display:inline;
font-weight:inherit;
margin:0;

@media screen and (max-width:600px){
    display : none;
}
`


export function ToggleFavoritesButton({style}){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [isInFavorites,setIsInFavorites] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleHeartClick(e){
        setIsLoading(true)
        const uri = "/api/favorites"
        const init = {method:"POST"};

        let {request , response} = await sendRequest(uri, init)
        if (request?.status == 201){
            setIsInFavorites(true)
        }

        if (request?.status == 200){
            setIsInFavorites(false)
        }

        if (request?.status === 401){
            navigate('/login')
        }

        setIsLoading(false)
    }

    return (
        <>
            <SuccessOrErrorPopUp serverError={serverError} />
            <HeartButton style={style} disabled={isLoading||""} onClick={handleHeartClick} >
                {isInFavorites?
                    <Icon style={{color:"red"}} className="fa-solid fa-heart"/>:
                    <Icon className="fa-regular fa-heart"/>
                }
            </HeartButton>
        </>
    )
}

export const renderRatingCont = (average_ratings,reviews_count)=>{
    return (
        <RatingContainer>
            <Rating>{average_ratings}</Rating>
            <RatingStars rating={average_ratings} />
            <ReviewsCount>
                ({reviews_count}
                <ReviewsWord> reviews</ReviewsWord>)
            </ReviewsCount>
        </RatingContainer>
    )
}

export const getPrice = (price,sale)=>{
    if (sale){
        return(
        <PriceContainer>
            <div style={{display:"flex", gap:"8px",alignItems:'flex-end'}}>
                <NewPrice>{sale.price_after_sale}$</NewPrice>
                <OldPrice>{price}$</OldPrice>
            </div>
        </PriceContainer>)
    }
    return <NewPrice>{price}$</NewPrice>
}

export const renderHighLight = (sale)=>{
    return (
        <>
            {sale &&
                <HighLight>
                    <SalePercentage>
                        {sale.percentage} % Off
                    </SalePercentage>
                </HighLight>
            }
        </>
    )
}

export default function ProductCard({product,min_width}){
    const [showColorsSizesMenu,setShowColorsSizesMenu] = useState(null);
    const [sizePicked,setSizePicked] = useState(null);
    const [colorPicked,setColorPicked] = useState(null);
    const [actionLoading,setActionLoading] = useState(false);

    function handleCloseSizesColorsMenu(e){
        if (actionLoading) return null;
        
        setSizePicked(null);
        setColorPicked(null);
        setShowColorsSizesMenu("");
    }

    return(
        <>
        <PopUpColorsSizesMenu 
        product={product} 
        sizePicked={sizePicked} 
        colorPicked={colorPicked} 
        setSizePicked={setSizePicked} 
        setColorPicked={setColorPicked} 
        actionLoading={actionLoading} 
        showMenu={showColorsSizesMenu} 
        setActionLoading={setActionLoading}
        closeMenu={handleCloseSizesColorsMenu}/>

        <ProductCardContainer onMouseLeave={handleCloseSizesColorsMenu} $min_width={min_width}>
            <div style={{position:'relative'}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    {renderHighLight(product?.sale)}
                    <ProductCardImage src={product?.thumbnail}/>
                </ProductLinkImage>
                <OverlayColorsSizesMenu 
                product={product} 
                sizePicked={sizePicked} 
                colorPicked={colorPicked} 
                setSizePicked={setSizePicked} 
                setColorPicked={setColorPicked} 
                actionLoading={actionLoading} 
                showMenu={showColorsSizesMenu} 
                setActionLoading={setActionLoading}/>
            </div>
            <ProductCardDetailsContainer>
                <ProductName>{product?.name}</ProductName>
                {renderRatingCont(product?.reviews_summary?.average_ratings,product?.reviews_summary?.reviews_count)}
                <Category>{product?.type}</Category>
                <PriceButtonsContainer>
                    {getPrice(product?.price,product?.sale)}
                    <ButtonsContainer>
                        <ShoppingButtons actionLoading={actionLoading} setShowColorsSizes={setShowColorsSizesMenu}/>
                        <ToggleFavoritesButton />
                    </ButtonsContainer>
                </PriceButtonsContainer>
            </ProductCardDetailsContainer>
        </ProductCardContainer>
        </>
    )
}