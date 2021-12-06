import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

interface Article {
    _id: string;
    title: string;
    imageUrl: string;
    content: string;
}

const CardsContainer = styled.div`
    padding: 4rem 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

`
const Card = styled.div`
    margin: 1%;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0,0,0,0.2);
    padding: 2rem;
    border-radius: 2rem;

`
const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 2rem
`
const Header = styled.h2`
    margin-top: 1rem;
    font-size: 1.5rem;
    text-align: center;
`
const Content = styled.p`
    text-align: justify;
`
const NoArticlesContainer = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10rem 0;

    & a {
        font-size: 2rem;
        text-decoration: none
    }
`

const ErrorHeader = styled.h1`
    font-size: 2rem;
`

const Articles = () => {

    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        setLoading(true)
        const {data: response} = await axios.get(
            "http://localhost:8080/articles"
        )
        setArticles(response)
        setLoading(false)
        
    }

    if(loading) {
        return <div> Loading...</div>
    }

    return (
        <Container>
            {articles.length ? (
                    <CardsContainer>
                        {articles.map(article => (
                            <Card key={article._id}>
                                <Image src={article.imageUrl}></Image>
                                <Header>{article.title}</Header>
                                <Content>{article.content}</Content>
                            </Card>
                        ))}
                    </CardsContainer>
                ) : (
                    <NoArticlesContainer>
                        <ErrorHeader>
                            You don't have access yet
                        </ErrorHeader>
                        <Link to="/article-plans">Buy a Plan</Link>
                    </NoArticlesContainer>
                )
            }           
            
        </Container>
    )
}

export default Articles