module.exports = {
    post:{
        tags:['Cliente Auth operations'],
        description: "Signin a client",
        operationId: "siginClient",
        requestBody:{
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Signin'
                    }
                }
            }
        },
        responses:{
            '200':{
                description:"Login succesful"
            },
            '404':{
                description: "Client not found"
            },
        }
   }
 }
