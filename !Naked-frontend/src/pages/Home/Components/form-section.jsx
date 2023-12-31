import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
display:flex;
flex-direction:column;
margin:16vh 0 6vh 0;
gap:9vh;
align-items:center;
justify-content:center;
padding:0 1rem;
`
const Text = styled.div`
font-size:clamp(.8rem,4vw,1.7rem);
font-weight:800;

text-align:center;
`
const InputContainer = styled.form`
display:flex;
width:100%;
display:flex;
justify-content:center;
`
const Input = styled.input`
width:80%;
max-width:380px;
border:1px solid #00C2FF;
outline:none;
padding :3px;
padding-left:7px;
color:black;
`

const Submit = styled.button`
background:#00C2FF;
width:30%;
max-width:110px;
padding:.5rem 1rem;
color:black;
font-weight:bold;
border:none;
cursor:pointer;
transition:opacity .3s;

&:hover{
    opacity:.8;
}
@media screen and (max-width:340px){
    font-size:.8em;
    padding:0 0;
}

`
export default function FormSection(){
    const [formData, setFormData] =useState("")
    const Navigate= useNavigate()
    function handleFormSubmit(e){
        e.preventDefault();
        console.log("here")
        Navigate("/register", {state:formData})
    }
    return (
        <Container>
            <Text>
                Sign up for exclusive
                offers and stay up to
                date
            </Text>
            <InputContainer onSubmit={handleFormSubmit}>
                <Input 
                    value = {formData}
                    type="email" 
                    placeholder="Your Email"
                    onChange={(e)=>{setFormData(e.currentTarget.value)}}
                />
                <Submit>Sign Up</Submit>
            </InputContainer>
        
        </Container>
    )
}