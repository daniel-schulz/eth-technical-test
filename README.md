<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="docs/images/eth-logo.png" alt="Logo" width="300" height="50">
  </a>

<h3 align="center">Assessment Platform Example PoC</h3>

  <p align="center">
    An proof of concept for an assessment platform with an example card selection game.
    <br />
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deinstallation">Deinstallation</a></li>
      </ul>
    </li>
    <li><a href="#architecture-diagrams">Architecture Diagrams</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

TODO: Write a project description

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

* docker and docker-compose (see [docker documentation](https://docs.docker.com/compose/install/))

### Installation

Deploy the service to the docker environment:

   ```sh
   docker compose up --build --detach
   ```

After running the command above, access the web UI in your browser via http://localhost:3000/CardSelection.

### Deinstallation

Stop and remove the containers from your docker environment (without clearing the database):

   ```sh
   docker compose down
   ```

If you need to also clear the database run:

   ```sh
   docker compose down --volumes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture Diagrams

TODO: Add architecture diagrams and explain the components

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

- [x] Add an __assessment metric service__ to persist assessment metrics
    - [x] Service logic
    - [x] Connect to database
    - [x] Containerize the service
- [x] Add a __Web UI__ with a __card selection assessment__ (game)
    - [x] Game logic
    - [x] UI components and design
    - [x] Containerize the UI
- [x] Add back to top links
- [ ] Discuss this first approach with the team
- [ ] Adjust the roadmap based on the team's feedback

### Ideas for Future Development

* Assessment hardening
    - [ ] To prevent cheating we should consider to move a part of the Card Selection Game logic to the backend
* Features
    - [ ] Add Multi-language Support
    - [ ] Consider adding the information if the correct card was selected. This would simplify data analysis for the python script.
* Refactorings & Code Improvements
    - [ ] Resolve all `TODO` comments
    - [ ] Remove `any` where possible
    - [ ] Add automated tests (e.g. unit tests, integration tests, e2e tests)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
