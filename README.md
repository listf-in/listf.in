# listf.in

Organization for your organization

Infinitely nested organization boards with simple intuitive navigation.

To initialize Database you will need to install [docker](https://docs.docker.com/get-docker/),
then run the command `docker run -it -p 8080:8080 dgraph/standalone:master `, lastly, run one last command to initialize the schema `run curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql' while in the top level directory`
