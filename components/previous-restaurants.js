import restaurants from '../lib/previous-restaurants'

const PreviousRestaurants = () => {
    return (
        <section>
            <details>
                <summary className="cursor-pointer">Frühere Treffen</summary>
                <ul>
                    {restaurants.map((restaurant) => {
                        return (
                            <div className="pt-12 first:pt-4">
                                {restaurant.year ? <li className="bg-black text-white h-12 flex items-center pl-4">{restaurant.year}</li> : ''}
                                {restaurant.december ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Dec. {restaurant.december}</li> : ''}
                                {restaurant.november ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Nov. {restaurant.november}</li> : ''}
                                {restaurant.october ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Oct. {restaurant.october}</li> : ''}
                                {restaurant.september ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Sep. {restaurant.september}</li> : ''}
                                {restaurant.august ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Aug. {restaurant.august}</li> : ''}
                                {restaurant.july ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Jul. {restaurant.july}</li> : ''}
                                {restaurant.june ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Jun. {restaurant.june}</li> : ''}
                                {restaurant.may ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Mai {restaurant.may}</li> : ''}
                                {restaurant.april ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Apr. {restaurant.april}</li> : ''}
                                {restaurant.march ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Mär. {restaurant.march}</li> : ''}
                                {restaurant.february ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Feb. {restaurant.february}</li> : ''}
                                {restaurant.january ? <li className="h-10 flex items-center border-b-2 border-black pl-4">Jan. {restaurant.january}</li> : ''}
                            </div>
                        )
                    })}
                </ul>
            </details>
        </section>
    )
}

export default PreviousRestaurants;