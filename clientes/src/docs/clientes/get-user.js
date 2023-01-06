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
            '404':{
                description: "Client is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the todo",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}