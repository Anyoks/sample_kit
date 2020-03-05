import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const APOLLO_QUERY = gql`
  {
    post {
      id
      name
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  return (
    <>
      {data && data.post && (
        <>
          {data.post.map(post => {
            return <h1>{post.name}</h1>;
          })}
        </>
      )}

      <h1>Your profile</h1>
      <ul>
        <li>Name: Your name will appear here</li>
        <li>E-mail: And here goes the mail</li>
      </ul>
    </>
  );
};
export default Profile;
