import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                password
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(
        $bookId: String!
        $authors: [String]!
        $description: String
        $image: String
        $link: String
        $title: String!
    ) {
        saveBook(
            bookId: $bookId
            authors: $authors
            description: $description
            image: $image
            link: $link
            title: $title
        ) {
            username
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        saveBook(bookId: $bookId) {
            username
            bookCount
                savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;