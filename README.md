# NICE Agent Portal

This repository contains the code for the front-end portal to the NICE (Network Insight Collaboration Environment) configuration of Veritable.

## Description

The [Network Insight Collaboration Environment](https://digitalsupplychainhub.uk/showcase/critical-minerals-flagship/) aims to demonstrate that an innovative approach, based on new and existing technology, will allow supply chains to share insights and data across multiple data platforms, enhancing the efficiency of the supply chain network. It forms part of Critical Minerals, one of the flagships of the Digital Supply Chain Hub run by Made Smarter Innovation.

### Usage

#### Prerequisites

- docker 19.03.0+
- docker-compose v2.23.0+
- npm 10.0.0+
- node 20.0.0+

#### Single Agent

To run the full Peer agent stack, use:

```
docker-compose up --build
```

Once running, the agent frontend is available at http://localhost:3000 and the API is available at http://localhost:3000/api/docs

Configuration options are set using environment variables defined in a `.env` file in the project root.

#### Multiple Agents

To run more than one agent at a time, docker compose project names must be set, and configuration options for each agent defined through `.env.${PROJECT_NAME}` files at the project root.

As an example, configuration options have been defined in this repository for the following 3 agents:

- `nice-agent-alice`: a Peer node
- `nice-agent-bob`: a second Peer node
- `nice-agent-issuer`: an Issuer node

These 3 agents can be run with the following 3 commands:

```
(export COMPOSE_PROJECT_NAME=nice-agent-alice && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-bob && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-issuer && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
```

Or:

```
for agent_name in alice bob issuer; do
  (export COMPOSE_PROJECT_NAME=nice-agent-"${agent_name}" && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d);
done
```

With the default configurations defined in this repo's `.env.*` files, the portals will be available at:

- Peer 1 (Alice): http://localhost:3000
- Peer 2 (Bob): http://localhost:3001
- Issuer: http://localhost:3002

**Note:** Although many Peer nodes can be run simultaneously, only a single Issuer node can be run at a time.

#### Development Mode

To build the agent, use the following command at the project root:

```
npm run build
```

To run the agent in development mode, first bring up dependencies with:

```
docker-compose up veritable ipfs opa postgres
```

In a different shell, run either the Peer or Issuer with the following commands.

Peer agent:

```
npm run dev:peer
```

Issuer agent:

```
npm run dev:issuer
```

#### Development Mode with Multiple Agents

To run an agent in development mode against other agents, the steps are:

- Set up all non-development agents in production mode
- Set up the dependencies of the agent to be run in development mode, loading the development environment variables
- Start the development agent with the required environment variables loaded using `DOTENV_CONFIG_PATH=<env file> npm run dev:<issuer|peer>`

For example, to work on the issuer node in development mode, run the following commands:

```
(export COMPOSE_PROJECT_NAME=nice-agent-alice && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-bob && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-issuer && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} --env-file .env.${COMPOSE_PROJECT_NAME}.dev up veritable ipfs opa postgres -d)
DOTENV_CONFIG_PATH=$(pwd)/.env.nice-agent-issuer.dev npm run dev:issuer
```

Or, for another example, to work on peer alice in development mode, run the following commands:

```
(export COMPOSE_PROJECT_NAME=nice-agent-bob && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-issuer && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-alice && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} --env-file .env.${COMPOSE_PROJECT_NAME}.dev up veritable ipfs opa postgres -d)
DOTENV_CONFIG_PATH=$(pwd)/.env.nice-agent-alice.dev npm run dev:peer
```

Or, for another example, to work on peer bob in development mode, run the following commands:

```
(export COMPOSE_PROJECT_NAME=nice-agent-alice && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-issuer && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} up --build -d)
(export COMPOSE_PROJECT_NAME=nice-agent-bob && docker-compose --env-file .env --env-file .env.${COMPOSE_PROJECT_NAME} --env-file .env.${COMPOSE_PROJECT_NAME}.dev up veritable ipfs opa postgres -d)
DOTENV_CONFIG_PATH=$(pwd)/.env.nice-agent-bob.dev npm run dev:peer
```

#### Testing

To run the full test suite, dependencies must be brought up using:

```
docker-compose up veritable ipfs opa postgres
```

Now tests can be run in a different shell using:

```
npm test
```

### Architecture

The NICE Agent is built on top of the Veritable agent, and this repo describes the portal that allows the Veritable agent to be utilized. The following diagram shows the entire architecture, although the NICE Agent will include different components depending on role (Issuer vs Peer).

![NICE abstract node architecture](./docs/images/nice-arch-node-abstract.png)

Below is the specific architecture for an Issuer node. Note that an Issuer node does not have a NICE frontend, it will be administered through a separate system. Also note that the ipfs-cluster component is included here - this allows for ensuring data stored to IPFS remains available should any particular node go down.

![NICE Issuer node architecture](./docs/images/nice-arch-node-issuer.png)

Below is the specific architecture for a Peer node (NICE participant, Supplier or Consumer). Note that nice-agent-portal (the react frontend and backend) acts as the gateway to the Veritable system. Also note that ipfs-cluster should not be required here, as each node is independently responsible for its own stored IPFS data being available.

![NICE Peer node architecture](./docs/images/nice-arch-node-peer.png)

### NICE Onboarding Processes

The onboarding process for NICE allows users to enroll as members, verify their credentials, and add elements of their supply chain. There are 4 processes documented:

1. **Application**: In this process, a prospective member has initialized their node through owned or shared infrastructure, and submits their identifying data to NICE for verification.
   ![NICE Application Process architecture](./docs/images/application-process.png)

2. **Confirmation**: In this process, a prospective member's identity has been confirmed by NICE and they have been given the cryptograhic material required to create a credential through an Issuer node.
   ![NICE Confirmation Process architecture](./docs/images/confirmation-process.png)

3. **Profile Management**: In this process, a fully-onboarded member is able to review their identity details, as well as adding elements to their immediate supply chain (consumers and/or suppliers).
   ![NICE Profile Management Process architecture](./docs/images/profile-management-process.png)

4. **Chained Onboarding**: In this process, a fully-onboarded member is able to invite elements of their supply chain to NICE, and verify them once these participants are onboarded.

![](./docs/images/nice-onboarding-flow-chained.png)

## Repo structure

This repo contains a React frontend in the `/frontend` directory and a TSOA backend in the `/backend` directory.

## License

This project is licensed under the **Apache 2.0** license.
