import { Background } from "./category-list"
import styled from "styled-components"
import Logo from "../Logo"
import { useEffect, useState } from "react"
import {PRODUCTS} from "../products-data"
import ProductCard from "../ProductCard/product-card"
import SimpleProductCard from "../SimpleProductCard/simple-product-card"
import { useSendRequest } from "../../hooks/use-fetch-data"
// Parent z-index : 200


const Parent = styled.div`
position:fixed;
z-index:500;
top:0;
left:0;
width:100%;
height:${({$width})=> $width};
display:block;
overflow:hidden;
transition:height .3s;
`
const ContentContainer = styled.div`
width:100%;
background:white;
display:flex;
justify-content:center;
@media screen and (max-width:800px){
    height:100%;
}
overflow:hidden;

`
const Content = styled.div`
margin : 1rem 0 2rem 0 ;
width:100%;
padding: 0 min(2rem ,5%);
display:flex;
flex-direction:column;
gap: min(2rem,3.5vh) ;
@media screen and (max-width:800px){
    margin: min(2rem,3.5vh) 0 0 0 ;
}
@media screen and (max-width:600px){
   padding:10px;
}
`
const SearchSection = styled.div`
display:flex;
width:100%;
align-items:center;
justify-content:space-between;
gap:min(2rem ,5%);
`
const SuggestionsSection= styled.div`
display:flex;
flex-direction:column;
gap:10px;
overflow-x: hidden;
`
const SuggestionsContainer = styled.div`
max-height:70vh;
overflow:auto;
overflow-x: hidden;
@media screen and (max-width:800px){
    height:100vh;
    max-height:none;
}
`
const Suggestions = styled.div`
width:100%;
display:grid;
grid-gap:30px;
padding:10px;
grid-template-columns:repeat(auto-fill, minmax(190px, 1fr) );
overflow-x: hidden;
@media screen and (max-width:600px){
    grid-template-columns:repeat(2, 1fr);
    grid-gap:5px;
    padding:0;
}
`

const SearchInputContainer = styled.div`
width:50%;
position:relative;
height:min(6vh, 35px);
@media screen and (max-width:800px){
    flex:4;
}
`
const SearchIcon = styled.i`
z-index:2;
position:absolute;
top:28%;
left:3%;
font-size:clamp(.6rem,2vw,.9rem);
@media screen and (max-width:540px){
    top:34%;
    left:4%;
    font-size:clamp(.8rem,2vw,.9rem);
}
@media screen and (max-width:380px){
    top:34%;
    left:6%;
}
`
const SearchInput = styled.input`
width:100%;

height:100%;
border-radius:30px;
position:absolute;
z-index:1;
padding:0 4% 0 8%;
background:#F1F4F9;
border:none;

font-size:clamp(.6rem,2vw,.9rem);
`
const CancelButton = styled.button`
border:none;
background:none;
cursor:pointer;

font-weight:600;
font-size: clamp(.8rem , 2.3vw ,1.1rem);

@media screen and (max-width:800px){
}
`

export default function NavbarSearch({show,setShow}){
    const [popularSuggestions , setPopularSuggestions]= useState(PRODUCTS)
    const [suggestions, setSuggestions] = useState([])
    const [searchInput, setSearchInput] = useState()

    const {sendRequest,serverError} = useSendRequest();

    useEffect(()=>{
        getPopularProducts()
    },[])

    async function getPopularProducts(){
        let url = "/api/products/popular?limit=5";
        let {request,response} = await sendRequest(url);

        if (request?.ok){
            setSuggestions(response['data']['products']);
            setPopularSuggestions(response['data']['products']); 
        }
    }

    async function handleSearchInputChange(e){
        e.preventDefault();

        let url = "/api/products";
        let input = e.currentTarget.value;
        setSearchInput(input);

        if (input.length>1){
            url = url +  "?q=" + input + "&limit=5"
            let {request,response} = await sendRequest(url);

            if (request?.ok){
                setSuggestions(response['data']['products']);
            }
        }else{
            setSuggestions(popularSuggestions)
        }
    }

    function handleCloseNavbarSearch(e){
        setShow(false)
    }

    return (
        <Parent $width={show?"100%":"0"}>
            <ContentContainer>
                <Content>
                    <SearchSection>
                        <Logo hide_for_mobile={true} />
                        <SearchInputContainer>
                            <SearchInput onChange={handleSearchInputChange}/>
                            <SearchIcon className="fa-solid fa-magnifying-glass"/>
                        </SearchInputContainer>
                        <CancelButton onClick={handleCloseNavbarSearch}>
                            Cancel
                        </CancelButton>
                    </SearchSection>
                    <SuggestionsSection>
                        <p style={{fontWeight:"600",fontSize:"clamp(.8rem , 2.3vw ,1.1rem)"}}>
                            {searchInput && searchInput.length>1 ?"Results for : "+ searchInput : "Popular Now"}
                        </p>
                        <SuggestionsContainer>
                        <Suggestions>
                            {suggestions && suggestions.length >0 && 
                            suggestions.map((product)=>(
                                <SimpleProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </Suggestions>
                        </SuggestionsContainer>
                    </SuggestionsSection>
                </Content>
            </ContentContainer>
            <Background onClick={handleCloseNavbarSearch} />
        </Parent>

    )
}