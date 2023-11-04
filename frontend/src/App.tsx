import {useEffect, useState, useRef, FormEvent} from 'react'
import { FiTrash } from 'react-icons/fi'
import {api} from './services/api'

interface customerProps{
    id: string,
    name: string,
    email: string,
    status: boolean,
    created: string
}

export default function App(){
    const [customers, setCustomers] = useState<customerProps[]>([])
    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        loadCustomers()
    }, []);

    async function loadCustomers(){
        const response =  await api.get('/listCustomers')
        setCustomers(response.data)
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault()
        if (!nameRef.current?.value || !emailRef.current?.value) return


        const response = await api.post('/createCustomer', {
            "name": nameRef.current?.value,
            "email": emailRef.current?.value
        })

        setCustomers(allCustomer => [...allCustomer, response.data])

        nameRef.current.value = ""
        emailRef.current.value = ""
    }

    async function handleDelete(id: String) {
        try {
            await api.post('/deleteCustomer' , {
                id: id
            })

            const allCustomers = customers.filter((customers) => customers.id !== id)

            setCustomers(allCustomers)

        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className={'w-full min-h-screen bg-gray-900 flex justify-center px-4'}>
            <main className={'my-10 w-full md:max-w-2xl'}>
                <h1 className={'text-4xl font-medium text-white'}>Clientes</h1>

                <form className={'flex flex-col my-6'} onSubmit={handleSubmit}>
                    <label className={'font-medium text-white'}>Nome:</label>
                    <input
                        type={'text'}
                        placeholder={'Digite seu nome completo...'}
                        className={'w-full mb-5 p-2 rounded'}
                        ref={nameRef}
                    />

                    <label className={'font-medium text-white'}>Email:</label>
                    <input
                        type={'email'}
                        placeholder={'Digite seu nome E-Mail...'}
                        className={'w-full mb-5 p-2 rounded'}
                        ref={emailRef}
                    />

                    <input
                        type={'submit'}
                        value={'Cadastrar'}
                        className={'w-full cursor-pointer p-2 bg-green-500 rounded font-medium'}
                    />
                </form>

                <section className={'flex flex-col gap-4'}>
                    {customers.map((customer) => (
                        <article
                            className={'w-full flex flex-col bg-white p-2 rounded-2xl relative hover:scale-105 duration-200'}
                            key={customer.id}
                        >
                            <p><span className={'font-medium'}>Nome: </span>{customer.name}</p>
                            <p><span className={'font-medium'}>E-Mail: </span>{customer.email}</p>
                            <p><span className={'font-medium'}>Status: </span>{customer.name ? "ATIVO" : "INATIVO"}</p>

                            <button className={'bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-1 -top-2'} onClick={() => handleDelete(customer.id)}>
                                <FiTrash size={18} color={'#FFF'}/>
                            </button>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}
