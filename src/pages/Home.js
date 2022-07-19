import React from 'react';

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
                <p className="card-text">
                  Manage teachers and users of the bot.
                </p>
                <a href="/" className="btn btn-sm btn-primary">
                  View Users
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Meme</h5>
                <p className="card-text">View memes and its templates.</p>
                <a href="/" className="btn btn-sm btn-primary">
                  View Memes
                </a>
                <a href="/" className="btn btn-sm btn-primary ms-2">
                  View Templates
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Subjects</h5>
                <p className="card-text">See existing or create subjects.</p>
                <a href="/" className="btn btn-sm btn-primary">
                  View Subjects
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quizzes</h5>
                <p className="card-text">See quizzes and its leaderboard.</p>
                <a href="/" className="btn btn-sm btn-primary">
                  View Quizzes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
