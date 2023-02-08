## Requirements

- nvm
- yarn
- docker

## Getting Started

- Download [this dataset](https://www.kaggle.com/datasets/mcarujo/european-football-season-202223) from Kaggle and place the csvs in the `/data` folder.
- Run `nvm use` to ensure that you are running the correct version of node.
- Run `source .env` to get the correct environment variables for the database.
- Run `docker-compose up` to start the database.
- Run `yarn prisma migrate dev` to get the correct database structure.
- Run `yarn prisma db seed` to load the information from the dataset onto the database.
- Run `yarn dev` to start the application.
- Navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the app running

