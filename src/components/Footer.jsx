import React from 'react';  

function Footer() {  
    return (  
        <footer className="footer mt-5 py-3 bg-secondary text-white">  
            <div className="container-fluid">  
                <div className="row g-4">  
                    <div className="col-12 col-md-6 col-lg-4">  
                        <h5 className="mb-3">Medical Center</h5>  
                        <p className="text-white-50 mb-0">  
                            Providing quality healthcare services to our community.  
                        </p>  
                    </div>  
                    <div className="col-12 col-md-6 col-lg-4">  
                        <h5 className="mb-3">Quick Links</h5>  
                        <ul className="list-unstyled text-small">  
                            <li className="mb-2"><a className="text-white-50 text-decoration-none" href="/team">Meet Our Team</a></li>  
                            <li className="mb-2"><a className="text-white-50 text-decoration-none" href="/appointments">Book Appointment</a></li>  
                            <li className="mb-2"><a className="text-white-50 text-decoration-none" href="/contact">Contact Us</a></li>  
                        </ul>  
                    </div>  
                    <div className="col-12 col-md-6 col-lg-4">  
                        <h5 className="mb-3">Follow Us</h5>  
                        <div className="d-flex gap-2">  
                            <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-facebook fs-4"></i></a>  
                            <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-twitter fs-4"></i></a>  
                            <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-instagram fs-4"></i></a>  
                        </div>  
                    </div>  
                </div>  
                <div className="border-top my-4"></div>  
                <div className="text-center">  
                    <p className="text-white-50 mb-0">  
                        © 2023 Medical Center. All rights reserved.  
                    </p>  
                </div>  
            </div>  
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>  
        </footer>  
    );  
}  

export default Footer;