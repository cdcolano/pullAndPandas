module.exports = {
    get:{
        tags: ['Todo CRUD operations'],
        description: "Get todos",
        operationId: 'getTodos',
        parameters:[],
        responses:{
            '201':{
                description:"Todos were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Todo'
                        }
                    }
                }
            }
        }
    }
}