import { Form, Input, Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import ErcFactory from '../contracts/ErcFactory.json'

const contractAddress = "0xe34CF5BF21f3c94CeA49dC753a7B24951dBd2Ed6"



function TokenCard(props) {
  const [contractInst, setContractInst] = useState(null)

  const [tokenCreated,setTokenCreated] = useState(null)

  const updateTokenCreated = (_address)=>{
    setTokenCreated(_address)
  }

  useEffect(() => {

    let contract = new props.web3.eth.Contract(ErcFactory.abi, contractAddress)
    setContractInst(contract)

  }, [props.web3, props.user, tokenCreated])

  const onFinish = async (values) => {
    let recipt = await contractInst.methods.createStandardToken(values.InitialSupply, values.TokenName, values.Symbol).send({ from: (props.user).toString() })
    .on('receipt', function(receipt){
      let tokenCreatedAddress = receipt.events.TokenCreated.returnValues._tokenAddress
      updateTokenCreated(tokenCreatedAddress)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on">

      <Form.Item label="TokenName"
        name="TokenName"
        rules={[{ required: true, message: 'Please input The Token name!' }]}
      >
        <Input />

      </Form.Item>
      <Form.Item label="Symbol"
        name="Symbol"
        rules={[{ required: true, message: 'Please input The Token Symbol!' }]}
      >
        <Input />

      </Form.Item>
      {/* <Form.Item label = "Decimals"
                     name="Decimals"
                     rules={[{ required: true, message: 'Please input The Token Decimals!' }]}
                     >
            <Input />

          </Form.Item> */}
      <Form.Item label="Initial Supply"
        name="InitialSupply"
        rules={[{ required: true, message: 'Please input The Token Initial Supply!' }]}
      >
        <Input />

      </Form.Item>
      {/* <Form.Item label = "Total Supply"
                     name="TotalSupply"
                     rules={[{ required: true, message: 'Please input The Token Total Supply!' }]}
                     >
            <Input />

          </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {tokenCreated ? <div>{ tokenCreated } </div> : <></>}
    </Form>
    

  );
}

export default TokenCard;
