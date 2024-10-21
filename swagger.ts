import swaggerJsDoc from "swagger-jsdoc";

const optionsAuth = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vải lụa Kim Tho",
      version: "1.0.0",
      description: "API for Vải lụa Kim Tho",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./api/Routes/*.ts"], // Path to your API definitions
};

export const swaggerDocs = swaggerJsDoc(optionsAuth);
