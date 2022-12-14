import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer font-poppins mt-5">
            <div className="container">
                <div className="row justify-content-center p-4">
                    <div className="col-4 offset-1 col-sm-2">
                        <h1 className='footer_titles mb-2'>Links</h1>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5 className='mb-2 footer_titles'>Our Address</h5>
                        <address>
                            <i className="fa fa-phone fa-lg mt-3"></i>: 1800 1800 1800<br />
                            <i className="fa fa-envelope fa-lg"></i>: <Link to="mailto:contact@name.co.in">
                                contact@name.co.in</Link>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="row text-center">
                            <div className='col-auto'><a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a></div>
                            <div className='col-auto'><a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a></div>
                            <div className='col-auto'><a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/bhavik-jain-0a9ba0217"><i className="fa fa-linkedin"></i></a></div>
                            <div className='col-auto'><a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a></div>
                            <div className='col-auto'><a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a></div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>?? Copyright 2022 (Site Name)</p>
                    </div>
                </div>
            </div>
        </div>    

    );
}

export default Footer;