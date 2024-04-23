import React from 'react';

const Header = () => {
  return (
    <div className={'container'}>
      <nav className={'global-nav'}>
        <div className={'global-nav-links'}>
          <a href="#" className={'global-nav-item'}>Rooms</a>
          <a href="#" className={'global-nav-item'}>Ideas</a>
          <a href="#" className={'global-nav-item'}>Stores</a>
          <a href="#" className={'global-nav-item'}>Contact</a>
        </div>
      </nav>
      <nav className={'local-nav'}>
        <div className="local-nav-links">
          <a href="" className="product-name">AirMug Pro</a>
          <a href="#">개요</a>
          <a href="#">제품사양</a>
          <a href="#">구입하기</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;