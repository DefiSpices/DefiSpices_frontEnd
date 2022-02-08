import './App.css';
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import {  Typography } from 'antd';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

function App() {
  const [web3, setWeb3] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const handleProvider = (provider) => {
    setWeb3(provider)
  }

  const handleUser = (user) => {
    setCurrentUser(user)
  }


  return (
    <div >
      <Navbar setProvider={(provider) => handleProvider(provider)}
        setUser={(user) => handleUser(user)} 
        style={{display:''}}
      ></Navbar>

      <div className='Title' style={{ background: "#B8F4FA" }}>

        <Title style={{ textAlign: "center" }}>Defi Spices</Title>
        <Paragraph>
          Defi Spices is a decentrlized platform that offers Web3 services
        </Paragraph>
      </div>

      <div className="site-card-wrapper">
        {web3 ?
          <Cards web3={web3} currentUser={currentUser} /> : <p>Connect you'r wallet to access the dapp</p>}
      </div>

    </div>
  );
}

export default App;
