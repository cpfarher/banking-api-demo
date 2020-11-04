const config = require("./app/config/config.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//===============================================================
//===============SWAGGER DOCUMENTATION FOR API=====================
// check this for options: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Bank api demo",
      description: "A Bank api demo.",
      contact: {
        name: "Christian Pfarher",
        email: "christianpfarher@argeniss.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8080/" }],
  },
  apis: ["app/routes/*.js", "app/models/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//===============================================================
//===============================================================

//===============================================================
//========================MODELS=================================
const db = require("./app/models");
require("./app/routes/customer.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/transfer.routes")(app);
//===============================================================
//===============================================================

//===============================================================
//========================SEQUELIZE==============================
// SEQUELIZE: force: true => for create table and dropping
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});
//===============================================================
//===============================================================

//===============================================================
//==================ROOT ROUTE AND START APP=====================
app.get("/", (req, res) => {
  //res.json({ message: "Bank api..." });
  res.redirect('api-docs/')
});

app.listen(config.PORT, () => {
  console.log(`NODE_ENV=${config.NODE_ENV}`);
  console.log(`Server is running on: http://${config.HOST}:${config.PORT}`);
});
//===============================================================
//===============================================================