// Header.js
import React from 'react';
import HeaderBanner from './headerBanner';

// Component Item để hiển thị từng mục menu
function Item(props) {
    return (
        <li>
            <a href={props.link}>{props.content}</a>
        </li>
    );
}

// Component Menu để hiển thị danh sách menu
function Menu({ list }) {
    return (
        <div>
            <h1>Menu</h1>
        <ul>
            {list.map((item, index) => (
                <Item key={index} link={item.url} content={item.text} />
            ))}
        </ul>
        </div>
    );
}

// Component Header để hiển thị thanh điều hướng
function Header() {
    const list = [
        { url: '/', text: 'Home' },
        { url: '/users', text: 'Users' },
        { url: '/login', text: 'Login' }
    ];

    return (
        <header>
            <nav>
                <Menu list={list} />
            </nav>
            <HeaderBanner />
        </header>
    );
}

export default Header;