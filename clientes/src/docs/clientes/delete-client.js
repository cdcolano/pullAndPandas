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
            '201':{
                description:"Todo deleted successfully"
            },
            '404':{
                description:"Todo not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}