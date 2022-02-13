import { Form, Input, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import ErcFactory from '../contracts/ErcFactory.json'
const { Option } = Select;
const contractAddress = "0x7f1a9ED4f54db678B767F0464977DfDbb1a9D877"



function TokenCard(props) {
  const [contractInst, setContractInst] = useState(null)

  const [tokenCreated, setTokenCreated] = useState(null)
  const [tokenType, setTokenType] = useState('standard')

  const updateTokenCreated = (_address) => {
    setTokenCreated(_address)
  }

  useEffect(() => {

    let contract = new props.web3.eth.Contract(ErcFactory.abi, contractAddress)
    setContractInst(contract)

  }, [props.web3, props.user, tokenCreated])

  const onFinish = async (values) => {
    let recipt
    if (tokenType === 'standard') {
      console.log('Creating Standard token')
      recipt = await contractInst.methods.createStandardToken(values.InitialSupply, values.TokenName, values.Symbol).send({ from: (props.user).toString() })
    }
    if (tokenType === 'burnable') {
      console.log('Creating burnable token')

      recipt = await contractInst.methods.createBurnableToken(values.InitialSupply, values.TokenName, values.Symbol).send({ from: (props.user).toString() })
    }
    if (tokenType === 'mintable') {
      console.log('Creating mintable token')

      recipt = await contractInst.methods.createBurnableToken(values.InitialSupply, values.TokenName, values.Symbol).send({ from: (props.user).toString() })
    }
    let tokenCreatedAddress = recipt.events.TokenCreated.returnValues._tokenAddress
    updateTokenCreated(tokenCreatedAddress)

  };
  function handleChange(value) {
    setTokenType(value)

  }
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
      <div>
        <h2>Token Type</h2>
        <Select defaultValue="standard" onChange={handleChange} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 120
        }}>
          <Option value="standard">Standard ERC20</Option>

          <Option value="burnable">Burnable ERC20</Option>
          <Option value="mintable">Mintable ERC20</Option>


        </Select>
      </div>
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

      <Form.Item label="Initial Supply"
        name="InitialSupply"
        rules={[{ required: true, message: 'Please input The Token Initial Supply!' }]}
      >
        <Input />

      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {tokenCreated ? <div>{tokenCreated} </div> : <></>}
    </Form>


  );
}

export default TokenCard;
