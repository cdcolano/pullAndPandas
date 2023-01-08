
module.exports = {
    components:{
        securitySchemes: {       
        bearerAuth:{        
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
        schemas:{
            id:{
                type:'number',
                description:"An id of a client",
                example: 1
            },
            Signin:{
                type:'object',
                properties:{
                    email:{
                        type:'number',
                        description:"Email de un cliente",
                        example:"example@gmail.com"
                    },
                    password:{
                        type:"string",
                        description:"Contraseña",
                        example:"deusto"
                    }
                }
            },
            Cliente:{
                type:'object',
                properties:{
                    id_cliente:{
                        type:'number',
                        description:"Numero de autentificación",
                        example: 1
                    },
                    peso:{
                        type:'number',
                        description:"El peso en kg de un cliente",
                        example:83.5
                    },
                    altura:{
                        type:"number",
                        description:"La altura en cm del cliente",
                        example:185
                    },
                    email:{
                        type:"string",
                        description:"El email de un cliente",
                        example:"example@gmail.com"
                    },
                    password:{
                        type:"string",
                        description:"La contraseña de un cliente",
                        example:"deusto"
                    },
                    edad:{
                        type:"number",
                        description:"La edad de un cliente",
                        example:23
                    }
                }
            },
            ClienteInput:{
                type:'object',
                properties:{
                    peso:{
                        type:'number',
                        description:"El peso en kg de un cliente",
                        example:83.5
                    },
                    altura:{
                        type:"number",
                        description:"La altura en cm del cliente",
                        example:185
                    },
                    email:{
                        type:"string",
                        description:"El email de un cliente",
                        example:"example@gmail.com"
                    },
                    password:{
                        type:"string",
                        description:"La contraseña de un cliente",
                        example:"deusto"
                    },
                    edad:{
                        type:"number",
                        description:"La edad de un cliente",
                        example:23
                    }
                }
            },
            ClienteUpdate:{
                type:'object',
                properties:{
                    nombre:{
                        type:"string",
                        description:"El nombre de usuario de un cliente",
                        example:"deusto"
                    },
                    peso:{
                        type:'number',
                        description:"El peso en kg de un cliente",
                        example:83.5
                    },
                    altura:{
                        type:"number",
                        description:"La altura en cm del cliente",
                        example:185
                    },
                    password:{
                        type:"string",
                        description:"La contraseña de un cliente",
                        example:"deusto"
                    },
                    edad:{
                        type:"number",
                        description:"La edad de un cliente",
                        example:23
                    }
                }
            },
            Error:{
                type:'object',
                properties:{
                    message:{
                        type:'string'
                    },
                    internal_code:{
                        type:'string'
                    }
                }
            }
        }
    }
}