module.exports = {
    get:{
        tags: ['Cliente CRUD operations'],
        description: "Get clientes",
        operationId: 'getClientes',
        parameters:[],
        responses:{
            '200':{
                description:"Clients were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Cliente'
                        }
                    }
                }
            }
        }
    }
}