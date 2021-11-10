import React from "react";

export default function Home() {
    return (
      <div
        className="jumbotron"
        style={{ backgroundColor: "#e9ecef" }}
      >
        <div className="row text-center" role="article">
          <div>
            <h3>Defect and Enhancement Tracking</h3>

            <p>
              The demonstration vehicle for this course will
              be based on a use case from Keysoft Inc., a
              fictitious company, that needs to quickly
              develop an application to help manage bug
              fixes and enhancement requests for their
              applications. Keysoft’s engineering team has
              decided to utilize Spring Boot to make
              development faster and deployment easier with
              minimal boilerplate code and configuration.
              During the course, you walk through the use
              case of creating the bug tracking application,
              Trackzilla, using Spring Boot.
            </p>
            <img
              src="./images/virus.png"
              alt="virus logo"
              style={{ width: "25%" }}
            />



          </div>
        </div>



      </div>
    );
}