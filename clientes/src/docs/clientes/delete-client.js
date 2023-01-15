module.exports = {
    delete:{
        tags: ['Cliente CRUD operations'],
        description: "Deleting a todo",
        operationId: "deleteTodo",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                //required:true,
                description: "Deleting a client"
            }
        ],
        security: [
            {
                bearerAuth: []
            }
          ],
        responses:{
            '200':{
                description:"Client deleted successfully"
            },
            '400':{
                description: "Invalid token"
            },
            '404':{
                description:"Client not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}