import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import Currency from "react-currency-formatter";
import { selectItems, selectTotal } from "../slices/basketSlice";;
import { useSession } from 'next-auth/client';

function Checkout() {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(selectTotal);


    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left Section */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                           {items.length === 0 ? 'Your Basket is Empty' : `Your Shopping Cart (${items.length} items)`}
                        </h1>

                        {items.map((item, i) => (
                                <CheckoutProduct
                                image={item.image}
                                rating={item.rating}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                key={item.id}
                                id={item.id}
                                category={item.category}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                       

                    </div>
                </div>

                {/* Right Section */}
                <div className='flex flex-col bg-white p-10 shadow-lg'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):{' '}   
                                <span className="font-bold">
                                    <Currency quantity={total} currency='GBP'/>
                                </span>
                            </h2>

                            <button disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-200 border-gray-200 text-white cursor-not-allowed'}`}>
                                {!session ? 'Sign In to Checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;
