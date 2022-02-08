import {  Menu } from 'antd';
import { } from '@ant-design/icons';
import Wallet from './Wallet'
import {React, useState} from 'react'

function Navbar(props) {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)

  const onAddressChange = (_address, _bal)=>{
    setAddress(_address)
    setBalance(_bal)
    props.setUser(_address)
  }

  return (
    
    <Menu mode="horizontal" style={{background: "#62E6F5"}}>
    <Menu.Item key="home" >
      Defi-Spices
    </Menu.Item>
    <Menu.Item key="Docs" >
      Docs
    </Menu.Item>


    <Menu.Item key="Address" >
      {address}
    </Menu.Item>

    <Menu.Item key="Balance" >
      {balance}
    </Menu.Item>
    <Menu.Item key="MetamaskBtn" >
      <Wallet 
        onChange= {(_address,_balance) =>onAddressChange(_address,_balance)} 
        setProvider = {(provider) =>  props.setProvider(provider) } >
      </Wallet>
    </Menu.Item>

    </Menu>
    
  

  );
}

export default Navbar;
