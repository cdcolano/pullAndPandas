
module.exports = {
    post:{
        tags:['Cliente CRUD operations'],
        description: "Create cliente",
        operationId: "createCliente",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/ClienteInput'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Client created successfully"
            },
            '500':{
                description: 'Server error'
            },
            '403':{
                description: 'Cliente ya registrado'
            }
        },
    }
}