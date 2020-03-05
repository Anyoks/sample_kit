import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../services/auth';
import gql from 'graphql-tag';

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    email
    post {
      id
      name
    }
  }
`;

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    isLoading: false,
  };
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.handleLogin(this.state);
  };

  setUser = user =>
    window.localStorage.setItem('gatsbyUser', JSON.stringify(user));

  handleLogin = async ({ username, password }) => {
    /*
    const data = {
      grant_type: 'password',
      username: "eric",
      password: 'loveisgood',
      scope: 'shop_member',
    };
     */

    const data = {
      shop_member: {
        username: 'eric',
        password: 'loveisgood',
      },
    };

    let response = await fetch(
      `${process.env.GATSBY_API_URL}/shop_members/sign_in.json`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // <-- Post parameters
      }
    );
    let user = await response.json();

    if (user) {
      navigate(`/account`);

      return this.setUser(user);
    }
    this.setState({
      isLoading: false,
    });
    return false;
  };

  handlePolling = async (timer, window) => {
    let response = await fetch(`${process.env.GATSBY_API_URL}/shop_member.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        window.close();
        navigate(`/account`);
        clearInterval(timer);
      } else {
        console.log('Something went wrong');
        console.log(response);
      }
    });
  };

  popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=no,
      resizable=0,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    let polling = this.handlePolling;
    var timer = setInterval(function() {
      let hello = polling(timer, newWindow);
      console.log(hello);
      if (false) {
      }
    }, 2000);

    if (window.focus) newWindow.focus();
  };

  render() {
    return (
      <div
        style={{
          display: 'flex' /* establish flex container */,
          flexDirection: 'column' /* make main axis vertical */,
          justifyContent: 'center' /* center items vertically, in this case */,
          alignItems: 'center' /* center items horizontally, in this case */,
          height: '300px',
        }}
      >
        <div
          style={{
            width: '50%',
            margin: '5px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: 'red' }}>Access Denied: Protected content</h1>

          <h3>
            <a
              onClick={event => {
                this.popupCenter({
                  url: `${process.env.GATSBY_API_URL}/shop_members/sign_in`,
                  title: 'Login ',
                  w: 400,
                  h: 300,
                });
                event.preventDefault();
              }}
              href="#"
            >
              Click here to enter your passcode
            </a>
          </h3>
        </div>
      </div>
    );
  }
}
export default Login;
