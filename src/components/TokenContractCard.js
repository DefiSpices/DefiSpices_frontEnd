import { Col, List, Row, Table, Input, Button } from "antd";
import { useEffect, useState } from "react";
import ERC20_Standard from "../contracts/ERC20_Standard.json"
const {Search} = Input




const TokenContract = (props) => {
    const [name, setName] = useState();
    const [decimals, setdecimals] = useState();
    const [symbol, setsymbol] = useState();
    const [totalSupply, settotalSupply] = useState();
    const [ercContract,setErcContract] = useState();
    const [balance, setBalance] = useState();

    const getBalance = async (address)=>{
        console.log(address)
        let bal = await ercContract.methods.balanceOf(address).call()
        setBalance(bal)
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
          <p><Search placeholder="address " enterButton="balanceOf" size="meduim" loading = {false} onSearch={getBalance} /></p>

          </Col>

          <Col>
          {balance ? <p> {balance} </p> : <></>}
          </Col>
      </List.Item>
      </List>
    )

}

export default TokenContract;