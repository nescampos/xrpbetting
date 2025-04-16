const xrpBettingContractId = "0x3F719F49b7d2401f4e14675496eb7841F80AAa95";

const xrpBettingAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feedConsumer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "betDown",
				"type": "bool"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "referencePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "settlementTime",
				"type": "uint256"
			}
		],
		"name": "RoundCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "resultDown",
				"type": "bool"
			}
		],
		"name": "RoundSettled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WinningsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_settlementTime",
				"type": "uint256"
			}
		],
		"name": "createRound",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feedConsumer",
		"outputs": [
			{
				"internalType": "contract FXUSDFeedConsumer",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRounds",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "settlementTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "referencePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "referenceTimestamp",
						"type": "uint64"
					},
					{
						"internalType": "uint256",
						"name": "finalPrice",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "bettingOpen",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "settled",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "totalDown",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalUp",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "bettor",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "betIsDown",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "claimed",
								"type": "bool"
							}
						],
						"internalType": "struct XRPBetting.Bet[]",
						"name": "bets",
						"type": "tuple[]"
					}
				],
				"internalType": "struct XRPBetting.Round[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "getBetsByRound",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "bettor",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "betIsDown",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "claimed",
						"type": "bool"
					}
				],
				"internalType": "struct XRPBetting.Bet[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "betDown",
				"type": "bool"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rounds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "settlementTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referencePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "referenceTimestamp",
				"type": "uint64"
			},
			{
				"internalType": "uint256",
				"name": "finalPrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bettingOpen",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "settled",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "totalDown",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalUp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roundsLength",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "settleRound",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "withdrawWinnings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];



async function getContract(web3,contractNetwork, userAddress) {
    var contractPublic = await new web3.eth.Contract(monetizadoAbi,contractNetwork);
    if(userAddress != null && userAddress != undefined) {
        contractPublic.defaultAccount = userAddress;
    }
    return contractPublic;
}

var iface = new ethers.utils.Interface(xrpBettingAbi);

async function loginWithMetamask() {
    const ethereum = MMSDK.getProvider() // You can also access via window.ethereum
    try {
        var accounts = await ethereum.request({method: 'eth_requestAccounts'});
        account = accounts[0];
        $('.current_account_text').text(account);
        await changeNetwork();

    } catch {
        //location.href = "login.html";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeNetwork() {
    
    if (window.ethereum.networkVersion !== 114) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(114) }]
            });
            await getContentList();
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                    chainName: "Flare Testnet Coston2",
                    chainId: Web3.utils.toHex(114),
                    nativeCurrency: { name: "C2FLR", decimals: "18", symbol: "C2FLR" },
                    rpcUrls: ["https://coston2-api.flare.network/ext/C/rpc"]
                    }
                ]
                });
                await getBets();
            }

            if (err.code === 4001) {
                //location.href = "login.html";
            }
        }
    }
}

