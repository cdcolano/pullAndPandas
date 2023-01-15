module.exports = {
    get:{
        tags:['Cliente CRUD operations'],
        description: "Get a client",
        operationId: "getClient",
        security: [
            {
                bearerAuth: []
            }
          ],
        responses:{
            '200':{
                description:"CLient is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Cliente"
                        }
                    }
                }
            },
            '400':{
                description: "Invalid token"
            },
            '404':{
                description: "Client is not found",
            }
        }
    }
}