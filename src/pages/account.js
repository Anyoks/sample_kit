import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import '../pages/css/homecards.css';
import { Link } from 'gatsby';

const APOLLO_QUERY = gql`
  {
    post {
      id
      name
    }
  }
`;

const Account = () => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  return (
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-9 col-md-6" style={{ marginTop: '1rem' }}>
            <img
              class="d-block w-100"
              src="https://media.w3.org/2010/05/bunny/poster.png"
              alt="First slide"
            />
          </div>
          <div
            class="col-lg-3 col-md-6"
            style={{
              marginTop: '1rem',
              height: '500px',
              overflowX: 'hidden',
              overflowY: 'hidden',
              padding: '1rem',
            }}
          >
            <ul class="list-group">
              <li class="list-group-item">video :2 videos</li>
              <li class="list-group-item">duration: 1 minute</li>
              <li class="list-group-item">Cost: Free </li>
            </ul>
            <div style={{ marginTop: '1rem' }}>
              <a
                className="btn btn-primary btn-lg btn-block"
                href="/account/login?return_url=/a/tano"
              >
                Buy
              </a>

              <a
                className="btn btn-primary btn-lg btn-block"
                href="/collections/all"
              >
                Login
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            class="col-lg-9 col-md-12"
            style={{ marginTop: '1rem', padding: '2rem' }}
          >
            <h4>Open Movies</h4>

            <p class="card-text" style={{ height: '5rem' }}>
              Big Buck Bunny" shows how cruel some people can be, and the effect
              of bullying on the victims. The main character decides to hit back
              in a comical manner, and the measures he employ are very
              successful. The moral lesson in the story is clear, and it is fun
              to watch. 5 out of 5 found this helpful
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Account;
