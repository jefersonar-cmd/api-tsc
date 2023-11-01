import prismaClient from "../prisma";

class ListCustomerService {
    async execute() {
        return prismaClient.customer.findMany();
    }
}

export {ListCustomerService}