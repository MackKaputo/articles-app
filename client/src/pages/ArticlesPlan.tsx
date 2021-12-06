import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import styled from "styled-components"
import { Card, Button } from "react-bootstrap"

const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 65vh;
    align-items: center;
    justify-content: space-around;
`
const CardHeader = styled.div`
    height: 20rem;
    background-color: orange;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PriceCircle = styled.div`
    border: 0.5rem solid white;
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.1rem 0.1rem 1rem rgb(19, 20, 19, 0.342) 
`
const PriceText = styled.p`
    font-size: 3rem;
    color: white;
    text-shadow: 0.1rem 0.1rem 1rem rgb(19, 20, 19, 0.342)
`

const backgroundColors: any = {
    Basic: "rgb(141 0 39)",
    Standard: "rgb(78 23 185 / 83%)",
    Premium: "orange"
}

const ArticlesPlan = () => {

    const [prices, setPrices] = useState<any[]>([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const {data: response} = await axios.get(
            "http://localhost:8080/subs/prices"
        )
        //console.log("FETCHING PRICES")
        setPrices(response.data)
    }

    const createSession = async (priceId: string) => {
        const { data: response } = await axios.post(
            "http://localhost:8080/subs/session",
            {
                priceId,
            }
        )

        window.location.href = response.url
    }

    return (
        <Container>
            <CardsContainer>
                {prices.map((price: any) => {
                    return (
                        <Card style={{ width: "20rem", marginTop:"1rem"}}>
                            <CardHeader style={{backgroundColor: backgroundColors[price.nickname]}}>
                                <PriceCircle>
                                    <PriceText>
                                        $ {price.unit_amount/100}
                                    </PriceText>
                                </PriceCircle>
                            </CardHeader>
                            <Card.Body >
                                <Card.Title style = {{ fontSize: "2rem"}}>
                                    {price.nickname}
                                </Card.Title>
                                <Button variant="primary" className="mt-3" onClick={() => createSession(price.id)}>Buy now</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardsContainer>
        </Container>
    )
}

export default ArticlesPlan