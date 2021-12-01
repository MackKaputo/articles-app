import React from 'react'

import styled from "styled-components"
import { Container } from "react-bootstrap"

import ModalComponent from "../Modal/Modal"

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 85vh;
  background-image: url("https://media.istockphoto.com/photos/young-afro-american-woman-sitting-at-table-with-books-and-laptop-for-picture-id1266628951?b=1&k=20&m=1266628951&s=170667a&w=0&h=n9hssLnsA4h2cqZdUJ40-iT_uvEgLkom6NopI77ZzXs=");
  background-size: cover;
  background-position: center;


`
const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 100%;
`
const Heading = styled.h1`
  font-size: 2rem; 
  text-align: center;
`
const SubHeading = styled.h2`
  font-weight: 360;
  text-align: center;
`
const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 13%
`

function Hero() {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading> Feed your mind with the best </Heading>
          <SubHeading>
            Grow, learn, and become more successful by reading some of the best articles 
            by highly reputable individuals
          </SubHeading>
          <ButtonContainer>
            <ModalComponent text="Signup" variant = "primary" />
            <ModalComponent text="Login" variant = "danger" />
          </ButtonContainer>
        </HeaderContainer>
      </Container>
    </HeroComponent>
  )
}

export default Hero
