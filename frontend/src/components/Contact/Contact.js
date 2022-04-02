import React from 'react';

function Contact() {
  return (
    <div className="contacts">
      <div className="contact">
        <h4>Contact Us</h4>
        <p>1301, Knyaz Boris Ⅰ, Centre, Sofia </p>
        <p>4000, 47, Petka Tarvska, Plovdiv</p>
        <p>8000, 12, Bratya Miladinovi Blvd., Burgas</p>
        <p>Tel. 0898 / 456371</p>
        <p>Email: newlife.hospital@gmail.com</p>
      </div>
      <div className='map-container'>
        <img src={require('../../images/map.png')} alt="Medical Professional" className="map" />
      </div>
    </div>
  )
}

export default Contact;