import { Card, Row, Col, Input } from "antd"
import TokenCard from "./TokenCard"
import TokenContract from "./TokenContractCard"
import { useState } from "react"
const { Search } = Input
const Cards = (props) => {
    const [createdToken, setCreatedToken] = useState(null)


    const handleonSearch = (address) => {
        setCreatedToken(address)

    }

    return (
        <div style={{
            backgroundColor: " #BBD9EB",



            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around"
        }}>


            <Row gutter={50} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "35px",
            }}>


                <Col span={100} >
                    <Card title="Create ERC20 Tokens with few Clicks" bordered={false} style={{ background: "#4AE9F9", margin: "35px", }} hoverable={true}>
                        <TokenCard
                            web3={props.web3}
                            user={props.currentUser}>

                        </TokenCard>

                    </Card>
                </Col>
            </Row>
            <Search placeholder="Enter You'r Erc20 Token you want to interact with" enterButton="Search" size="middle" loading={false} onSearch={handleonSearch} style={{ width: "50%", margin: "5px", }} />

            <Row gutter={12} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Col span={50} >
                    {createdToken ?
                        <Card title="Erc20 Smart contract" bordered={false} >
                            <TokenContract tokenAddress={createdToken} web3={props.web3} currentUser={props.currentUser}></TokenContract>
                        </Card> : <></>
                    }
                </Col>
            </Row>
        </div>

    )

}



export default Cards

