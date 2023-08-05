import axios from 'axios'
import { toast } from 'react-toastify';

export default function Card({data, toggle}) {
  const handleCreateSession = async () => {
    const user = JSON.parse(localStorage.getItem('User'))
    axios
    .post(`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`, {
      planId: data.id,
      userId: user.id,
      priceId: data.priceId
    })
    .then((response) => {
      if (response.data.url) {
        console.log(response)
        window.location.href = response.data.url;
      }
      else {
        console.log()
      }
    })
    .catch((err) => {
      console.log(err.message)
      toast.error('something went wrong!')
    });
  }
    return(
        <div className="relative col-span-full md:col-span-4 bg-white shadow-md rounded-sm border border-gray-200">
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-green-500"
                aria-hidden="true"
              ></div>
              <div className="px-5 pt-5 pb-6 border-b border-gray-200">
                <header className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 bg-gradient-to-tr from-green-500 to-green-300 mr-3">
                    <svg
                      className="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold">{data.name}</h3>
                </header>
                <div className="text-sm mb-2">
                  Ideal for individuals that need a custom solution with custom
                  tools.
                </div>
                <div className="text-gray-800 font-bold mb-4">
                  <span className="text-2xl">$</span>
                  <span className="text-3xl" x-text="annual ? '14' : '19'">
                    {data.price}
                  </span>
                  <span className="text-gray-500 font-medium text-sm">{toggle ? <>/year </>: <>/month</>}</span>
                </div>
                <button onClick={handleCreateSession} className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded leading-5 shadow-sm transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 hover:border-gray-300 text-gray-600 w-full">
                 Get Started 
                </button>
              </div>
              <div className="px-5 pt-4 pb-5">
                <div className="text-xs text-gray-800 font-semibold uppercase mb-4">
                  What's included
                </div>
                <ul>
                  <li className="flex items-center py-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <div className="text-sm">{data.resolution}</div>
                  </li>
                  <li className="flex items-center py-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <div className="text-sm">{data.screens}</div>
                  </li>
                  <li className="flex items-center py-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <div className="text-sm">{data.videoQuality}</div>
                  </li>
                  <li className="flex items-center py-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <div className="text-sm">{data.devices.map((item)=>{
                        return(
                            <span>{item} </span>
                        )
                    })}</div>
                  </li>
                </ul>
              </div>
            </div>
    )
}