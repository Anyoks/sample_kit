import React from "react"
import { Link } from "gatsby"
import {logout} from "../services/auth";
import { navigate } from 'gatsby';

export default () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <span>You are not logged in</span>
    <nav>
      <Link to="/">Home</Link>
      {` `}
      <Link to="/">Profile</Link>
      {` `}
      
      <Link to="/" onClick={
        (event)=>{
          let response =  fetch(`${process.env.GATSBY_API_URL}/shop_members/sign_out.json`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }).then(response => {
            if (response.status >= 200 && response.status < 300) {
              navigate(`/app/profile`);
            } else {
              console.log('Something went wrong');
              console.log(response);
            }
          });
        }
      }>Logout</Link>
    </nav>
  </div>
)