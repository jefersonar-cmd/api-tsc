import prismaClient from "../prisma";

interface CreateCustomerProps {
    name: string,
    email: string
}

class CreateCustomerService {
    async execute ({name, email}: CreateCustomerProps) {
        console.log("Rota foi chamada")

        if (!name || !email) {
            throw new Error("Preencha todos os campos")
        }

        return prismaClient.customer.create({
            data: {
                name,
                email,
                status: true
            }
        });
    }
}

export {CreateCustomerService}