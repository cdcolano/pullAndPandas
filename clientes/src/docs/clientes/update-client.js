module.exports = {
    post:{
        tags:['Cliente CRUD operations'],
        description: "Update client",
        operationId: "updateClient",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "Id of todo to be updated"
            }
        ],
        security: [
            {
                bearerAuth: []
            }
          ],
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

            '200':{
                description: "Client updated successfully"
            },
            '404':{
                description: "Client not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}