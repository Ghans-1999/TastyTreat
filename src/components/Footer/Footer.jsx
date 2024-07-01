import React from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row"><div class="col-sm-6 col-md-4 col-lg-3">
          <div class=" footer__logo text-start">
            <img src="/static/media/res-logo.2f9021c4.png" alt="logo"/>
            <h5>Tasty Treat</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt pariatur accusamus</p>
          </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
          <h5 class="footer__title">Delivery Time</h5>
          <ul class="deliver__time-list list-group">
            <li class="delivery__time-item border-0 ps-0 list-group-item">
              <span>Sunday - Thursday</span>
              <p>10:00am - 11:00pm</p></li><li class="delivery__time-item border-0 ps-0 list-group-item"><span>Friday - Saturday</span><p>Off day</p></li></ul></div><div class="col-sm-6 col-md-4 col-lg-3"><h5 class="footer__title">Contact</h5><ul class="deliver__time-list list-group"><li class="delivery__time-item border-0 ps-0 list-group-item"><p>Location: Wrocław Market Square, Rynek, 11-400 Wrocław, Poland</p>
              </li><li class=" delivery__time-item border-0 ps-0 list-group-item"><span>Phone: 01712345678</span></li><li class=" delivery__time-item border-0 ps-0 list-group-item"><span>Email: example@gmail.com</span></li></ul></div><div class="col-sm-6 col-md-4 col-lg-3"><h5 class="footer__title">Newsletter</h5><p>Subscribe our newsletter</p><div class="newsletter"><input type="email" placeholder="Enter your email"/><span>
              <i class="ri-send-plane-line"></i>
              </span>
              </div>
              </div>
              </div>
              <div class="mt-5 row">
                <div class="col-md-6 col-lg-6">
                  <p class="copyright__text">Copyright - 2024, website made by Ghanshyam. All Rights Reserved.</p>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="social__links d-flex align-items-center gap-4 justify-content-end">
                      <p class="m-0">Follow: </p>
                      <span>
                        <a href="/https://www.facebook.com/muhib160">
                        <i class="ri-facebook-line"></i></a>
                        </span><span><a href="/https://github.com/muhib160">
                        <i class="ri-github-line"></i></a></span><span>
                          <Link to="https://www.youtube.com">
                          <i class="ri-youtube-line"></i></Link> 
                          </span><span> 
                            <Link to="https://www.linkedin.com"><i class="ri-linkedin-line"></i></Link>
                            </span>
                            </div>
                            </div>
                            </div>
                            </div>
    </footer>
  );
};

export default Footer;
