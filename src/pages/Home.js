import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="px-0 py-5">
        <h1>Welcome!</h1>
      </div>
      <div>
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Management</h5>
                <p className="card-text">Manage users of the bot.</p>
                <Link className="btn btn-sm btn-primary" to="/users">
                  View Users
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Meme</h5>
                <p className="card-text">View memes and its templates.</p>
                <Link className="btn btn-sm btn-primary" to="/memes">
                  View Memes
                </Link>
                <Link className="btn btn-sm btn-primary ms-2" to="/templates">
                  View Templates
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Subjects</h5>
                <p className="card-text">See existing or create subjects.</p>
                <Link className="btn btn-sm btn-primary" to="/subjects">
                  View Subjects
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quizzes</h5>
                <p className="card-text">See quizzes and its leaderboard.</p>
                <Link className="btn btn-sm btn-primary" to="/quizzes">
                  View Quizzes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
