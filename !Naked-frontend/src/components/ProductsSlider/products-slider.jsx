import { styled } from "styled-components"
import ProductCard from "../ProductCard/product-card"
import { useEffect, useRef } from "react"

const Container = styled.div`
display:flex;
flex-direction:column;
gap:min(7vh,40px);
`
const Title = styled.h2`
font-size:1.3em; 
font-weight:600;

@media screen and (max-width:800px){
    font-size:1.1rem;
}

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
export default function ProductsSlider(props){
    const sliderRef = useRef(null)
    function handleLeftButtonClick(leftOffset){
        sliderRef.current.scrollLeft += leftOffset
    }
    return(
        <Container> 
            <Title>
                {props.title}
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
                        props.products.map((product)=>{
                            return(
                                <ProductCard 
                                    min_width={"max(220px ,32%)"}
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