async function getBets(){
    var accounts = await ethereum.request({method: 'eth_requestAccounts'});
    var account = accounts[0];
    
    var networkSelected = $('#networkSelector').val();
    networkSelected = networkSelected != null? networkSelected : "arbitrum:sepolia";

    const contractNetwork = xrpBettingContractId;

    var web3 = new Web3(new Web3.providers.HttpProvider("https://coston2-api.flare.network/ext/C/rpc"));

    var contractPublic = await getContract(web3,contractNetwork,account);

    if(contractPublic != undefined) {
        var contentInfo = await ethereum
        .request({
            method: 'eth_call',
            params: [
            {
                from: account, // The user's active address.
                data: contractPublic.methods.getAllRounds().encodeABI(),
                to: contractNetwork
            },
            ],
        });
        contentInfo = iface.decodeFunctionResult("getAllRounds", contentInfo);
        if(contentInfo[0].length > 0) {
            $('#my_contents').html('');
            console.log(contentInfo[0]);
            // var list = document.querySelector('#my_contents');
            //   var table = document.createElement('table');
            //   var thead = document.createElement('thead');
            //   var tbody = document.createElement('tbody');
      
            //   var theadTr = document.createElement('tr');
            //   var balanceHeader = document.createElement('th');
            //   balanceHeader.innerHTML = 'ID';
            //   theadTr.appendChild(balanceHeader);
            //   var contractNameHeader = document.createElement('th');
            //   contractNameHeader.innerHTML = 'Name';
            //   theadTr.appendChild(contractNameHeader);
            //   var contractTickerHeader = document.createElement('th');
            //   contractTickerHeader.innerHTML = 'Access cost';
            //   theadTr.appendChild(contractTickerHeader);
              
            //   var usdHeader = document.createElement('th');
            //   usdHeader.innerHTML = 'Is Protected?';
            //   theadTr.appendChild(usdHeader);

            //   var usdHeader2 = document.createElement('th');
            //   usdHeader2.innerHTML = 'Available amount';
            //   theadTr.appendChild(usdHeader2);

            //   var usdHeader3 = document.createElement('th');
            //   usdHeader3.innerHTML = 'Collected amount';
            //   theadTr.appendChild(usdHeader3);

            //   var usdHeaderOptions = document.createElement('th');
            //   usdHeaderOptions.innerHTML = 'Options';
            //   theadTr.appendChild(usdHeaderOptions);
      
            //   thead.appendChild(theadTr)
      
            //   table.className = 'table';
            //   table.appendChild(thead);
      
            //   contentInfo[0].forEach((valor, clave) => {
            //     var tbodyTr = document.createElement('tr');
            //     var contractTd = document.createElement('td');
            //     contractTd.innerHTML = "<b>"+valor.sequenceId+"</b>";
            //     tbodyTr.appendChild(contractTd);
            //     var contractTickerTd = document.createElement('td');
            //     contractTickerTd.innerHTML = '<b>' + valor.name + '</b>';
            //     tbodyTr.appendChild(contractTickerTd);
            //     var balanceTd = document.createElement('td');
            //     balanceTd.innerHTML = '<b>' + Web3.utils.fromWei(valor.accessCost,"ether") + '</b>';
            //     tbodyTr.appendChild(balanceTd);
            //     var balanceUSDTd = document.createElement('td');
            //     balanceUSDTd.innerHTML = '<b>' + valor.isProtected + '</b>';
            //     tbodyTr.appendChild(balanceUSDTd);
            //     var balanceUSDTd2 = document.createElement('td');
            //     balanceUSDTd2.innerHTML = '<b>' + Web3.utils.fromWei(valor.amountAvailable,"ether") + '</b>';
            //     tbodyTr.appendChild(balanceUSDTd2);
            //     var balanceUSDTd3 = document.createElement('td');
            //     balanceUSDTd3.innerHTML = '<b>' + Web3.utils.fromWei(valor.amountCollected,"ether") + '</b>';
            //     tbodyTr.appendChild(balanceUSDTd3);
            //     var balanceUSDTdOption2 = document.createElement('td');
            //     balanceUSDTdOption2.innerHTML = '<input type="button" id="copyMonetizadoTagButton" onclick="getMonetizadoTag('+valor.sequenceId+')" value="Copy Monetizado tag to clipboard" class="btn btn-secondary btn-block" />';
            //     tbodyTr.appendChild(balanceUSDTdOption2);
            //     var balanceUSDTdOption3 = document.createElement('td');
            //     balanceUSDTdOption3.innerHTML = '<input type="button" id="collectMoneyButton" onclick="collectMoney('+valor.sequenceId+')" value="Collect money" class="btn btn-secondary btn-block" />';
            //     tbodyTr.appendChild(balanceUSDTdOption3);
            //     var balanceUSDTdOption1 = document.createElement('td');
            //     balanceUSDTdOption1.innerHTML = valor.isProtected == true? '<input type="button" id="releaseContentButton" onclick="releaseContent('+valor.sequenceId+')" value="Release content" class="btn btn-secondary btn-block" />' : '<input type="button" id="protectContentButton" onclick="protectContent('+valor.sequenceId+')" value="Protect content" class="btn btn-secondary btn-block" />';
            //     tbodyTr.appendChild(balanceUSDTdOption1);
            //     tbody.appendChild(tbodyTr);
            // });
      
            // table.appendChild(tbody);
      
            //   list.appendChild(table);
          }
          //$('.loading_message').css('display','none');
        }
        //return contentInfo;
    
}

