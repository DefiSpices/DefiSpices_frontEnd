import { Col, List, Input, Button, Form } from "antd";
import { useEffect, useState } from "react";
import ERC20_Standard from "../contracts/ERC20_Standard.json"
import ERC20_Burnable from "../contracts/ERC20_Burnable.json"

const { Search } = Input




const TokenContract = (props) => {
    const [name, setName] = useState();
    const [decimals, setdecimals] = useState();
    const [symbol, setsymbol] = useState();
    const [totalSupply, settotalSupply] = useState();
    const [ercContract, setErcContract] = useState();
    const [balance, setBalance] = useState();
    const [allowance, setallowance] = useState(null);

    const burn = async(values)=>{
        let recipt = await ercContract.methods.burn(values.amount).send({ from: (props.currentUser).toString() })
        console.log(recipt)
    }

    const getBalance = async (address) => {
        console.log(address)
        let bal = await ercContract.methods.balanceOf(address).call()
        setBalance(bal)
    }

    const transferTokens = async (values) => {
        let recipt = await ercContract.methods.transfer(values.address, values.amount).send({ from: (props.currentUser).toString() })
        console.log(recipt)

    }
    const transferFrom = async (values) => {
        let recipt = await ercContract.methods.transferFrom(values.sender, values.recipient, values.amount).send({ from: (props.currentUser).toString() })
        console.log(recipt)
    }
    const increaseAllowance = async (values) => {
        let recipt = await ercContract.methods.increaseAllowance(values.spender, values.addedValue).send({ from: (props.currentUser).toString() })
        console.log(recipt)

    }

    const decreaseAllowance = async (values) => {
        let recipt = await ercContract.methods.decreaseAllowance(values.spender, values.subtractedValue).send({ from: (props.currentUser).toString() })
        console.log(recipt)

    }

    const get_allowance = async (values) => {
        let allow = await ercContract.methods.allowance(values.owner, values.spender).call({ from: (props.currentUser).toString() })
        setallowance(allow)
    }


    const approve = async (values) => {
        let recipt = await ercContract.methods.approve(values.spender, values.amount).send({ from: (props.currentUser).toString() })
        console.log(recipt)

    }

    async function loadContract() {
        let ercContract = new props.web3.eth.Contract(ERC20_Burnable.abi, (props.tokenAddress).toString())
        let _decimals = await ercContract.methods.decimals().call()
        let _name = await ercContract.methods.name().call()
        let _symbol = await ercContract.methods.symbol().call()
        let _totalSupply = await ercContract.methods.totalSupply().call()
        setErcContract(ercContract)
        setName(_name)
        setdecimals(_decimals)
        setsymbol(_symbol)
        settotalSupply(_totalSupply)

        return
    }

    useEffect(() => {

        loadContract()
    })

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
                    name="allowance"
                    onFinish={get_allowance}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Allowance</h2>
                    <Input.Group size="large">
                        <Form.Item label="Owner"
                            name="owner"
                            rules={[{ required: true, message: 'you need to provide the owner' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Spender"
                            name="spender"
                            rules={[{ required: true, message: 'you need to provide the spender' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Input.Group>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" >Allowance</Button>
                        {allowance ? <p> {allowance} </p> : <></>}

                    </Form.Item>
                </Form>

            </List.Item>
            <List.Item >

                <Form
                    name="transfer"
                    onFinish={transferTokens}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Transfer Tokens</h2>
                    <Input.Group size="large">
                        <Form.Item label="recipient"
                            name="recipient"
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

            <List.Item >

                <Form
                    name="transferFrom"
                    onFinish={transferFrom}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >transfer from</h2>
                    <Input.Group size="large">
                        <Form.Item label="sender"
                            name="sender"
                            rules={[{ required: true, message: 'you need to provide the sender' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="recipient"
                            name="recipient"
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
                        <Button type="danger" htmlType="submit" >TransferFrom</Button>
                    </Form.Item>
                </Form>
            </List.Item>
            <List.Item >

                <Form
                    name="increaseAllowance"
                    onFinish={increaseAllowance}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >increase allowance</h2>
                    <Input.Group size="large">
                        <Form.Item label="spender"
                            name="spender"
                            rules={[{ required: true, message: 'you need to provide the spender' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="addedValue"
                            name="addedValue"
                            rules={[{ required: true, message: 'you need to provide the addedValue' }]}
                        >
                            <Input />

                        </Form.Item>
                    </Input.Group>

                    <Form.Item >
                        <Button type="danger" htmlType="submit" >increase Allowance</Button>
                    </Form.Item>
                </Form>

            </List.Item>

            <List.Item >

                <Form
                    name="decreaseAllowance"
                    onFinish={decreaseAllowance}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >decreaseAllowance</h2>
                    <Input.Group size="large">
                        <Form.Item label="spender"
                            name="spender"
                            rules={[{ required: true, message: 'you need to provide the spender' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="subtractedValue"
                            name="subtractedValue"
                            rules={[{ required: true, message: 'you need to provide the subtractedValue' }]}
                        >
                            <Input />

                        </Form.Item>
                    </Input.Group>

                    <Form.Item >
                        <Button type="danger" htmlType="submit" >decrease Allowance</Button>
                    </Form.Item>
                </Form>

            </List.Item>

            <List.Item >

                <Form
                    name="approve"
                    onFinish={approve}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Approve</h2>
                    <Input.Group size="large">
                        <Form.Item label="spender"
                            name="spender"
                            rules={[{ required: true, message: 'you need to provide the spender' }]}
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
                        <Button type="danger" htmlType="submit" >Approve</Button>
                    </Form.Item>
                </Form>

            </List.Item>

            <List.Item >

                <Form
                    name="burn"
                    onFinish={burn}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}

                >
                    <h2 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Burn</h2>
                    <Form.Item label="amount"
                        name="amount"
                        rules={[{ required: true, message: 'you need to provide the amount' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item >
                        <Button type="danger" htmlType="submit" >Burn</Button>
                    </Form.Item>
                </Form>

            </List.Item>
        </List>
    )

}

export default TokenContract;