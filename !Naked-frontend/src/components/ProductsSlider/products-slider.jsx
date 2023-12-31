import { styled } from "styled-components"
import ProductCard from "../ProductCard/product-card"
import { useEffect, useRef } from "react"
import { useFetchData } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import Loading from "../Loading/loading"
import { PRODUCTS } from "../products-data"

const Container = styled.div`
display:flex;
flex-direction:column;
gap:min(7vh,40px);
`
const Title = styled.h2`
font-size:clamp(1rem, 2.6vw, 1.3rem);
font-weight:600;


`
const SliderContainer = styled.div`
position:relative;
`
const Slider = styled.div`
display:flex;
padding: 0 0 1rem 0;
gap:1rem;
overflow-x: scroll;
scroll-behavior: smooth;
`
export const SlideButton = styled.button`
background:white;
cursor:pointer;
border-radius:50%;
position :absolute;
padding:.8rem;
top:40%;
border:none;
outline:none;
transition:background .3s;
&:hover{
    background:rgba(0,194,255,1);
}
`
export const ArrowIcon = styled.i`
font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
export default function ProductsSlider({title ,url}){
    const userContext = useUserState();
    let {data, error, loading}= useFetchData(url,[],userContext);

    let products = data?.data?.products || PRODUCTS;
    
    const sliderRef = useRef(null)
    function handleLeftButtonClick(leftOffset){
        sliderRef.current.scrollLeft += leftOffset
    }

    if (loading){
        return <Loading />;
    }

    // if (error){
    //     return <></>
    // }

    return(
        <Container> 
            <Title>
                {title}
            </Title>
            <SliderContainer>
                <SlideButton onClick={()=>{handleLeftButtonClick(-300)}} style={{left:"1%"}}>
                    <ArrowIcon className="fa-solid fa-arrow-left"/>
                </SlideButton>
                <SlideButton onClick={()=>{handleLeftButtonClick(300)}} style={{right:"1%"}} >
                    <ArrowIcon className="fa-solid fa-arrow-right"/>
                </SlideButton>
                <Slider ref={sliderRef}>
                    {
                        products.map((product)=>{
                            return(
                                <ProductCard 
                                    min_width={"max(200px ,28%)"}
                                    pk ={product.pk}
                                    name={product.name} 
                                    price={product.price} 
                                    quantity={product.quantity}
                                    colors={product.colors}
                                    type={product.type}
                                    thumbnail={product.thumbnail}
                                    sale={product.sale}
                                />
                            )
                        })
                    }
                </Slider>
            </SliderContainer>
        </Container> 
    )
}