async function releaseContent(sequenceId){
    var accounts = await ethereum.request({method: 'eth_requestAccounts'});
    var account = accounts[0];
    
    var networkSelected = $('#networkSelector').val();
    networkSelected = networkSelected != null? networkSelected : "arbitrum:sepolia";

    const contractNetwork = networksContracts[networkSelected];
    var networkSelectedProperties = networksProperties[networkSelected];

    var web3 = new Web3(new Web3.providers.HttpProvider(networkSelectedProperties.urlRPC));

    var contractPublic = await getContract(web3,contractNetwork,account);

    const networkName = networkSelected.split(':')[0];

    const isEIP1559 = networksEIP1559.includes(networkName);

    if(contractPublic != undefined) {
        const query = contractPublic.methods.unprotectContent(sequenceId);
        const encodedABI = query.encodeABI();
        const gasPrice = Web3.utils.toHex(await web3.eth.getGasPrice());

        const paramsForEIP1559 = isEIP1559 ? {
            from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208',
            maxPriorityFeePerGas: gasPrice, 
            maxFeePerGas: gasPrice
        } : { from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208'};

        var unprotectContentId = await ethereum
            .request({
            method: 'eth_sendTransaction',
            params: [
                paramsForEIP1559
            ],
            });

        await getContentList();
    }
}

async function protectContent(sequenceId){
    var accounts = await ethereum.request({method: 'eth_requestAccounts'});
    var account = accounts[0];
    
    var networkSelected = $('#networkSelector').val();
    networkSelected = networkSelected != null? networkSelected : "arbitrum:sepolia";

    const contractNetwork = networksContracts[networkSelected];
    var networkSelectedProperties = networksProperties[networkSelected];

    var web3 = new Web3(new Web3.providers.HttpProvider(networkSelectedProperties.urlRPC));

    var contractPublic = await getContract(web3,contractNetwork,account);

    const networkName = networkSelected.split(':')[0];

    const isEIP1559 = networksEIP1559.includes(networkName);

    if(contractPublic != undefined) {
        const query = contractPublic.methods.protectContent(sequenceId);
        const encodedABI = query.encodeABI();
        const gasPrice = Web3.utils.toHex(await web3.eth.getGasPrice());

        const paramsForEIP1559 = isEIP1559 ? {
            from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208',
            maxPriorityFeePerGas: gasPrice, 
            maxFeePerGas: gasPrice
        } : { from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208'};

        var protectContentId = await ethereum
            .request({
            method: 'eth_sendTransaction',
            params: [
                paramsForEIP1559
            ],
            });

        await getContentList();
    }
}

async function withdrawMoney(roundId){
    var accounts = await ethereum.request({method: 'eth_requestAccounts'});
    var account = accounts[0];
    

    const contractNetwork = xrpBettingContractId;
    var web3 = new Web3(new Web3.providers.HttpProvider("https://coston2-api.flare.network/ext/C/rpc"));

    var contractPublic = await getContract(web3,contractNetwork,account);

    if(contractPublic != undefined) {
        // var amountToCollect = 0;
        // var contentInfo = await ethereum
        //       .request({
        //         method: 'eth_call',
        //         params: [
        //           {
        //             from: account, // The user's active address.
        //             data: contractPublic.methods.withdrawWinnings(roundId).encodeABI(),
        //             to: contractNetwork
        //           },
        //         ],
        //       });
        // contentInfo = iface.decodeFunctionResult("withdrawWinnings", contentInfo);
        // if(contentInfo.length > 0) {
        //     amountToCollect = contentInfo[0].amountAvailable.toBigInt();
        // }
        const query = contractPublic.methods.withdrawWinnings(roundId);
        const encodedABI = query.encodeABI();
        const gasPrice = Web3.utils.toHex(await web3.eth.getGasPrice());

        const paramsForEIP1559 = { from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208'};

        var withdrawMoneyFromContentId = await ethereum
        .request({
        method: 'eth_sendTransaction',
        params: [
            paramsForEIP1559
        ],
        });
        await sleep(10000);
        //checkTx(withdrawMoneyFromContentId,web3);

        await getContentList();
    }
}

async function createContent() {
    var accounts = await ethereum.request({method: 'eth_requestAccounts'});
    var account = accounts[0];
    
    var networkSelected = $('#networkSelector').val();
    networkSelected = networkSelected != null? networkSelected : "arbitrum:sepolia";

    const contractNetwork = networksContracts[networkSelected];
    var networkSelectedProperties = networksProperties[networkSelected];

    var web3 = new Web3(new Web3.providers.HttpProvider(networkSelectedProperties.urlRPC));

    var contractPublic = await getContract(web3,contractNetwork,account);

    const networkName = networkSelected.split(':')[0];

    const isEIP1559 = networksEIP1559.includes(networkName);

    if(contractPublic != null) {
      var contentName = $('#content_name').val();
      if(contentName == '') {
        $('#errorCreateContent').css("display","block");
        $('#errorCreateContent').text("Content name is invalid");
        return;
      }
      var contentAmount = $('#content_amount').val();
      if(contentAmount == '' || contentAmount < 0) {
        $('#errorCreateContent').css("display","block");
        $('#errorCreateContent').text("The amount to pay is not valid.");
        return;
      }
      try
      {
        $('.loading_message_creating').css("display","block");
        contentAmount = web3.utils.toWei(contentAmount,"ether");
        const query = contractPublic.methods.addProtectedContent(contentName, contentAmount);
        const encodedABI = query.encodeABI();
        const gasPrice = web3.utils.toHex(await web3.eth.getGasPrice());

        const paramsForEIP1559 = isEIP1559 ? {
            from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208',
            maxPriorityFeePerGas: gasPrice, 
            maxFeePerGas: gasPrice
        } : { from: account, 
            to: contractNetwork,
            data: encodedABI,
            gasLimit: '0x5208'};

        var createContentId = await ethereum
            .request({
            method: 'eth_sendTransaction',
            params: [
                paramsForEIP1559
            ],
        });
        await sleep(10000);
        //checkTx(createContentId,web3);
        
        var contentCreated = await web3.eth.getTransactionReceipt(createContentId);
        if(contentCreated == null) {
          $('#successCreateContent').css("display","none");
          $('.invalid-feedback').css("display","block");
          $('.invalid-feedback').text("Error creating the content");
          return;
        }
        
        $('#content_name').val('');
        $('#amount_name').val('');
        $('#errorCreateContent').css("display","none");
        $('.loading_message_creating').css("display","none");
        $('#successCreateContent').css("display","block");
        $('#successCreateContent').text("Content created successfully with the name: " + contentName);
      } catch(e) {
        $('.valid-feedback').css('display','none');
          $('.invalid-feedback').css('display','block');
          $('.loading_message_creating').css("display","none");
          $('.invalid-feedback').text(e.message);
      }
      
      
    }
  }
