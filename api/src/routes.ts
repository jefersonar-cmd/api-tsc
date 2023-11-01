import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";
import {CreateCustomerController} from "./controlles/CreateCustomerController";
import {ListCustomerControler} from "./controlles/ListCustomerControler";
import {DeleteCustomerController} from "./controlles/DeleteCustomerController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return {ok: true}
    })

    fastify.post('/createCustomer', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

    fastify.get('/listCustomers', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerControler().handle(request,reply)
    })

    fastify.post('/deleteCustomer', async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })
}