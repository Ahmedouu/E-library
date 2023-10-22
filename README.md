# E-library
Ethereum based library web application


I am going to build a smart contract based library system, of course books are not free, so this system will allow users to send money (Ether) directly to the authors.

This still a proof of concept there is a lot to be done here with the contract and the interface, but it's something so if you want to try it:

compile the smart contract and deploy it, navigate to public/logic.js and change the following line with your contract address:
```
const contractAddress = '0x968232491C5Cb725F077a0ABF51AFb7B80adf303';
```
install metamask in your browser, connect to the same provider you used for deploying the contract
Then
```
npm install 
npm start
```

# To Do

ISBN is as a counter that locates the book using mappings this is nice, but we need the ISBN to be added as input as well 

Modifiers this contract is very unsecure

Improve UX alerts are scary


