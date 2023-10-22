// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract BookLibrary {
    struct Book {
        string title;
        string author;
        string collection;
        bool available;
    }

    mapping(uint256 => Book) books;

    uint256 private isbnCounter;

    event BookAdded(uint256 indexed isbn, string title, string author, string collection);
    event BookOrdered(uint256 indexed isbn, address user);

    function addBook(string memory _title, string memory _author, string memory _collection) public {
        uint256 isbn = isbnCounter++;
        books[isbn] = Book(_title, _author, _collection, true);
        emit BookAdded(isbn, _title, _author, _collection);
    }

    function orderBook(uint256 isbn) public {
        require(books[isbn].available, "Book is not available for order");
        books[isbn].available = false;
        emit BookOrdered(isbn, msg.sender);
    }

    function isBookAvailable(uint256 isbn) public view returns (bool) {
        return books[isbn].available;
    }

    function getBookDetails(uint256 isbn) public view returns (string memory title, string memory author, string memory collection, bool available) {
        return (books[isbn].title, books[isbn].author, books[isbn].collection, books[isbn].available);
    }
}
