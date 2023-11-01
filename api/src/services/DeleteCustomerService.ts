import prismaClient from "../prisma";
import prisma from "../prisma";

interface DeleteCustomerProps {
    id: string
}

class DeleteCustomerService {
    async execute ({id}: DeleteCustomerProps) {
        if (!id) {
            throw new Error("Por favor informar o nome.")
        }

        const find = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if (!find) {
            throw new Error("Cliente não encontrado")
        }

        await prismaClient.customer.delete({
            where: {
                id
            }
        })

        return {message : "Deletado com sucesso!"}
    }
}

export {DeleteCustomerService}