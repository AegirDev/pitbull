import React, { Component } from "react";

/* BOOTSTRAP IMPORTS */
//Layouts
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//CSS edits
import 'bootstrap/dist/css/bootstrap.min.css';
import './loader.css';
import './design.css';

//REBASS STYLES
import {
  Button,
  Text
} from 'rebass';
import preset from '@rebass/preset';

import { Input } from '@rebass/forms';
import Pitbull from "./Pitbull.png";
import Web3 from 'web3';
import { arbiABI } from './ArbiABI.js';
import { pitbullABI } from './pitbullABI.js';

const contractAddressARBIBOMB = "0x631e77a55a6ddf7b9a95d5a1a1bcab6d938c6747";
const contractAddressPITBULL = "0x65be1099Dc8b231e49169e050b81Cd208580205b";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.web3 = "";
    this.contractAddress = "";
    this.accounts = "";
    //Bindings
    this.amountToApprove = this.amountToApprove.bind(this);
    this.sendTx = this.sendTx.bind(this);
    //Set State
    this.state = {
    }
  }

  componentDidMount = async () => {
    //this.setupLoader();
    this.initateEthereum = this.initateEthereum.bind(this);
    this.initateEthereum();
}

initateEthereum = async () => {
  if (typeof window.web3 !== 'undefined') {
  const that = this;
  this.getEthereumAccount = this.getEthereumAccount.bind(this);          
      await window.web3.currentProvider.enable().finally(
        async () => {
        that.getEthereumAccount();
        }
      );
  }
}

  getEthereumAccount = async () => {
    if (window.web3.currentProvider.selectedAddress !== null) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const arbiBomb = await new web3.eth.Contract(arbiABI, contractAddressARBIBOMB);
        const pitbull = await new web3.eth.Contract(pitbullABI, contractAddressPITBULL);
        //set the state variables for implementation
        this.setState({web3, accounts, arbiBomb, pitbull});
    }
  }

amountToApprove(amount) {
  this.setState({approvalAmount: amount.target.value});
  
}

sendTx = async () => {
  //var that = this;

    var approvalAmount = String(this.state.approvalAmount);
    console.log(approvalAmount);
    await this.state.arbiBomb.methods.approve(contractAddressPITBULL, approvalAmount).send({from: this.state.accounts[0]});
    await this.state.pitbull.methods.calldataAllowableInterpt(approvalAmount).send({from: this.state.accounts[0]});
  }

  render () {
  return (
    <>

        
     <Container fluid className={this.state.bodyLoaderCSS}>
      <Row>
      <Col md={2}>
      </Col>
      <Col md={8}>
            <Container className="text-center bottomofPage">
                <Row>
                  <Col md={3}>
                  </Col>
                  <Col md={6} className="text-center">
                  <img src={Pitbull} className="logo" />
                  <br />
                  <Text className="headerText"
                    fontSize={[ 3, 4, 5 ]}
                    fontWeight='bold'>
                    Burn ArbiBomb for Pitbull
                  </Text>
                  <br />
                  </Col>
                  <Col md={3}>
                  </Col>
                  </Row>

                    <Row>
                      <Col md={4}>
                      </Col>
                      <Col md={4}>
                          <Text
                            fontSize={[ 3 ]}
                            color='primary'
                            className="text">
                            Burn Amount
                          </Text>
                          <Input className="input" onChange={this.amountToApprove} />
                      </Col>
                      <Col md={4}>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                      </Col>
                      <Col md={4}>  
                      <Button className="bottomButton buttonFormat" theme={preset} variant='outline' onClick={this.sendTx}>Burn</Button>
                      </Col>
                      <Col md={4}>
                      </Col>
                    </Row>
            </Container>
      </Col>
      <Col md={2}>
      </Col>
      </Row>
      </Container>

  </>
  );
}
}

