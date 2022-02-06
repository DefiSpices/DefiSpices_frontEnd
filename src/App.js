import './App.css';
import Navbar from './components/Navbar'
import TokenCard from './components/TokenCard'
import {  Space, Row, Card , Typography} from 'antd';
import { useState } from 'react';
import Web3 from 'web3';
const { Title, Paragraph, Text, Link } = Typography;

function App() {
  const [web3, setWeb3] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const handleProvider = (provider)=>{
    setWeb3(provider)
  }

  const handleUser = (user)=>{
    setCurrentUser(user)
  }
 

  return (
    <div >
    <Navbar setProvider={ (provider)=> handleProvider(provider)}
             setUser ={ (user)=> handleUser(user)}
    ></Navbar>

    <div className='Title' style={{background: "#B8F4FA"}}>

    <Title style={{textAlign: "center"}}>Defi Spices</Title>

    <Paragraph>
          Defi Spices is a decentrlized platform that offers Web3 services
    </Paragraph>
    </div>
    <Space direction="horizontal" >
    {web3 ? 
    
      <Card  style={{background: "#4AE9F9", display: 'contents'}}> 
        <TokenCard 
                  web3 = {web3}
                  user = {currentUser}>
                    
                  </TokenCard>
        
      </Card>
      
      : <p>Connect you'r wallet to access the dapp</p>}
    </Space>  
    </div>
  );
}

export default App;
