module.exports = {
    get:{
        tags:['Cliente CRUD operations'],
        description: "Get a client",
        operationId: "getClient",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "A single client id"
            }
        ],
        responses:{
            '200':{
                description:"Todo is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Cliente"
                        }
                    }
                }
            },
            '404':{
                description: "Todo is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the client",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}