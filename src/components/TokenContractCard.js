import { Col, List, Row, Table, Input, Button, Form } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import ERC20_Standard from "../contracts/ERC20_Standard.json"
const { Search } = Input




const TokenContract = (props) => {
    const [name, setName] = useState();
    const [decimals, setdecimals] = useState();
    const [symbol, setsymbol] = useState();
    const [totalSupply, settotalSupply] = useState();
    const [ercContract, setErcContract] = useState();
    const [balance, setBalance] = useState();

    const getBalance = async (address) => {
        console.log(address)
        let bal = await ercContract.methods.balanceOf(address).call()
        setBalance(bal)
    }

    const transferTokens = async (values) => {
        let recipt = await ercContract.methods.transfer(values.address, values.amount).send({ from: (props.currentUser).toString() })
            .on('receipt', function (receipt) {
                console.log(receipt)
            })
    }

    async function loadContract() {
        let ercContract = new props.web3.eth.Contract(ERC20_Standard.abi, (props.tokenAddress).toString())
        let _decimals = await ercContract.methods.decimals().call()
        let _name = await ercContract.methods.name().call()
        let _symbol = await ercContract.methods.symbol().call()
        let _totalSupply = await ercContract.methods.totalSupply().call()
        setErcContract(ercContract)
        setName(_name)
        setdecimals(_decimals)
        setsymbol(_symbol)
        settotalSupply(_totalSupply)


    }
    useEffect(() => {
        loadContract()
    }, [props.tokenAddress])

    return (
        <List>
            <List.Item>
                <Col style={{ columngap: '10px' }}>
                    <p>Name</p>
                </Col>
                <Col>
                    <p>{name}</p>
                </Col>
            </List.Item>
            <List.Item>
                <Col style={{ columngap: '10px' }}>
                    <p>Symbol</p>
                </Col>
                <Col>
                    <p>{symbol}</p>
                </Col>
            </List.Item>
            <List.Item>
                <Col style={{ columngap: '10px' }}>
                    <p>Decimals</p>
                </Col>
                <Col>
                    <p>{decimals}</p>
                </Col>
            </List.Item>
            <List.Item>
                <Col style={{ columngap: '10px' }}>
                    <p>totalSupply</p>
                </Col>
                <Col>
                    <p>{totalSupply}</p>
                </Col>
            </List.Item>
            <List.Item>
                <Col style={{ columngap: '10px' }}>
                    <p><Search placeholder="address " enterButton="balanceOf" size="meduim" loading={false} onSearch={getBalance} /></p>

                </Col>

                <Col>
                    {balance ? <p> {balance} </p> : <></>}
                </Col>
            </List.Item>
            <List.Item >

                <Form
                    name="transfer"
                    onFinish={transferTokens}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Transfer Tokens</h1>
                    <Input.Group size="large">
                        <Form.Item label="recipient"
                            name="address"
                            rules={[{ required: true, message: 'you need to provide the recipient' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="amount"
                            name="amount"
                            rules={[{ required: true, message: 'you need to provide the amount' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Input.Group>

                    <Form.Item >
                        <Button type="danger" htmlType="submit" >Transfer</Button>
                    </Form.Item>
                </Form>

            </List.Item>
        </List>
    )

}

export default TokenContract;