const dgraph = require('dgraph-js-http');
const grpc = require('grpc');

const clientStub = new dgraph.DgraphClientStub('http://144.126.217.146:8080');

const dgraphClient = new dgraph.DgraphClient(clientStub);

// eslint-disable-next-line no-undef
module.exports = {
  fetchUser: (email = 'tarrinneal@gmail.com') => {
    return new Promise((resolve, reject) => {
      debugger;
      dgraphClient
        .newTxn()
        .queryWithVars(
          `query {
            getUser(email: $email) {
              name
              email
              boards {
                id
                name
              }
              homeBoard {
                id
                name
                listItems {
                  id
                  name
                  listItems {
                    id
                    name
                    listItems {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        `,
          {
            $email: email,
          }
        )
        .then((result) => {
          debugger;

          resolve(result.data.user);
        })
        .catch((err) => {
          debugger;

          reject(err);
        });
    });
  },
};
// query User($email: String!)

//         {
//           User(func: eq(email: $email)) {
//             name
//             email
//             homeBoard {
//               id
//               name
//               listItems {
//                 id
//                 name
//                 listItems {
//                   id
//                   name
//                   listItems {
//                     id
//                     name
//                   }
//                 }
//               }
//             }
//           }
//         }
