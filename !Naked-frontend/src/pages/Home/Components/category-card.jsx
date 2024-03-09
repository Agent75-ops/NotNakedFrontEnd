import { styled } from "styled-components"
import { Link } from "react-router-dom"

const CardContainer =styled.div`
width:400px;
overflow:hidden;
position:relative;
aspect-ratio:1/1.6;
&:hover .background-photo{
    transform:scale(1.1);
}
@media screen and (max-width:600px){
    aspect-ratio: 1/1.6;
    width:100%;
}
`
const ImageContainer = styled.div`
width :100%;
position:relative;
aspect-ratio: 1/1.6;

`
const Image = styled.img`
width:100%;
height:100%;
cursor:pointer;
transition:all .3s;
object-fit:cover;
-webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
filter: grayscale(100%);

`
const Border =styled.div`
top:3.5%;
left:5%;
z-index:2;
height:93%;
width:90%;
border:5px solid ${({$color})=>$color};
position:absolute;
display:flex;
align-items:flex-end;
justify-content:center;
`
const Button =styled.button`
background:${({$color})=>$color};
border-radius:30px;
padding:.2rem 1rem;
color:black;
opacity:.8;
margin-bottom:4rem;
border:none;
cursor:pointer;
font-weight:600;
font-size:1rem;

@media screen and (max-width:800px){
    font-size:.8rem;
    margin-bottom:2rem;
}
`
export default function CatgegoryCard({image,color,text}){

    return (
        <CardContainer >
            <Link to="/home" style={{textDecoration:"none"}}>
                <ImageContainer>
                    <Border $color={'grey'} />
                    <Image src={image}/>
                </ImageContainer>
                <Button $color={color}>
                    {text}
                </Button>
            </Link>
        </CardContainer>
    )
}