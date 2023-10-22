
/** 
 * Author: Ahmedou M-Lahmed
 * email: 7medouu@gmail.com
 * 
 * **/
window.addEventListener('load', async function() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const contractAddress = '0x968232491C5Cb725F077a0ABF51AFb7B80adf303';
        const response = await fetch('ABI.json'); // Replace with the path to your contract's ABI
        const abi = await response.json();
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Function to add a book
        document.getElementById('addBook').addEventListener('click', async () => {
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const collection = document.getElementById('collection').value;

            await contract.methods.addBook(title, author, collection).send({ from: window.ethereum.selectedAddress });
        });

        
        document.getElementById('orderBook').addEventListener('click', async () => {
            const isbn = document.getElementById('isbn').value;

        //Check if the book is available before ordering
            const isAvailable = await contract.methods.isBookAvailable(isbn).call();

            if (isAvailable) {
        // Book is available, proceed with ordering
                    await contract.methods.orderBook(isbn).send({ from: window.ethereum.selectedAddress });
                    alert('Book ordered successfully!');
         } else {
        // Book is not available, display a user-friendly message
                    alert('Sorry, this book is not available for order at the moment.');
        }
        });


        // Function to check book availability
        document.getElementById('checkAvailability').addEventListener('click', async () => {
            const checkIsbn = document.getElementById('checkIsbn').value;

            const availability = await contract.methods.isBookAvailable(checkIsbn).call();
            alert(`Book is available: ${availability}`);
        });

       
        document.getElementById('getBookDetails').addEventListener('click', async () => {
            const detailsIsbn = document.getElementById('detailsIsbn').value;

            const bookDetails = await contract.methods.getBookDetails(detailsIsbn).call();
            const title = bookDetails.title;
            const author = bookDetails.author;
            const collection = bookDetails.collection;
            const available = bookDetails.available;

            document.getElementById('bookDetails').innerHTML = `Title: ${title}<br>Author: ${author}<br>Collection: ${collection}<br>Available: ${available}`;
        });
    } else {
        console.log('MetaMask not detected. Please install MetaMask extension.');
    }
});