import React, {useState} from "react";
import { Button } from "antd";
import Web3 from "web3";


const Wallet = (props) =>{

    const [connButtonText, setButtonText] = useState('Connect Wallet')

    const connectWalletHandler = async ()=>{
        if(window.ethereum){
            let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            accountChangedHandler(accounts[0])
            let web3 = new Web3(window.ethereum);
            setButtonText('Logout')

            props.setProvider(web3)
        }
 
    }
    const accountChangedHandler= async(account)=>{
        props.onChange(account , await getUserBalance(account))
        
    }

    const chainChangeHandler = ()=>{
        window.location.reload();
    }

    window.ethereum.on('chainChanged', chainChangeHandler)


    const getUserBalance = async(address)=>{
        let web3 = new Web3(window.ethereum)
        let balance = await web3.eth.getBalance(address.toString());
        return  web3.utils.fromWei(balance, 'ether')
    }
    window.ethereum.on('accountsChanged', accountChangedHandler)

    return(
        <div style={{alignItems :'horizontal'}}>
        <Button onClick={connectWalletHandler}>{connButtonText}</Button>
  

        </div>
    )

}

export default Wallet;