import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import '../pages/css/homecards.css';
import { Link } from 'gatsby';
import { navigate } from 'gatsby';
import { Player, ControlBar } from 'video-react';

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
  const [player, setPlayer] = useState();
  const [
    movie = {
      title: 'sintel',
      link: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      id: 1,
      duration: '15',
      description: `Sintel (code-named Project Durian) is a short 15-minute
    computer-animated fantasy film released in 2010 about a female
    protagonist and a dragon, created by the Blender Institute,
    part of the Blender Foundation.[3][4] Like the foundation's
    two previous films, Elephants Dream and Big Buck Bunny, the
    film was made using Blender, a free and open source software
    application for animation, created and supported by the same
    foundation. Sintel was produced by Ton Roosendaal, chairman of
    the Foundation, and directed by Colin Levy, at the time an
    artist at Pixar Animation Studios.`,
    },
    setFirstMovie,
  ] = useState();

  if (typeof window !== `undefined`) {
    if (window.customer_id === undefined || window.customer_id == '') {
      navigate(`/account`);
      return null;
    } else {
      return (
        <section>
          <div class="container-fluid">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/a/tano/">Home</Link>
                </li>
                <li class="breadcrumb-item active">
                  <Link to="/account">{movie.title}</Link>
                </li>
              </ol>
            </nav>

            <div class="row">
              <div class="col-lg-9 col-md-12" style={{ marginTop: '1rem' }}>
                <Player
                  poster="/assets/poster.png"
                  ref={player => {
                    setPlayer(player);
                  }}
                  autoPlay={true}
                >
                  <ControlBar autoHide={false} />

                  <source src={movie.link} />
                </Player>
              </div>
              <div
                class="col-lg-3 col-md-12"
                style={{
                  marginTop: '1rem',
                  height: '500px',
                  overflowX: 'hidden',
                  overflowY: 'visible',
                  border: '1px solid #ccc',
                  padding: '1rem',
                }}
              >
                <div class="list-group list-group-flush">
                  <a
                    href="#"
                    class={`list-group-item list-group-item-action ${
                      movie.id === 1 ? 'active' : ''
                    }`}
                    onClick={event => {
                      setFirstMovie();
                      player.load();
                      event.preventDefault();
                    }}
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-1">Sintel</h6>
                      <small>{movie.duration / 60} mins</small>
                    </div>

                    <small>Colin Levy</small>
                  </a>
                  <a
                    href="#"
                    class={`list-group-item list-group-item-action ${
                      movie.id === 2 ? 'active' : ''
                    }`}
                    onClick={event => {
                      setFirstMovie({
                        title: 'Big Buck Bunny',
                        id: 2,
                        link: 'https://media.w3.org/2010/05/bunny/movie.mp4',
                        duration: '15',
                        description: `Big Buck Bunny (code-named Project Peach) is a 
                        2008 short computer-animated comedy film featuring animals 
                        of the forest, made by the Blender Institute, part of
                         the Blender Foundation.[6][7] Like the foundation's 
                         previous film, Elephants Dream, the film was made using
                          Blender, a free and open-source software application for 
                          3D computer modeling and animation developed by the same
                           foundation. Unlike that earlier project, the tone and 
                           visuals departed from a cryptic story and dark visuals
                            to one of comedy, cartoons, and light-heartedness.`,
                      });

                      player.load();
                      event.preventDefault();
                    }}
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-1">Big Buck Bunny</h6>
                      <small>{movie.duration / 60} mins</small>
                    </div>

                    <small>Sacha Goedegebure</small>
                  </a>
                </div>
              </div>
            </div>

            <div class="row">
              <div
                class="col-lg-9 col-md-12"
                style={{ marginTop: '1rem', padding: '2rem' }}
              >
                <h4>{movie.title}</h4>

                <p class="card-text" style={{ height: '5rem' }}>
                  {movie.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  return null;
};
export default Account;
