import {  Form, Input, Button, Checkbox} from 'antd';
import { useEffect, useState } from 'react';
import  ErcFactory from '../contracts/ErcFactory.json'
const contractAddress = "0xe34CF5BF21f3c94CeA49dC753a7B24951dBd2Ed6"



function TokenCard(props) {
    const [contractInst,setContractInst] = useState(null)

    useEffect(()=>{

      let contract = new props.web3.eth.Contract(ErcFactory.abi, contractAddress)
      setContractInst(contract)
      console.log(contract)
      console.log(props.user)

    }, [props.web3, props.user])

    const onFinish = async (values) => {
          console.log(props.user)
          let recipt = await contractInst.methods.createStandardToken(values.InitialSupply, values.TokenName, values.Symbol).send({from:(props.user).toString()})
          console.log(recipt.events.TokenCreated.returnValues._tokenAddress)
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

          <Form.Item label = "TokenName"
                     name="TokenName"
                     rules={[{ required: true, message: 'Please input The Token name!' }]}
                     >
            <Input />

          </Form.Item>
          <Form.Item label = "Symbol"
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
          <Form.Item label = "Initial Supply"
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
      
    </Form>
  );
}

export default TokenCard;
